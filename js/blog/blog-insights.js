document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.getElementById('blog-insights-scroll');
    const prevBtn = document.getElementById('blog-insights-prev');
    const nextBtn = document.getElementById('blog-insights-next');
    const paginationDots = document.querySelectorAll('.blog-pagination-dot');

    if (!scrollContainer) return;

    // Scroll Logic
    function scroll(direction) {
        const scrollAmount = scrollContainer.clientWidth * 0.8;
        scrollContainer.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => scroll('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => scroll('next'));

    // Improved Pagination Sync
    function syncDots() {
        if (!paginationDots.length) return;

        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const scrollPosition = scrollContainer.scrollLeft;
        const scrollPercentage = scrollWidth > 0 ? scrollPosition / scrollWidth : 0;
        const activeIndex = Math.round(scrollPercentage * (paginationDots.length - 1));

        paginationDots.forEach((dot, index) => {
            const wrapper = dot.querySelector('.dot-wrapper');
            const inner = dot.querySelector('.dot-inner');

            if (index === activeIndex) {
                // Active: Nested black circle within a border circle
                if (wrapper) {
                    wrapper.classList.add('border', 'border-black');
                    wrapper.classList.remove('border-transparent');
                }
                if (inner) {
                    inner.classList.add('bg-black');
                    inner.classList.remove('bg-gray-300');
                    inner.classList.add('scale-100');
                }
            } else {
                // Inactive: Simple grey circle without a border
                if (wrapper) {
                    wrapper.classList.remove('border', 'border-black');
                    wrapper.classList.add('border-transparent');
                }
                if (inner) {
                    inner.classList.add('bg-gray-300');
                    inner.classList.remove('bg-black');
                    inner.classList.remove('scale-100');
                }
            }
        });
    }

    // Click on dots
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const targetScroll = (scrollWidth / (paginationDots.length - 1)) * index;
            scrollContainer.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        });
    });

    // Listen for scroll events with debounce/requestAnimationFrame for performance
    let isScrolling;
    scrollContainer.addEventListener('scroll', () => {
        window.cancelAnimationFrame(isScrolling);
        isScrolling = window.requestAnimationFrame(syncDots);
    });

    syncDots(); // Initial call
});
