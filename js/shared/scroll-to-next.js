// Scroll to Next Section Functionality
// Shared across all pages with scroll arrows (index, about, services, contact)

document.addEventListener('DOMContentLoaded', function () {
    const scrollArrow = document.getElementById('scroll-to-next');

    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            // Find the current section (the one containing the scroll arrow)
            const currentSection = scrollArrow.closest('section');

            if (currentSection) {
                // Get the next sibling section
                const nextSection = currentSection.nextElementSibling;

                if (nextSection) {
                    // Scroll to the next section smoothly
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
});
