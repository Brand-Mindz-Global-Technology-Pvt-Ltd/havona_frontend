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

// Transformation Toggle Logic (Before/After)
function toggleTransform(state) {
    const img = document.getElementById('transform-img');
    const bg = document.getElementById('toggle-bg');
    const btnBefore = document.getElementById('btn-before');
    const btnAfter = document.getElementById('btn-after');

    if (state === 'before') {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop'; // "Before" raw space
            img.style.opacity = '1';
        }, 300);

        bg.style.transform = 'translate-x(0)';
        btnBefore.classList.remove('text-white');
        btnBefore.classList.add('text-black');
        btnAfter.classList.remove('text-black');
        btnAfter.classList.add('text-white');
    } else {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'; // "After" styled space
            img.style.opacity = '1';
        }, 300);

        bg.style.transform = 'translate-x(100%)';
        btnAfter.classList.remove('text-white');
        btnAfter.classList.add('text-black');
        btnBefore.classList.remove('text-black');
        btnBefore.classList.add('text-white');
    }
}

// Category Filter with Banner Image Change and Auto-Rotation
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-filter-btn');
    const bannerImage = document.querySelector('.category-banner-img');
    const paginationDots = document.querySelectorAll('.pagination-dot');

    // Categories array for carousel
    const categories = ['architecture', 'construction', 'interior', 'pmc', 'realestate'];

    // Category-specific images mapping
    const categoryImages = {
        'architecture': 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop',
        'construction': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop',
        'interior': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
        'pmc': 'https://images.unsplash.com/photo-1507537297725-24a1c434e3ea?q=80&w=2000&auto=format&fit=crop',
        'realestate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop'
    };

    let currentIndex = 2; // Start with interior (index 2)
    let autoRotateInterval;

    // Function to update active category and banner
    function updateCarousel(index) {
        currentIndex = index;
        const category = categories[index];

        // Update category buttons
        categoryButtons.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.remove('border-gray-400', 'text-gray-600');
                btn.classList.add('bg-[#475467]', 'text-white', 'shadow-lg', 'shadow-gray-400/50', 'transform', 'scale-105');
            } else {
                btn.classList.remove('bg-[#475467]', 'text-white', 'shadow-lg', 'shadow-gray-400/50', 'scale-105');
                btn.classList.add('border-gray-400', 'text-gray-600');
            }
        });

        // Update pagination dots
        paginationDots.forEach((dot, idx) => {
            if (idx === index) {
                // Active dot: black border and black filled circle
                dot.classList.remove('border-white', 'bg-white');
                dot.classList.add('border-black', 'bg-black');
            } else {
                // Inactive dot: white border and white filled circle
                dot.classList.remove('border-black', 'bg-black');
                dot.classList.add('border-white', 'bg-white');
            }
        });

        // Update banner image
        if (bannerImage && categoryImages[category]) {
            bannerImage.style.opacity = '0';
            setTimeout(() => {
                bannerImage.src = categoryImages[category];
                bannerImage.style.opacity = '1';
            }, 300);
        }
    }

    // Auto-rotate every 5 seconds
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % categories.length;
            updateCarousel(currentIndex);
        }, 5000);
    }

    // Stop auto-rotate
    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Category button click handler
    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            stopAutoRotate();
            updateCarousel(index);
            startAutoRotate();
        });
    });

    // Pagination dot click handler
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            stopAutoRotate();
            updateCarousel(index);
            startAutoRotate();
        });
    });

    // Start auto-rotation on page load
    startAutoRotate();
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
                dot.classList.add('bg-black');
            } else {
                dot.classList.remove('bg-black');
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
            const scrollAmount = 400; // Card width (380px) + gap (20px)
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', function () {
            const scrollAmount = 400;
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
                card.classList.add('opacity-50', 'h-[90px]');
            } else if (index === 1) {
                // Middle card (current testimonial) - ACTIVE
                card.querySelector('img').src = testimonials[newIndex].image;
                card.classList.add('active', 'opacity-100', 'scale-105', 'h-[200px]');
            } else if (index === 2) {
                // Bottom card (next testimonial)
                const nextIndex = (newIndex + 1) % testimonials.length;
                card.querySelector('img').src = testimonials[nextIndex].image;
                card.classList.add('opacity-50', 'h-[90px]');
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
