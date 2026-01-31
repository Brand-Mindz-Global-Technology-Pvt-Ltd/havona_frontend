document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('brand-values-track');
    if (!track) return;

    // Clone the items for infinite scroll
    const items = Array.from(track.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let scrollPos = 0;
    let speed = 0.5; // Controls the speed of the scroll
    let animationId;

    function animate() {
        scrollPos += speed;

        // If we've scrolled past the first set of items, reset to the start
        // The first set is half of the track's total scroll width
        const halfWidth = track.scrollWidth / 2;
        if (scrollPos >= halfWidth) {
            scrollPos = 0;
        }

        track.style.transform = `translateX(-${scrollPos}px)`;
        animationId = requestAnimationFrame(animate);
    }

    // Handle visibility change to prevent animation glitches when tab is inactive
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animationId = requestAnimationFrame(animate);
        }
    });

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Initial check for layout
    window.addEventListener('resize', () => {
        // Reset scroll position on resize to avoid jumps if track width changes
        scrollPos = 0;
        track.style.transform = `translateX(0)`;
    });
});
