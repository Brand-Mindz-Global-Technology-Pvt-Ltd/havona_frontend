// About Us Video Modal Logic (Sync with Home Page Style)
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
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        video.pause();
        // Reset video to start
        video.currentTime = 0;
        document.body.style.overflow = ''; // Restore scrolling
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard support (Escape key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
