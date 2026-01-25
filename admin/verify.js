document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('verification_email');
    if (!email) {
        alert('No email found. Redirecting to registration.');
        window.location.href = 'register.html';
        return;
    }
    document.getElementById('emailInput').value = email;
    document.getElementById('displayEmail').textContent = email;
});

document.getElementById('verifyForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const formData = new FormData(this);

    // Retrieve deferred registration data
    const tempDataStr = localStorage.getItem('temp_reg_data');
    if (tempDataStr) {
        const tempData = JSON.parse(tempDataStr);
        formData.append('name', tempData.name);
        formData.append('phone', tempData.phone);
        formData.append('password_hash', tempData.password_hash);
    }

    btn.disabled = true;
    btn.innerHTML = 'Verifying...';

    try {
        const response = await fetch('https://havona.brandmindz.com/auth/admin/verify_otp.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showMessage(result.message, 'success');
            // Clear temp data
            localStorage.removeItem('temp_reg_data');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            showMessage(result.message, 'error');
            btn.disabled = false;
            btn.innerHTML = 'Verify & Proceed';
        }
    } catch (error) {
        console.error(error);
        showMessage('An error occurred.', 'error');
        btn.disabled = false;
        btn.innerHTML = 'Verify & Proceed';
    }
});

document.getElementById('resendBtn').addEventListener('click', async function () {
    const email = document.getElementById('emailInput').value;
    const btn = this;

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
        const formData = new FormData();
        formData.append('email', email);

        const response = await fetch('https://havona.brandmindz.com/auth/admin/resend_otp.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showMessage(result.message, 'success');
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('Failed to resend OTP', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Resend';
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
