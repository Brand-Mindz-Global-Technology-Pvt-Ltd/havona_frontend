document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    const formData = new FormData(this);

    // Client-side validation
    const password = formData.get('password');
    const confirmPasword = formData.get('confirm_password');

    if (password !== confirmPasword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    const passwordRegex = /(?=.*[A-Z])(?=.*[\W_])/;
    if (!passwordRegex.test(password)) {
        showMessage('Password must contain at least one capital letter and one symbol', 'error');
        return;
    }

    // Disable button
    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-spinner animate-spin text-xl"></i> Processing...';

    try {
        const response = await fetch('https://havona.brandmindz.com/auth/admin/register_admin.php', {
            method: 'POST',
            body: formData
        });

        const textResponse = await response.text();
        let result;
        try {
            result = JSON.parse(textResponse);
        } catch (e) {
            console.error("Server Response (Not JSON):", textResponse);
            throw new Error("Server returned an incomplete response. Please check console.");
        }

        if (result.success) {
            showMessage(result.message, 'success');
            // Store email AND temporary data for verification page
            localStorage.setItem('verification_email', formData.get('email'));
            if (result.temp_data) {
                localStorage.setItem('temp_reg_data', JSON.stringify(result.temp_data));
            }
            setTimeout(() => {
                window.location.href = 'verify.html';
            }, 2000);
        } else {
            showMessage(result.message, 'error');
            btn.disabled = false;
            btn.innerHTML = 'Create Account <i class="ph ph-arrow-right"></i>';
        }
    } catch (error) {
        console.error(error);
        showMessage(error.message || 'An error occurred. Please try again.', 'error');
        btn.disabled = false;
        btn.innerHTML = 'Create Account <i class="ph ph-arrow-right"></i>';
    }
});

function showMessage(msg, type) {
    const el = document.getElementById('message');
    el.textContent = msg;
    el.classList.remove('hidden', 'text-red-500', 'bg-red-50', 'text-green-500', 'bg-green-50');
    el.classList.add('block');
    if (type === 'error') {
        el.classList.add('text-red-600', 'bg-red-50');
    } else {
        el.classList.add('text-green-600', 'bg-green-50');
    }
}
