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
                <button onclick="deleteCategory(${cat.id})" class="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors" title="Delete">
                    <i class="ph ph-trash text-xl"></i>
                </button>
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
            const formData = {
                name: document.getElementById('catName').value,
                slug: document.getElementById('catSlug').value
            };

            fetch('https://havona.brandmindz.com/api/categories/add.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert('Category Added');
                        closeCategoryModal();
                        fetchCategories();
                    } else {
                        alert(data.message);
                    }
                });
        });

        // Auto Slug for Category
        document.getElementById('catName').addEventListener('input', function () {
            const slug = this.value.toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            document.getElementById('catSlug').value = slug;
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
                fetchCategories();
            } else {
                alert(data.message);
            }
        });
}
