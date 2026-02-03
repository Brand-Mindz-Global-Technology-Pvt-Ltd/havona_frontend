// Admin Inactivity Timeout Logic
(function () {
    let timeoutTimer;
    const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes in milliseconds

    function resetTimer() {
        if (timeoutTimer) clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(logoutDueToInactivity, INACTIVITY_LIMIT);
    }

    async function logoutDueToInactivity() {
        console.log('Logging out due to inactivity...');
        localStorage.removeItem('admin_user');

        // Use the existing notification system if available
        if (typeof showToast === 'function') {
            showToast('Session expired due to inactivity.', 'error');
            // Wait a bit for the toast to be seen
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            alert('Session expired due to 10 minutes of inactivity.');
            window.location.href = 'login.html';
        }
    }

    // Events to monitor for activity
    const activityEvents = [
        'mousedown', 'mousemove', 'keypress',
        'scroll', 'touchstart', 'click'
    ];

    // Add event listeners
    activityEvents.forEach(event => {
        document.addEventListener(event, resetTimer, true);
    });

    // Initialize timer
    resetTimer();

    console.log('Admin inactivity timeout (10 mins) initialized.');
})();
