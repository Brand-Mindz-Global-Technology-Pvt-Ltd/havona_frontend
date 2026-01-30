function fetchEnquiries() {
    const tbody = document.getElementById('enquiriesTableBody');
    if (!tbody) return;

    fetch('https://havona.brandmindz.com/api/enquiries/fetch.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderEnquiries(data.data);
            } else {
                tbody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-red-400">Error: ${data.message}</td></tr>`;
                showToast(data.message, 'error');
            }
        })
        .catch(error => {
            tbody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-red-400">Failed to load enquiries.</td></tr>`;
            console.error('Error:', error);
        });
}

function renderEnquiries(enquiries) {
    const tbody = document.getElementById('enquiriesTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (enquiries.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-8 text-center text-gray-400 font-rethink">No enquiries found.</td></tr>`;
        return;
    }

    enquiries.forEach(enquiry => {
        const isNew = !enquiry.is_read || enquiry.is_read == 0;
        const tr = document.createElement('tr');
        tr.className = `border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${isNew ? 'bg-blue-50/30' : ''}`;

        tr.innerHTML = `
            <td class="p-6">
                <div class="flex flex-col">
                    <span class="font-medium text-gray-900">${enquiry.name || '-'}</span>
                    ${isNew ? '<span class="inline-block w-fit px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded-md mt-1">New</span>' : ''}
                </div>
            </td>
            <td class="p-6 font-medium text-gray-900">${enquiry.last_name || '-'}</td>
            <td class="p-6 text-gray-600 font-rethink text-sm">${enquiry.email || '-'}</td>
            <td class="p-6 text-gray-600 font-rethink text-sm">${enquiry.phone || '-'}</td>
            <td class="p-6 text-gray-600 font-rethink text-sm">${enquiry.service || '-'}</td>
            <td class="p-6 text-gray-600 text-sm max-w-xs truncate font-rethink" title="${enquiry.message || ''}">
                ${enquiry.message || '-'}
            </td>
            <td class="p-6 text-gray-500 text-xs font-rethink">
                ${new Date(enquiry.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </td>
            <td class="p-6">
                <div class="flex items-center gap-2">
                    ${isNew ? `
                        <button onclick="markAsRead(${enquiry.id})" class="p-2 hover:bg-white rounded-lg text-blue-500 transition-colors shadow-sm border border-transparent hover:border-blue-100" title="Mark as Read">
                            <i class="ph ph-check-circle text-xl"></i>
                        </button>
                    ` : `
                        <span class="text-gray-300"><i class="ph ph-check-circle text-xl"></i></span>
                    `}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function markAsRead(id) {
    fetch('https://havona.brandmindz.com/api/enquiries/mark_read.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, is_read: 1 })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                fetchEnquiries();
                showToast('Enquiry marked as read', 'success');
                // Also update dashboard if visible
                if (typeof updateDashboardStats === 'function') {
                    updateDashboardStats();
                }
            } else {
                showToast(data.message, 'error');
            }
        })
        .catch(err => {
            console.error('Error marking as read:', err);
            showToast('Failed to mark as read', 'error');
        });
}
