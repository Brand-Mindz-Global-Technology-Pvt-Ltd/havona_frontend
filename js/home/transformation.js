// Transformation Showcase Logic
const categories = ['architecture', 'construction', 'interior', 'pmc', 'realestate'];
const categoryImages = {
    'architecture': {
        after: './assets/home/Architecture-after.webp'
    },
    'construction': {
        after: './assets/home/Construction-after.webp'
    },
    'interior': {
        after: './assets/home/Interior-after.webp',
        before: './assets/home/Interior-before.webp'
    },
    'pmc': {
        after: './assets/home/Project-Management-after.webp'
    },
    'realestate': {
        after: './assets/home/Real-Estate-after.webp'
    }
};
let currentIndex = 2; // Start with interior

// Initialize Slider Logic
function initSlider() {
    const slider = document.getElementById('transform-slider');
    const beforeWrap = document.getElementById('before-image-wrap');
    const sliderHandle = document.getElementById('slider-handle');

    if (!slider || !beforeWrap || !sliderHandle) return;

    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        // value 0 = Left (After image fully visible), value 100 = Right (Before image fully visible)
        // clip-path: inset(0 100-value% 0 0)
        beforeWrap.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        sliderHandle.style.left = `${value}%`;

        // Remove transitions during active dragging for smoothness
        beforeWrap.classList.remove('transition-[clip-path]');
        sliderHandle.classList.remove('transition-all');
    });

    slider.addEventListener('change', () => {
        // Re-add transitions when dragging stops
        beforeWrap.classList.add('transition-[clip-path]');
        sliderHandle.classList.add('transition-all');
    });
}

// Category Carousel Logic
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-filter-btn');
    const bannerImage = document.getElementById('transform-img');
    const beforeImage = document.getElementById('transform-before-img');
    const beforeWrap = document.getElementById('before-image-wrap');
    const sliderHandle = document.getElementById('slider-handle');
    const sliderInput = document.getElementById('transform-slider');
    const labels = document.querySelectorAll('.slider-label');
    const paginationDots = document.querySelectorAll('.pagination-dot');

    if (!bannerImage || categoryButtons.length === 0) return;

    // Initialize Slider interaction
    initSlider();

    // Function to update active category and banner
    window.updateCarousel = function (index) {
        currentIndex = index;
        const category = categories[index];
        const imageData = categoryImages[category];
        const hasBefore = !!imageData.before;

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

        // Show/Hide Slider Elements
        if (beforeWrap) beforeWrap.style.display = hasBefore ? 'block' : 'none';
        if (sliderHandle) sliderHandle.style.display = hasBefore ? 'block' : 'none';
        if (sliderInput) sliderInput.style.display = hasBefore ? 'block' : 'none';
        labels.forEach(label => label.style.display = hasBefore ? 'block' : 'none');

        // Reset Slider Position with transition for immediate visual feedback
        if (sliderInput) sliderInput.value = 50;
        if (beforeWrap) {
            beforeWrap.classList.add('transition-[clip-path]');
            beforeWrap.style.clipPath = 'inset(0 50% 0 0)';
        }
        if (sliderHandle) {
            sliderHandle.classList.add('transition-all');
            sliderHandle.style.left = '50%';
        }

        // Update images with fade effect
        const previewLeft = document.getElementById('preview-left-img');
        const previewRight = document.getElementById('preview-right-img');

        bannerImage.style.opacity = '0';
        if (beforeImage) beforeImage.style.opacity = '0';
        if (previewLeft) previewLeft.parentElement.style.opacity = '0';
        if (previewRight) previewRight.parentElement.style.opacity = '0';

        setTimeout(() => {
            // Main Images
            bannerImage.src = imageData.after;
            if (hasBefore && beforeImage) {
                beforeImage.src = imageData.before;
            }

            // Previews
            const leftIdx = (index - 1 + categories.length) % categories.length;
            const rightIdx = (index + 1) % categories.length;

            if (previewLeft) previewLeft.src = categoryImages[categories[leftIdx]].after;
            if (previewRight) previewRight.src = categoryImages[categories[rightIdx]].after;

            bannerImage.style.opacity = '1';
            if (beforeImage) beforeImage.style.opacity = '1';
            if (previewLeft) previewLeft.parentElement.style.opacity = '1';
            if (previewRight) previewRight.parentElement.style.opacity = '1';
        }, 300);
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
