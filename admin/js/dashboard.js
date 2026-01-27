document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats();
});

function updateDashboardStats() {
    // 1. Fetch Blogs for count
    fetch('https://havona.brandmindz.com/api/blogs/fetch.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const count = data.data ? data.data.length : 0;
                const el = document.getElementById('totalBlogsCount');
                if (el) animateNumber(el, count);
            }
        })
        .catch(err => console.error('Error fetching blog stats:', err));

    // 2. Fetch Categories for count
    fetch('https://havona.brandmindz.com/api/categories/fetch.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const count = data.data ? data.data.length : 0;
                const el = document.getElementById('totalCategoriesCount');
                if (el) animateNumber(el, count);
            }
        })
        .catch(err => console.error('Error fetching category stats:', err));

    // 3. Fetch Enquiries for unread count
    fetch('https://havona.brandmindz.com/api/enquiries/fetch.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // If backend supports is_read, filter them. If not, this might be 0 for now.
                const unreadCount = data.data ? data.data.filter(e => !e.is_read || e.is_read == 0).length : 0;
                const el = document.getElementById('unreadEnquiriesCount');
                if (el) animateNumber(el, unreadCount);
            }
        })
        .catch(err => console.error('Error fetching enquiry stats:', err));
}

function animateNumber(element, target) {
    let current = 0;
    const duration = 1000; // 1 second
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(progress * target);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    requestAnimationFrame(update);
}
