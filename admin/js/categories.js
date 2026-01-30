function fetchCategories() {
    const tbody = document.getElementById('categoriesTableBody');
    if (!tbody) return;

    fetch('https://havona.brandmindz.com/api/categories/fetch.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderCategories(data.data);
                populateCategoryDropdowns(data.data);
            } else {
                tbody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-red-400">Error: ${data.message}</td></tr>`;
                showToast(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            tbody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-red-400">Failed to load categories.</td></tr>`;
        });
}

function renderCategories(categories) {
    const tbody = document.getElementById('categoriesTableBody');
    tbody.innerHTML = '';

    if (categories.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-gray-400">No categories found.</td></tr>`;
        return;
    }

    categories.forEach(cat => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-gray-50 hover:bg-gray-50/50 transition-colors';
        tr.innerHTML = `
            <td class="p-6 text-gray-900">#${cat.id}</td>
            <td class="p-6 font-medium text-gray-900">${cat.name}</td>
            <td class="p-6 text-gray-600">${cat.slug}</td>
            <td class="p-6">
                <div class="flex items-center gap-2">
                    <button onclick="showEditCategoryModal(${cat.id}, '${cat.name.replace(/'/g, "\\'")}', '${cat.slug}')" class="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Edit">
                        <i class="ph ph-pencil-simple text-xl"></i>
                    </button>
                    <button onclick="deleteCategory(${cat.id})" class="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors" title="Delete">
                        <i class="ph ph-trash text-xl"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function populateCategoryDropdowns(categories) {
    const selects = document.querySelectorAll('select[name="category"]');
    selects.forEach(select => {
        const currentVal = select.value;
        select.innerHTML = '<option value="">Select Category</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.name; // User likely wants name relation, or slug. Using Name for now as it's cleaner in UI
            option.textContent = cat.name;
            select.appendChild(option);
        });
        select.value = currentVal;
    });
}

// Modal Logic
function showAddCategoryModal() {
    document.getElementById('categoryModal').classList.remove('hidden');
    document.getElementById('categoryModalTitle').textContent = 'Add Category';
    document.getElementById('saveCategoryBtn').textContent = 'Save';
    document.getElementById('categoryId').value = '';
    document.getElementById('addCategoryForm').reset();
}

function showEditCategoryModal(id, name, slug) {
    document.getElementById('categoryModal').classList.remove('hidden');
    document.getElementById('categoryModalTitle').textContent = 'Edit Category';
    document.getElementById('saveCategoryBtn').textContent = 'Update';
    document.getElementById('categoryId').value = id;
    document.getElementById('catName').value = name;
    document.getElementById('catSlug').value = slug;

    // Store old name to track changes for blog sync
    document.getElementById('addCategoryForm').setAttribute('data-old-name', name);
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.add('hidden');
    document.getElementById('addCategoryForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addCategoryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const categoryId = document.getElementById('categoryId').value;
            const action = categoryId ? 'edit.php' : 'add.php';

            const formData = {
                name: document.getElementById('catName').value,
                slug: document.getElementById('catSlug').value
            };

            if (categoryId) {
                formData.id = categoryId;
            }

            const submitBtn = document.getElementById('saveCategoryBtn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Saving...';

            fetch(`https://havona.brandmindz.com/api/categories/${action}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(async data => {
                    if (data.success) {
                        const newName = document.getElementById('catName').value;
                        const oldName = form.getAttribute('data-old-name');

                        if (categoryId && oldName && oldName !== newName) {
                            showToast('Updating associated blogs...', 'info');
                            await syncBlogCategories(oldName, newName);
                        }

                        showToast(categoryId ? 'Category Updated Successfully' : 'Category Added Successfully', 'success');
                        closeCategoryModal();
                        fetchCategories();
                    } else {
                        showToast(data.message, 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showToast('An error occurred. Please try again.', 'error');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
        });

        // Auto Slug for Category
        document.getElementById('catName').addEventListener('input', function () {
            // Only auto-slug if we are adding a new category, or you can keep it for edits too
            // Let's keep it for edits but usually users might want to keep the old slug
            const categoryId = document.getElementById('categoryId').value;
            if (!categoryId) {
                const slug = this.value.toLowerCase()
                    .replace(/[^a-z0-9 -]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-');
                document.getElementById('catSlug').value = slug;
            }
        });
    }
});

function deleteCategory(id) {
    if (!confirm('Delete this category?')) return;

    fetch('https://havona.brandmindz.com/api/categories/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showToast('Category Deleted', 'success');
                fetchCategories();
            } else {
                showToast(data.message, 'error');
            }
        });
}

/**
 * Syncs blog categories when a category name is edited.
 * This is a frontend workaround because the backend stores category names as strings.
 */
async function syncBlogCategories(oldName, newName) {
    try {
        const response = await fetch('https://havona.brandmindz.com/api/blogs/fetch.php');
        const data = await response.json();

        if (!data.success) return;

        const blogsToUpdate = data.data.filter(blog => blog.category === oldName);

        if (blogsToUpdate.length === 0) return;

        const results = await Promise.allSettled(blogsToUpdate.map(async (blog) => {
            // We need to fetch full blog data to ensure we don't lose anything during update
            const blogRes = await fetch(`https://havona.brandmindz.com/api/blogs/fetch.php?id=${blog.id}`);
            const blogData = await blogRes.json();

            if (!blogData.success || !blogData.data.length) return;
            const fullBlog = blogData.data[0];

            const formData = new FormData();
            formData.append('id', fullBlog.id);
            formData.append('title', fullBlog.title);
            formData.append('slug', fullBlog.slug);
            formData.append('category', newName); // The Update
            formData.append('content', fullBlog.content);
            formData.append('short_description', fullBlog.short_description || '');
            formData.append('status', fullBlog.status);
            formData.append('tags', fullBlog.tags || '');
            formData.append('meta_title', fullBlog.meta_title || '');
            formData.append('meta_description', fullBlog.meta_description || '');
            // We don't append a new image, the backend should keep the old one if 'image' field is empty or missing in multipart
            // BUT some backends might delete it. Usually they check if($_FILES['image']['size'] > 0)

            return fetch('https://havona.brandmindz.com/api/blogs/edit.php', {
                method: 'POST',
                body: formData
            }).then(r => r.json());
        }));

        const failed = results.filter(r => r.status === 'rejected' || (r.value && !r.value.success));
        if (failed.length > 0) {
            showToast(`Sync partially failed: ${failed.length} blogs not updated.`, 'warning');
        } else {
            showToast(`Synchronized ${blogsToUpdate.length} blogs.`, 'success');
        }
    } catch (error) {
        console.error('Sync Error:', error);
        showToast('Failed to synchronize blogs.', 'error');
    }
}
