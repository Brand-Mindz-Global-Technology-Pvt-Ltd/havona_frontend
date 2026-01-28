document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('brand-values-track');
    if (!track) return;

    let currentIndex = 0;
    let autoScrollInterval;

    function getItemsPerView() {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateBrandCarousel() {
        const itemsPerView = getItemsPerView();
        const totalItems = track.children.length;

        // Ensure index doesn't go out of bounds for the current view
        if (currentIndex >= totalItems) currentIndex = 0;

        const offset = currentIndex * (100 / itemsPerView);
        track.style.transform = `translateX(-${offset}%)`;
    }

    function nextSet() {
        const itemsPerView = getItemsPerView();
        const totalItems = track.children.length;

        currentIndex += itemsPerView;

        if (currentIndex >= totalItems) {
            currentIndex = 0;
        }

        updateBrandCarousel();
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(nextSet, 3000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
    }

    window.addEventListener('resize', () => {
        updateBrandCarousel();
    });

    // Start autoscrolling
    startAutoScroll();

    // Pause on hover
    // track.parentElement.addEventListener('mouseenter', stopAutoScroll);
    // track.parentElement.addEventListener('mouseleave', startAutoScroll);

    // Initial call
    updateBrandCarousel();
});
