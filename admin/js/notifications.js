function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl transform translate-x-full opacity-0 transition-all duration-500 border whitespace-nowrap`;

    // Type Styling
    let icon = '';
    let bgColor = '';
    let textColor = '';
    let borderColor = '';

    switch (type) {
        case 'success':
            icon = '<i class="ph-fill ph-check-circle text-green-500 text-2xl"></i>';
            bgColor = 'bg-white';
            textColor = 'text-gray-900';
            borderColor = 'border-green-100';
            break;
        case 'error':
            icon = '<i class="ph-fill ph-x-circle text-red-500 text-2xl"></i>';
            bgColor = 'bg-white';
            textColor = 'text-gray-900';
            borderColor = 'border-red-100';
            break;
        case 'warning':
            icon = '<i class="ph-fill ph-warning-circle text-orange-500 text-2xl"></i>';
            bgColor = 'bg-white';
            textColor = 'text-gray-900';
            borderColor = 'border-orange-100';
            break;
        default:
            icon = '<i class="ph-fill ph-info text-blue-500 text-2xl"></i>';
            bgColor = 'bg-white';
            textColor = 'text-gray-900';
            borderColor = 'border-blue-100';
    }

    toast.classList.add(bgColor, textColor, borderColor);
    toast.innerHTML = `
        ${icon}
        <div class="flex flex-col">
            <span class="text-sm font-semibold">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <p class="text-[13px] text-gray-500 font-light">${message}</p>
        </div>
        <button onclick="this.parentElement.remove()" class="ml-4 p-1 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors">
            <i class="ph ph-x"></i>
        </button>
    `;

    container.appendChild(toast);

    // Trigger Animation
    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
        toast.classList.add('translate-x-0', 'opacity-100');
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('translate-x-0', 'opacity-100');
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// Map old alerts to Toast (Safe global override if needed, but better to call directly)
// window.alert = (msg) => showToast(msg, 'info'); 

/**
 * Premium Confirmation Modal
 * Returns a Promise that resolves to true if confirmed, false otherwise.
 */
function showConfirm(title = 'Are you sure?', message = 'This action cannot be undone.', confirmText = 'Confirm Action') {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const backdrop = document.getElementById('confirmBackdrop');
        const content = document.getElementById('confirmContent');
        const confirmBtn = document.getElementById('confirmBtn');
        const cancelBtn = document.getElementById('cancelConfirmBtn');

        if (!modal) {
            // Fallback if modal HTML is missing
            resolve(confirm(message));
            return;
        }

        // Setup Content
        document.getElementById('confirmTitle').textContent = title;
        document.getElementById('confirmMessage').textContent = message;
        confirmBtn.textContent = confirmText;

        // Show Modal
        modal.classList.remove('hidden');
        requestAnimationFrame(() => {
            backdrop.classList.remove('opacity-0');
            backdrop.classList.add('opacity-100');
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        });

        const close = (result) => {
            backdrop.classList.remove('opacity-100');
            backdrop.classList.add('opacity-0');
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');

            setTimeout(() => {
                modal.classList.add('hidden');
                resolve(result);
            }, 300);
        };

        confirmBtn.onclick = () => close(true);
        cancelBtn.onclick = () => close(false);
        backdrop.onclick = () => close(false);
    });
}
