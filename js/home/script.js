// Service Accordion Functionality
document.addEventListener('DOMContentLoaded', function () {
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.addEventListener('click', function () {
            const isActive = this.classList.contains('active');

            // Close all items
            serviceItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });
});

// Design Insights Horizontal Scroll with Pagination
document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.getElementById('insights-scroll');
    const paginationDots = document.querySelectorAll('.insights-pagination-dot');

    if (!scrollContainer || paginationDots.length === 0) return;

    let currentPage = 0;
    const totalPages = paginationDots.length;

    // Update pagination dots based on scroll position
    function updatePaginationDots() {
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const scrollPosition = scrollContainer.scrollLeft;
        const scrollPercentage = scrollPosition / scrollWidth;

        // Calculate which page we're on
        currentPage = Math.round(scrollPercentage * (totalPages - 1));

        paginationDots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-[#4D606C]', 'scale-150');
            } else {
                dot.classList.remove('bg-[#4D606C]', 'scale-150');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    // Scroll to specific page when pagination dot is clicked
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const targetScroll = (scrollWidth / (totalPages - 1)) * index;

            scrollContainer.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        });
    });


    // Update pagination on scroll
    scrollContainer.addEventListener('scroll', updatePaginationDots);

    // Initialize pagination
    updatePaginationDots();

    // Arrow button navigation
    const scrollLeftBtn = document.getElementById('insights-scroll-left');
    const scrollRightBtn = document.getElementById('insights-scroll-right');

    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', function () {
            const scrollAmount = scrollContainer.clientWidth * 0.8; // Scroll 80% of view
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', function () {
            const scrollAmount = scrollContainer.clientWidth * 0.8;
            scrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function () {
    const testimonials = [
        {
            title: "Working With Havona Was An Exceptional Experience From Start To Finish.",
            content: "They Understood Our Lifestyle And Translated It Beautifully Into The Design. Every Detail Was Thoughtfully Planned And Executed With Precision. The Space Feels Elegant, Functional, And Truly Personal. Quality, Timelines, And Communication Were Handled Seamlessly. We Couldn't Be Happier With The Final Outcome.",
            name: "Mr. Prashana Balaji",
            title_role: "Founder Of Princeton, Coimbatore",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
        },
        {
            title: "An Outstanding Team That Delivers Beyond Expectations.",
            content: "From The Initial Consultation To The Final Reveal, Havona's Team Demonstrated Unmatched Professionalism And Creativity. They Listened Carefully To Our Vision And Brought It To Life With Stunning Results. The Attention To Detail And Commitment To Excellence Is Truly Remarkable.",
            name: "Mrs. Ananya Krishnan",
            title_role: "CEO Of Tech Innovations, Chennai",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
        },
        {
            title: "A Transformative Experience With Remarkable Results.",
            content: "Working With Havona Has Been A Journey Of Discovery And Excellence. Their Innovative Approach And Meticulous Execution Have Transformed Our Space Into Something Extraordinary. The Team's Dedication To Quality And Client Satisfaction Is Evident In Every Aspect Of Their Work.",
            name: "Mr. Rajesh Kumar",
            title_role: "Managing Director, Bangalore",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
        }
    ];

    let currentIndex = 1; // Start with middle item (index 1)

    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const imageCards = document.querySelectorAll('.testimonial-image');
    const contentContainer = document.querySelector('.testimonial-content');

    function updateTestimonial(newIndex) {
        // Fade out content
        contentContainer.style.opacity = '0';

        setTimeout(() => {
            // Update content
            const testimonial = testimonials[newIndex];
            contentContainer.querySelector('h3').textContent = testimonial.title;
            contentContainer.querySelector('p').textContent = testimonial.content;
            contentContainer.querySelector('h4').textContent = testimonial.name;
            contentContainer.querySelector('h4 + p').textContent = testimonial.title_role;

            // Fade in content
            setTimeout(() => {
                contentContainer.style.opacity = '1';
            }, 50);
        }, 300);

        // Update image cards
        imageCards.forEach((card, index) => {
            card.classList.remove('active', 'opacity-50', 'opacity-100', 'scale-105', 'h-[80px]', 'h-[90px]', 'h-[180px]', 'h-[200px]');

            if (index === 0) {
                // Top card (previous testimonial)
                const prevIndex = (newIndex - 1 + testimonials.length) % testimonials.length;
                card.querySelector('img').src = testimonials[prevIndex].image;
                card.classList.add('opacity-100', 'h-[90px]');
            } else if (index === 1) {
                // Middle card (current testimonial) - ACTIVE
                card.querySelector('img').src = testimonials[newIndex].image;
                card.classList.add('active', 'opacity-100', 'scale-105', 'h-[200px]');
            } else if (index === 2) {
                // Bottom card (next testimonial)
                const nextIndex = (newIndex + 1) % testimonials.length;
                card.querySelector('img').src = testimonials[nextIndex].image;
                card.classList.add('opacity-100', 'h-[90px]');
            }
        });

        currentIndex = newIndex;
    }

    // Previous button (up arrow)
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonial(newIndex);
        });
    }

    // Next button (down arrow)
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            const newIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonial(newIndex);
        });
    }

    // Initialize with first testimonial
    updateTestimonial(1);
});

// Video Modal Logic
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('open-video-modal');
    const closeBtn = document.getElementById('close-video-modal');
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');

    if (!openBtn || !modal || !video) return;

    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        video.play();
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        video.pause();
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});

// Built On Vision USP Scroller (Mobile/Tablet)
document.addEventListener('DOMContentLoaded', function () {
    const scroller = document.getElementById('usp-scroller');
    const container = document.getElementById('usp-scroller-container');

    if (!scroller || !container) return;

    const cards = scroller.querySelectorAll('.usp-card-mobile');
    let scrollIndex = 0;

    function autoScroll() {
        if (window.innerWidth >= 768) return; // Only for mobile (Tablet has 2x2 grid)

        scrollIndex = (scrollIndex + 1) % cards.length;
        const gap = 16;
        const scrollAmount = (cards[0].offsetWidth + gap) * scrollIndex;

        scroller.style.transform = `translateX(-${scrollAmount}px)`;
    }

    let scrollInterval = setInterval(autoScroll, 3000);

    // Pause on touch/interaction
    container.addEventListener('touchstart', () => clearInterval(scrollInterval));
    container.addEventListener('touchend', () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(autoScroll, 3000);
    });

    // Reset on resize
    window.addEventListener('resize', () => {
        scrollIndex = 0;
        scroller.style.transform = 'translateX(0)';
    });
});

// Hero Scroll Down functionality
document.addEventListener('DOMContentLoaded', function () {
    const scrollArrow = document.getElementById('scroll-to-next');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            const nextSection = document.getElementById('hero').nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

});

// Decorative Button Responsive Toggles (Mobile)
document.addEventListener('DOMContentLoaded', function () {
    const decoButtons = document.querySelectorAll('.group.cursor-pointer');

    decoButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Only toggle on small screens (mobile/tablet)
            if (window.innerWidth < 768) {
                this.classList.toggle('active-border');

                // Optional: Auto-remove after some time for a feedback feel
                // setTimeout(() => this.classList.remove('active-border'), 2000);
            }
        });
    });
});
