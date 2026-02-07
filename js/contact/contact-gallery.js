document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('gallery-container');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const pagination = document.getElementById('gallery-pagination');
    const galleryHeading = document.getElementById('gallery-heading');

    let currentIndex = 0;

    // Gallery Data for Contact Page
    const galleryItems = [
        {
            horizontal: {
                src: '../assets/Contact/Gallery-1.webp',
                text: 'We are here to listen and help you build your future.'
            },
            vertical: {
                src: '../assets/Contact/Gallery-2.webp'
            }
        },
        {
            horizontal: {
                src: '../assets/Contact/Gallery-3.webp',
                text: 'Your vision is our mission. Let us connect today.'
            },
            vertical: {
                src: '../assets/Contact/Gallery-4.webp'
            }
        },
        {
            horizontal: {
                src: '../assets/Contact/Gallery-5.webp',
                text: 'Committed to delivering excellence in every interaction.'
            },
            vertical: {
                src: '../assets/Contact/Gallery-6.png'
            }
        }
    ];

    function renderGallery(index) {
        if (!container) return;
        const item = galleryItems[index];

        const html = `
            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start animate-fade-in">
                <!-- Left Column: Horizontal Image + Text -->
                <div class="md:col-span-7 flex flex-col gap-8 opacity-0 translate-y-4 animate-slide-up" style="animation-delay: 0.1s; animation-fill-mode: forwards;">
                    <div class="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-[10px] overflow-hidden shadow-xl group">
                        <img src="${item.horizontal.src}" alt="Gallery Image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    </div>
                    <p class="font-new-york text-2xl sm:text-3xl lg:text-3xl text-[#1A1A1A] leading-tight max-w-4xl">
                        ${item.horizontal.text}
                    </p>
                </div>
                
                <!-- Right Column: Vertical Image -->
                <div class="md:col-span-5 opacity-0 translate-y-4 animate-slide-up" style="animation-delay: 0.3s; animation-fill-mode: forwards;">
                    <div class="w-full md:w-[90%] md:ml-auto h-[450px] sm:h-[550px] lg:h-[550px] rounded-[10px] overflow-hidden shadow-xl group">
                        <img src="${item.vertical.src}" alt="Gallery Image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        if (pagination) pagination.textContent = `${index + 1} / ${galleryItems.length}`;
    }

    function handleNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        renderGallery(currentIndex);
    }

    function handlePrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        renderGallery(currentIndex);
    }

    if (prevBtn) prevBtn.addEventListener('click', handlePrev);
    if (nextBtn) nextBtn.addEventListener('click', handleNext);

    // Initial Render
    renderGallery(currentIndex);
});

// Add custom keyframes for animation
if (!document.getElementById('gallery-animations')) {
    const style = document.createElement('style');
    style.id = 'gallery-animations';
    style.textContent = `
        @keyframes slide-up {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-slide-up {
            animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
    `;
    document.head.appendChild(style);
}
