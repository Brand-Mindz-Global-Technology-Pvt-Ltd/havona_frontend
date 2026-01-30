/**
 * Consultation Modal System
 */
(function () {
    const API_URL = 'https://havona.brandmindz.com/api/enquiries/add.php';

    // Determine the base path for components based on this script's own location
    const getComponentPath = () => {
        const script = document.currentScript;
        if (script && script.src) {
            const src = script.src;
            // The script is at .../js/shared/consultation-modal.js
            // We want .../components/consultation-modal.html
            const basePath = src.substring(0, src.indexOf('/js/shared/'));
            return basePath + '/components/consultation-modal.html';
        }
        // Fallback to relative or absolute if currentScript is not available
        return '/components/consultation-modal.html';
    };

    // Inject modal on page load
    async function initModal() {
        try {
            if (document.getElementById('consultation-modal')) return;

            const modalPath = getComponentPath();
            console.log('Consultation Modal: Loading from', modalPath);

            const response = await fetch(modalPath);
            if (!response.ok) {
                console.warn('Consultation Modal: Primary path failed, trying relative fallback...');
                const retryResponse = await fetch('../components/consultation-modal.html');
                if (!retryResponse.ok) {
                    const retryResponse2 = await fetch('./components/consultation-modal.html');
                    if (!retryResponse2.ok) throw new Error('Failed to load modal component from all paths');
                    const html = await retryResponse2.text();
                    document.body.insertAdjacentHTML('beforeend', html);
                } else {
                    const html = await retryResponse.text();
                    document.body.insertAdjacentHTML('beforeend', html);
                }
            } else {
                const html = await response.text();
                document.body.insertAdjacentHTML('beforeend', html);
            }

            console.log('Consultation Modal: Injected successfully');
            setupModalLogic();
        } catch (error) {
            console.error('Consultation Modal Error:', error);
        }
    }

    function setupModalLogic() {
        const modal = document.getElementById('consultation-modal');
        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');
        const closeBtn = document.getElementById('modal-close');
        const form = document.getElementById('consultation-form');

        if (!modal || !content) {
            console.error('Consultation Modal: Elements not found after injection');
            return;
        }

        // Open Modal Function
        window.openConsultationModal = () => {
            console.log('Consultation Modal: Opening...');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            // Force reflow
            void modal.offsetWidth;
            overlay.classList.remove('opacity-0');
            content.classList.remove('scale-95', 'opacity-0');
            document.body.style.overflow = 'hidden';
        };

        // Close Modal Function
        window.closeConsultationModal = () => {
            overlay.classList.add('opacity-0');
            content.classList.add('scale-95', 'opacity-0');

            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = '';
                if (form) form.reset();
            }, 300);
        };

        // Event Listeners
        if (closeBtn) closeBtn.addEventListener('click', window.closeConsultationModal);
        if (overlay) overlay.addEventListener('click', window.closeConsultationModal);

        // Bind all trigger buttons
        function bindTriggers() {
            const buttons = document.querySelectorAll('button, a');
            let count = 0;
            buttons.forEach(btn => {
                const text = btn.textContent.toLowerCase();
                if (text.includes('get a consultation') || btn.classList.contains('btn-consultation')) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.openConsultationModal();
                    });
                    count++;
                }
            });
            console.log(`Consultation Modal: Bound to ${count} trigger buttons`);
        }

        bindTriggers();

        // Handle Form Submission
        if (form) {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                const submitBtn = document.getElementById('modal-submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'SENDING...';
                submitBtn.disabled = true;

                try {
                    const selectedSubject = form.querySelector('input[name="modal-subject"]:checked');

                    const payload = {
                        name: document.getElementById('modal-firstName').value,
                        last_name: document.getElementById('modal-lastName').value,
                        email: document.getElementById('modal-email').value,
                        phone: document.getElementById('modal-phone').value,
                        service: selectedSubject ? selectedSubject.value : 'Interior',
                        message: document.getElementById('modal-message').value
                    };

                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    const data = await response.json();

                    if (data.success) {
                        alert('Thank you! Your message has been sent successfully.');
                        window.closeConsultationModal();
                    } else {
                        throw new Error(data.message || 'Something went wrong');
                    }
                } catch (error) {
                    console.error('Submission Error:', error);
                    alert('Error: ' + error.message);
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }
})();
