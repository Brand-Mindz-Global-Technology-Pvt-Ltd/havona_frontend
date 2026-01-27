// Global state for Transformation Carousel
const categories = ['architecture', 'construction', 'interior', 'pmc', 'realestate'];
const categoryImages = {
    'architecture': {
        after: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop',
        before: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop'
    },
    'construction': {
        after: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop',
        before: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop'
    },
    'interior': {
        after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
        before: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop'
    },
    'pmc': {
        after: 'https://images.unsplash.com/photo-1507537297725-24a1c434e3ea?q=80&w=2000&auto=format&fit=crop',
        before: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop'
    },
    'realestate': {
        after: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop',
        before: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop'
    }
};
let currentIndex = 2; // Start with interior

// Transformation Toggle Logic (Before/After)
function toggleTransform(state) {
    const img = document.getElementById('transform-img');
    const bg = document.getElementById('toggle-bg');
    const btnBefore = document.getElementById('btn-before');
    const btnAfter = document.getElementById('btn-after');

    // categories is globally available via another script block or in local scope
    // But since it's defined in a DOMContentLoaded block, let's make sure toggleTransform
    // can access the data. Usually, it's better to pass or use global.
    // For now, I'll use the existing global `categories` and `currentIndex`.

    if (state === 'before') {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = categoryImages[categories[currentIndex]].before;
            img.style.opacity = '1';
        }, 300);

        bg.style.transform = 'translateX(0)';
        bg.style.backgroundColor = '#FFFFFF';
        btnBefore.classList.remove('text-white/60', 'text-white');
        btnBefore.classList.add('text-black');
        btnAfter.classList.remove('text-black', 'text-white');
        btnAfter.classList.add('text-white/60');
    } else {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = categoryImages[categories[currentIndex]].after;
            img.style.opacity = '1';
        }, 300);

        bg.style.transform = 'translateX(100%)';
        bg.style.backgroundColor = '#FFFFFF';
        btnAfter.classList.remove('text-white/60', 'text-white');
        btnAfter.classList.add('text-black');
        btnBefore.classList.remove('text-black', 'text-white');
        btnBefore.classList.add('text-white/60');
    }
}

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

// Category Carousel Logic
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-filter-btn');
    const bannerImage = document.querySelector('.category-banner-img');
    const paginationDots = document.querySelectorAll('.pagination-dot');

    if (!bannerImage || categoryButtons.length === 0) return;

    // Function to update active category and banner
    window.updateCarousel = function (index) {
        currentIndex = index;
        const category = categories[index];

        // Update category buttons
        categoryButtons.forEach((btn, idx) => {
            if (idx === index) {
                btn.className = "category-filter-btn px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-[#475467] text-white font-['Rethink_Sans'] text-xs md:text-sm whitespace-nowrap transform scale-105 transition-all shadow-lg shadow-black/30";
            } else {
                btn.className = "category-filter-btn px-6 md:px-8 py-2.5 md:py-3 rounded-full border border-gray-400 text-gray-600 font-['Rethink_Sans'] text-xs md:text-sm hover:border-gray-800 transition-all whitespace-nowrap";
            }
        });

        // Update pagination dots
        paginationDots.forEach((dot, idx) => {
            if (idx === index) {
                dot.className = "pagination-dot w-2 h-2 rounded-full bg-black scale-150 transition-all duration-300 cursor-pointer";
            } else {
                dot.className = "pagination-dot w-2 h-2 rounded-full bg-gray-300 transition-all duration-300 cursor-pointer";
            }
        });

        // Update images with sliding-like fade
        const previewLeft = document.getElementById('preview-left-img');
        const previewRight = document.getElementById('preview-right-img');

        bannerImage.style.opacity = '0';
        if (previewLeft) previewLeft.parentElement.style.opacity = '0';
        if (previewRight) previewRight.parentElement.style.opacity = '0';

        setTimeout(() => {
            // Main Image (Always show "After" initially)
            if (categoryImages[category]) {
                bannerImage.src = categoryImages[category].after;
            }

            // Previews
            const leftIdx = (index - 1 + categories.length) % categories.length;
            const rightIdx = (index + 1) % categories.length;

            if (previewLeft) previewLeft.src = categoryImages[categories[leftIdx]].after;
            if (previewRight) previewRight.src = categoryImages[categories[rightIdx]].after;

            bannerImage.style.opacity = '1';
            // Previews fully opaque as requested
            if (previewLeft) {
                previewLeft.parentElement.style.opacity = '1';
                previewLeft.style.opacity = '1';
            }
            if (previewRight) {
                previewRight.parentElement.style.opacity = '1';
                previewRight.style.opacity = '1';
            }

            resetToggle();
        }, 300);
    };

    // Helper to reset toggle visual
    window.resetToggle = function () {
        const bg = document.getElementById('toggle-bg');
        const btnBefore = document.getElementById('btn-before');
        const btnAfter = document.getElementById('btn-after');
        if (bg) {
            bg.style.transform = 'translateX(100%)';
            bg.style.backgroundColor = '#FFFFFF';
        }
        if (btnBefore) {
            btnBefore.classList.remove('text-black', 'text-white');
            btnBefore.classList.add('text-white/60');
        }
        if (btnAfter) {
            btnAfter.classList.remove('text-white/60', 'text-white');
            btnAfter.classList.add('text-black');
        }
    };

    // Category button click handler
    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            updateCarousel(index);
        });
    });

    // Pagination dot click handler
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            updateCarousel(index);
        });
    });

    // Initialize
    updateCarousel(currentIndex);
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
