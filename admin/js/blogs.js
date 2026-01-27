function showBlogSection() {
    showSection('blogs-section');
    fetchBlogs();
    fetchCategories(); // Ensure categories are loaded for dropdowns even if not in category tab
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial fetch to populate dropdowns if needed on page load
    // fetchCategories(); // Handled by categories.js or specific triggers
});

// Blog script similar to before but pointing to ../../Havona-Back-End/api/blogs/
const API_BASE = 'https://havona.brandmindz.com/api/blogs/';

function fetchBlogs() {
    const tbody = document.getElementById('blogsTableBody');
    if (!tbody) return;

    fetch(API_BASE + 'fetch.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderBlogs(data.data);
            } else {
                tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-red-400">Error: ${data.message}</td></tr>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-red-400">Failed to load blogs.</td></tr>`;
        });
}

function renderBlogs(blogs) {
    const tbody = document.getElementById('blogsTableBody');
    tbody.innerHTML = '';

    if (blogs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-gray-400">No blogs found.</td></tr>`;
        return;
    }

    blogs.forEach(blog => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-gray-50 hover:bg-gray-50/50 transition-colors';

        // Correctly handle image URL for live server
        // If blog.image contains 'Havona-Back-End/uploads...', we just prepend domain
        const imgUrl = blog.image ? `https://havona.brandmindz.com/uploads/blogs/${blog.image}` : `https://via.placeholder.com/80?text=No+Img`;

        tr.innerHTML = `
            <td class="p-6">
                <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img src="${imgUrl}" class="w-full h-full object-cover">
                </div>
            </td>
            <td class="p-6 font-medium text-gray-900">${blog.title}</td>
            <td class="p-6 text-gray-600">${blog.category || '-'}</td>
            <td class="p-6">
                <span class="inline-block px-3 py-1 rounded-full text-xs font-medium ${blog.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}">
                    ${blog.status}
                </span>
            </td>
            <td class="p-6 text-gray-500 text-sm">${new Date(blog.created_at).toLocaleDateString()}</td>
            <td class="p-6">
                <div class="flex items-center gap-2">
                    <button onclick="showEditBlogForm(${blog.id})" class="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Edit">
                        <i class="ph ph-pencil-simple text-xl"></i>
                    </button>
                    <button onclick="deleteBlog(${blog.id})" class="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors" title="Delete">
                        <i class="ph ph-trash text-xl"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showAddBlogForm() {
    document.querySelectorAll('.section-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('blog-form-section').classList.remove('hidden');
    document.getElementById('blogForm').reset();
    document.getElementById('blogId').value = '';
    document.getElementById('blogActionType').value = 'add';
    document.getElementById('blogFormTitle').textContent = 'Add Blog';
    document.getElementById('imagePreview').classList.add('hidden');
    document.getElementById('saveBlogBtn').textContent = 'Save Blog Post';

    // Ensure categories are loaded for the dropdown
    fetchCategories();
}

function showEditBlogForm(blogId) {
    document.querySelectorAll('.section-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('blog-form-section').classList.remove('hidden');
    document.getElementById('blogFormTitle').textContent = 'Edit Blog';
    document.getElementById('blogActionType').value = 'edit';
    document.getElementById('saveBlogBtn').textContent = 'Update Blog Post';

    // Load Categories then Data to ensure dropdown population works
    fetchCategories();

    fetch(`${API_BASE}fetch.php?id=${blogId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                const blog = data.data[0];
                document.getElementById('blogId').value = blog.id;
                document.getElementById('title').value = blog.title;
                document.getElementById('slug').value = blog.slug;
                document.getElementById('short_description').value = blog.short_description || '';
                document.getElementById('content').value = blog.content;
                document.getElementById('category').value = blog.category || '';
                document.getElementById('tags').value = blog.tags || '';
                document.getElementById('meta_title').value = blog.meta_title || '';
                document.getElementById('meta_description').value = blog.meta_description || '';
                document.getElementById('status').value = blog.status;

                if (blog.image) {
                    const preview = document.getElementById('imagePreview');
                    preview.src = `https://havona.brandmindz.com/uploads/blogs/${blog.image}`;
                    preview.classList.remove('hidden');
                } else {
                    document.getElementById('imagePreview').classList.add('hidden');
                }
            } else {
                alert('Blog not found');
                showBlogSection();
            }
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('blogForm');
    if (form) {
        form.addEventListener('submit', handleBlogSubmit);
        document.getElementById('title').addEventListener('input', function () {
            if (document.getElementById('blogActionType').value === 'add') {
                const slug = this.value.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
                document.getElementById('slug').value = slug;
            }
        });
    }
});

function handleBlogSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const actionType = document.getElementById('blogActionType').value;
    const endpoint = actionType === 'add' ? 'add.php' : 'edit.php';

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Saving...';

    const formData = new FormData(form);

    fetch(API_BASE + endpoint, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(actionType === 'add' ? 'Blog Added' : 'Blog Updated');
                showBlogSection();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error(error);
            alert('Error saving blog');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
}

function deleteBlog(id) {
    if (!confirm('Delete this blog?')) return;
    fetch(API_BASE + 'delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) fetchBlogs();
            else alert(data.message);
        });
}
