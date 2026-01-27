// Transformation Showcase Logic
const categories = ['architecture', 'construction', 'interior', 'pmc', 'realestate'];
const categoryImages = {
    'architecture': {
        after: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop'
    },
    'construction': {
        after: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop'
    },
    'interior': {
        after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
        before: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop'
    },
    'pmc': {
        after: 'https://images.unsplash.com/photo-1507537297725-24a1c434e3ea?q=80&w=2000&auto=format&fit=crop'
    },
    'realestate': {
        after: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop'
    }
};
let currentIndex = 2; // Start with interior

// Transformation Toggle Logic (Before/After)
function toggleTransform(state) {
    const img = document.getElementById('transform-img');
    const bg = document.getElementById('toggle-bg');
    const btnBefore = document.getElementById('btn-before');
    const btnAfter = document.getElementById('btn-after');

    if (!img || !bg || !btnBefore || !btnAfter) return;

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

// Category Carousel Logic
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-filter-btn');
    const bannerImage = document.querySelector('.category-banner-img');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    const toggleContainer = document.getElementById('transformation-toggle-container');

    if (!bannerImage || categoryButtons.length === 0) return;

    // Function to update active category and banner
    window.updateCarousel = function (index) {
        currentIndex = index;
        const category = categories[index];
        const hasBefore = !!categoryImages[category].before;

        // Update category buttons
        categoryButtons.forEach((btn, idx) => {
            if (idx === index) {
                btn.className = "category-filter-btn px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-[#475467] text-white font-rethink text-xs md:text-sm whitespace-nowrap transform scale-105 transition-all shadow-lg shadow-black/30";
            } else {
                btn.className = "category-filter-btn px-6 md:px-8 py-2.5 md:py-3 rounded-full border border-gray-400 text-gray-600 font-rethink text-xs md:text-sm hover:border-gray-800 transition-all whitespace-nowrap";
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

        // Show/Hide Before-After Toggle
        if (toggleContainer) {
            toggleContainer.style.display = hasBefore ? 'flex' : 'none';
        }

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
            if (previewLeft) previewLeft.parentElement.style.opacity = '1';
            if (previewRight) previewRight.parentElement.style.opacity = '1';

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
