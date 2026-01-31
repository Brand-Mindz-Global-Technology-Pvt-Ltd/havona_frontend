document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.getElementById('timeline-scroll-wrapper');
    const carouselInner = document.getElementById('timeline-carousel');
    const slides = document.querySelectorAll('.timeline-slide');
    const dots = document.querySelectorAll('.timeline-dot');

    if (!wrapper || !carouselInner || !slides.length) return;

    let currentIndex = -1;
    const totalSlides = slides.length;

    function updateCarousel(index) {
        if (index === currentIndex) return;
        currentIndex = index;

        // Slide the entire container
        const translateX = -(index * (100 / totalSlides));
        carouselInner.style.transform = `translateX(${translateX}%)`;

        // Update Slides content animations
        slides.forEach((slide, i) => {
            const content = slide.querySelectorAll('.animate-on-slide');
            if (i === currentIndex) {
                content.forEach(el => {
                    el.classList.add('translate-y-0', 'opacity-100');
                    el.classList.remove('translate-y-4', 'opacity-0');
                });
            } else {
                content.forEach(el => {
                    el.classList.remove('translate-y-0', 'opacity-100');
                    el.classList.add('translate-y-4', 'opacity-0');
                });
            }
        });

        // Update Dots
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('bg-white', 'scale-125');
                dot.classList.remove('bg-white/40');
            } else {
                dot.classList.remove('bg-white', 'scale-125');
                dot.classList.add('bg-white/40');
            }
        });
    }

    function handleScroll() {
        if (!wrapper) return;

        const wrapperRect = wrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height;
        const viewportHeight = window.innerHeight;

        // Calculate progress within the wrapper
        const scrollDistance = -wrapperTop;
        const maxScroll = wrapperHeight - viewportHeight;

        // Progress (0 to 1)
        let progress = Math.max(0, Math.min(1, scrollDistance / maxScroll));

        // Map progress to slide index
        let index = Math.floor(progress * totalSlides);
        if (index >= totalSlides) index = totalSlides - 1;

        updateCarousel(index);
    }

    // Event Listeners
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!wrapper) return;
            const scrollStart = wrapper.offsetTop;
            const scrollDistance = (wrapper.offsetHeight - window.innerHeight) * (index / (totalSlides - 1 || 1));
            window.scrollTo({
                top: scrollStart + scrollDistance + 5, // Offset slightly into the section
                behavior: 'smooth'
            });
        });
    });

    // Initialize
    handleScroll();
});
