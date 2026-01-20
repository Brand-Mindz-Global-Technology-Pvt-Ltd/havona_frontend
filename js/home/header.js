// Header & Mobile Menu Logic
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle Logic
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const content = document.getElementById('mobile-menu-content');

    if (toggleBtn && menu && content && overlay) {
        const openMenu = () => {
            menu.classList.remove('hidden');
            // Small delay to allow 'hidden' removal before starting animations
            setTimeout(() => {
                overlay.classList.add('opacity-100');
                content.classList.remove('translate-x-full');
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent scroll
        };

        const closeMenu = () => {
            overlay.classList.remove('opacity-100');
            content.classList.add('translate-x-full');
            // Wait for animation to finish before hiding container
            setTimeout(() => {
                menu.classList.add('hidden');
            }, 300);
            document.body.style.overflow = ''; // Restore scroll
        };

        toggleBtn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
    }

    // Sticky Header Effect (Optional but good practice)
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-black/80', 'backdrop-blur-xl', 'py-4');
                header.classList.remove('py-6');
            } else {
                header.classList.remove('bg-black/80', 'backdrop-blur-xl', 'py-4');
                header.classList.add('py-6');
            }
        });
    }
});
