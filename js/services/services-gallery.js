document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('gallery-container');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const pagination = document.getElementById('gallery-pagination');
    const galleryHeading = document.getElementById('gallery-heading');

    let currentIndex = 0;

    // Gallery Data for Services Page
    const galleryItems = [
        {
            title: 'INTERIOR',
            horizontal: {
                src: '../assets/Services/Gallery-5.webp',
                text: 'Innovative interiors that reflect your personality.'
            },
            vertical: {
                src: '../assets/Services/Gallery-6.webp'
            }
        },
        {
            title: 'ARCHITECTURE',
            horizontal: {
                src: '../assets/Services/Gallery-1.webp',
                text: 'Tailored solutions for every architectural need.'
            },
            vertical: {
                src: '../assets/Services/Gallery-2.webp'
            }
        },
        {
            title: 'CONSTRUCTION',
            horizontal: {
                src: '../assets/Services/Gallery-3.webp',
                text: 'Precision engineering and construction excellence.'
            },
            vertical: {
                src: '../assets/Services/Gallery-4.webp'
            }
        },
        {
            title: 'PMC',
            horizontal: {
                src: '../assets/Services/Gallery-7.webp',
                text: 'Effective project management from concept to completion.'
            },
            vertical: {
                src: '../assets/Services/Gallery-8.webp'
            }
        },
        {
            title: 'REAL ESTATE',
            horizontal: {
                src: '../assets/Services/Gallery-9.webp',
                text: 'Exceptional real estate opportunities for a brighter future.'
            },
            vertical: {
                src: '../assets/Services/Gallery-10.webp'
            }
        }
    ];

    function renderGallery(index) {
        if (!container) return;
        const item = galleryItems[index];

        // Update background heading text
        if (galleryHeading) {
            galleryHeading.textContent = item.title;
            // Trigger a quick re-animation effect for the heading
            galleryHeading.style.opacity = '0';
            setTimeout(() => {
                galleryHeading.style.opacity = '0.6';
            }, 50);
        }

        const html = `
            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start animate-fade-in">
                <!-- Left Column: Horizontal Image + Text -->
                <div class="md:col-span-7 flex flex-col gap-8 opacity-0 translate-y-4 animate-slide-up" style="animation-delay: 0.1s; animation-fill-mode: forwards;">
                    <div class="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-[10px] overflow-hidden shadow-xl group">
                        <img src="${item.horizontal.src}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    </div>
                    <p class="font-new-york text-2xl sm:text-3xl lg:text-3xl text-[#1A1A1A] leading-tight max-w-4xl">
                        ${item.horizontal.text}
                    </p>
                </div>
                
                <!-- Right Column: Vertical Image -->
                <div class="md:col-span-5 opacity-0 translate-y-4 animate-slide-up" style="animation-delay: 0.3s; animation-fill-mode: forwards;">
                    <div class="w-full md:w-[90%] md:ml-auto h-[450px] sm:h-[550px] lg:h-[550px] rounded-[10px] overflow-hidden shadow-xl group">
                        <img src="${item.vertical.src}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
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
