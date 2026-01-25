document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const messageEl = document.getElementById('message');
    const formData = new FormData(this);

    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-spinner animate-spin text-xl"></i> Signing In...';
    messageEl.classList.add('hidden');

    try {
        const response = await fetch('https://havona.brandmindz.com/auth/admin/login_admin.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            // Save user info
            localStorage.setItem('admin_user', JSON.stringify(result.user));
            window.location.href = 'index.html';
        } else {
            messageEl.textContent = result.message;
            messageEl.classList.remove('hidden');
            btn.disabled = false;
            btn.innerHTML = 'Sign In <i class="ph ph-arrow-right"></i>';
        }
    } catch (error) {
        console.error(error);
        messageEl.textContent = 'Server error. Please try again.';
        messageEl.classList.remove('hidden');
        btn.disabled = false;
        btn.innerHTML = 'Sign In <i class="ph ph-arrow-right"></i>';
    }
});
