document.addEventListener('DOMContentLoaded', function () {
    const teamCards = document.querySelectorAll('.team-card');

    teamCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Check if it's a touch device or small screen
            if (window.innerWidth < 1024) {
                // Toggle active class on the clicked card
                const isActive = this.classList.contains('is-active');

                // Close others
                teamCards.forEach(c => c.classList.remove('is-active'));

                if (!isActive) {
                    this.classList.add('is-active');
                }
            }
        });
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.team-card')) {
            teamCards.forEach(c => c.classList.remove('is-active'));
        }
    });
});
