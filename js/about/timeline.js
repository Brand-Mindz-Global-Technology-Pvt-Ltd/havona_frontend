document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.timeline-slide');
    const dots = document.querySelectorAll('.timeline-dot');
    const prevBtn = document.getElementById('timeline-prev');
    const nextBtn = document.getElementById('timeline-next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel(index) {
        // Handle range
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        currentIndex = index;

        // Update Slides
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.remove('opacity-0', 'pointer-events-none');
                slide.classList.add('opacity-100');
                // Trigger animations for content inside slide
                const content = slide.querySelectorAll('.animate-on-slide');
                content.forEach(el => {
                    el.classList.add('translate-y-0', 'opacity-100');
                    el.classList.remove('translate-y-4', 'opacity-0');
                });
            } else {
                slide.classList.add('opacity-0', 'pointer-events-none');
                slide.classList.remove('opacity-100');

                const content = slide.querySelectorAll('.animate-on-slide');
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

    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateCarousel(index));
    });

    // Initialize
    updateCarousel(0);
});
