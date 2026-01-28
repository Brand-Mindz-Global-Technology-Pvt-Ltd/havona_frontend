document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.mission-tab');
    const slides = document.querySelectorAll('.mission-slide');
    const dots = document.querySelectorAll('.mission-dot');
    const track = document.getElementById('mission-track');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider(index) {
        // Calculate the actual slide index (mapping multiple sets of tabs/dots)
        const slideIndex = index % totalSlides;

        // Update Track Position
        if (track) {
            track.style.transform = `translateX(-${slideIndex * 100}%)`;
        }

        // Update Tabs - Highlight all tabs that correspond to this slide index
        tabs.forEach((tab, i) => {
            if (i % totalSlides === slideIndex) {
                tab.classList.add('bg-[#4F5B66]', 'text-white', 'shadow-lg');
                tab.classList.remove('bg-gray-200', 'text-gray-600', 'hover:bg-gray-300');
            } else {
                tab.classList.remove('bg-[#4F5B66]', 'text-white', 'shadow-lg');
                tab.classList.add('bg-gray-200', 'text-gray-600', 'hover:bg-gray-300');
            }
        });

        // Update Dots
        dots.forEach((dot, i) => {
            if (i === slideIndex) {
                dot.classList.add('bg-black', 'scale-125');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('bg-black', 'scale-125');
                dot.classList.add('bg-gray-300');
            }
        });

        currentIndex = slideIndex;
    }

    // Event Listeners for Tabs
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            updateSlider(index);
        });
    });

    // Event Listeners for Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlider(index);
        });
    });

    // Optional: Auto-slide
    // setInterval(() => {
    //     let nextIndex = (currentIndex + 1) % totalSlides;
    //     updateSlider(nextIndex);
    // }, 5000);
});
