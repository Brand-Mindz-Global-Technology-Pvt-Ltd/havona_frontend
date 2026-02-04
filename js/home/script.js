// Partners Logo Carousel Animation
(function initPartnersCarousel() {
    // Inject CSS animation styles dynamically
    const styleSheet = document.createElement('style');
    styleSheet.id = 'partners-carousel-styles';
    styleSheet.textContent = `
        @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        
        .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
        }
        
        .partners-carousel-wrapper:hover .animate-scroll-left {
            animation-play-state: paused;
        }
        
        @media (max-width: 768px) {
            .animate-scroll-left {
                animation-duration: 30s;
            }
        }
        
        @media (max-width: 480px) {
            .animate-scroll-left {
                animation-duration: 25s;
            }
        }
    `;
    document.head.appendChild(styleSheet);
})();

// Service Accordion Functionality
document.addEventListener('DOMContentLoaded', function () {
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        // Expand on Hover
        item.addEventListener('mouseenter', function () {
            // Close all items
            serviceItems.forEach(i => i.classList.remove('active'));
            // Open hovered item
            this.classList.add('active');
        });

        // Redirect on Click
        item.addEventListener('click', function () {
            const serviceName = this.getAttribute('data-service');
            if (serviceName) {
                // Redirect to service page with parameter and anchor to section
                window.location.href = `./service/service.html?service=${encodeURIComponent(serviceName)}#services-section`;
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
            title: "Turning Our Vision Into Reality",
            content: "Havona completely understood what we were looking for. They suggested practical ideas, handled everything smoothly, and delivered a space that feels like home. We couldn’t be happier with the results.",
            name: "Raghav & Priya",
            // title_role: "Founder Of Princeton, Chennai",
            image: "./assets/home/Raghav.webp"
        },
        {
            title: "Professional, Friendly, and Reliable",
            content: "The team at Havona made the whole process simple and enjoyable. They answered all our questions, gave honest recommendations, and the final interiors look better than we imagined.",
            name: "Anita Sharma",
            // title_role: "CEO Of Tech Innovations, Chennai",
            image: "./assets/home/Anita.webp"
        },
        {
            title: "Attention to Every Detail",
            content: "From start to finish, Havona paid attention to even the smallest details. Their designs are creative, the quality is top-notch, and we always felt involved in the process. Truly a team that cares.",
            name: "Vikram & Neha",
            // title_role: "Managing Director, Bangalore",
            image: "./assets/home/Vikram.webp"
        },
        {
            title: "Beautiful Spaces, Happy Clients",
            content: "Havona transformed our home in a way that exceeded our expectations. The team was responsive, patient, and really dedicated to delivering the best results. Our space now feels modern, functional, and welcoming.",
            name: "Sanjay Rao",
            // title_role: "Managing Director, Bangalore",
            image: "./assets/home/Sanjay-Rao.jpg"
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
            card.classList.remove(
                'active',
                'opacity-50',
                'opacity-100',
                'scale-105',
                'h-[80px]',
                'h-[90px]',
                'h-[180px]',
                'h-[200px]',
                'blur-sm',
                'blur-md'
            );
            // remove possible blur filter directly on image for safety
            card.querySelector('img').style.filter = "";

            if (index === 0) {
                // Top card (previous testimonial)
                const prevIndex = (newIndex - 1 + testimonials.length) % testimonials.length;
                card.querySelector('img').src = testimonials[prevIndex].image;
                card.classList.add('h-[100px]', 'md:h-[120px]');
                card.querySelector('img').style.filter = "blur(5px)";
            } else if (index === 1) {
                // Middle card (current testimonial) - ACTIVE
                card.querySelector('img').src = testimonials[newIndex].image;
                card.classList.add('active', 'scale-105', 'h-[200px]', 'sm:h-[220px]', 'md:h-[240px]');
                card.querySelector('img').style.filter = "";
            } else if (index === 2) {
                // Bottom card (next testimonial)
                const nextIndex = (newIndex + 1) % testimonials.length;
                card.querySelector('img').src = testimonials[nextIndex].image;
                card.classList.add('h-[100px]', 'md:h-[120px]');
                card.querySelector('img').style.filter = "blur(5px)";
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
// Pricing Cards Slider Pagination (Mobile/Tablet)
document.addEventListener('DOMContentLoaded', function () {
    const pricingScroll = document.getElementById('pricing-cards-scroll');
    const pricingDots = document.querySelectorAll('.pricing-pagination-dot');

    if (!pricingScroll || pricingDots.length === 0) return;

    function updatePricingDots() {
        if (window.innerWidth >= 1024) return; // Only for mobile/tablet

        const scrollWidth = pricingScroll.scrollWidth - pricingScroll.clientWidth;
        if (scrollWidth <= 0) return;

        const scrollPosition = pricingScroll.scrollLeft;
        const scrollPercentage = Math.min(Math.max(scrollPosition / scrollWidth, 0), 1);

        const activeIndex = Math.round(scrollPercentage * (pricingDots.length - 1));

        pricingDots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-[#4D606C]', 'scale-125');
            } else {
                dot.classList.remove('bg-[#4D606C]', 'scale-125');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    // Scroll to specific card on dot click
    pricingDots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            const cards = pricingScroll.querySelectorAll('.shrink-0');
            if (cards[index]) {
                const targetScroll = cards[index].offsetLeft - pricingScroll.offsetLeft;
                pricingScroll.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
        });
    });

    pricingScroll.addEventListener('scroll', updatePricingDots);

    // Initial call
    updatePricingDots();

    // Re-check on resize
    window.addEventListener('resize', updatePricingDots);
});
