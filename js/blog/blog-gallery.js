document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('gallery-container');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const pagination = document.getElementById('gallery-pagination');

    let currentIndex = 0;

    // Gallery Data (5 Pairs = 10 Images)
    // Structure: { horizontal: { src, text }, vertical: { src } }
    const galleryItems = [
        {
            horizontal: {
                src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
                text: 'Now is the time to turn your space into a masterpiece.'
            },
            vertical: {
                src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop'
            }
        },
        {
            horizontal: {
                src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1000&auto=format&fit=crop',
                text: 'Elegance is not standing out, but being remembered.'
            },
            vertical: {
                src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop'
            }
        },
        {
            horizontal: {
                src: 'https://images.unsplash.com/photo-1600573472591-ee6c8e695394?q=80&w=1000&auto=format&fit=crop',
                text: 'Design is not just what it looks like and feels like. Design is how it works.'
            },
            vertical: {
                src: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop'
            }
        },
        {
            horizontal: {
                src: 'https://images.unsplash.com/photo-1600210491892-03d54cc0fabd?q=80&w=1000&auto=format&fit=crop',
                text: 'Simplicity is the ultimate sophistication in modern living.'
            },
            vertical: {
                src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1000&auto=format&fit=crop'
            }
        },
        {
            horizontal: {
                src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop',
                text: 'Luxury must be comfortable, otherwise it is not luxury.'
            },
            vertical: {
                src: 'https://images.unsplash.com/photo-1600585154526-998dce793675?q=80&w=1000&auto=format&fit=crop'
            }
        }
    ];

    function renderGallery(index) {
        const item = galleryItems[index];

        const html = `
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start animate-fade-in">
                <!-- Left Column: Horizontal Image + Text -->
                <div class="lg:col-span-7 flex flex-col gap-8 opacity-0 translate-y-4 animate-slide-up" style="animation-delay: 0.1s; animation-fill-mode: forwards;">
                    <div class="w-full h-[280px] sm:h-[350px] lg:h-[380px] rounded-[10px] overflow-hidden shadow-xl group">
                        <img src="${item.horizontal.src}" alt="Gallery Image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    </div>
                    <p class="font-new-york text-2xl sm:text-3xl lg:text-3xl text-[#1A1A1A] leading-tight max-w-4xl">
                        ${item.horizontal.text}
                    </p>
                </div>
                
                <!-- Right Column: Vertical Image -->
                <div class="lg:col-span-5 opacity-0 translate-y-4 animate-slide-up" style="animation-delay: 0.3s; animation-fill-mode: forwards;">
                    <div class="w-full h-[150px] sm:h-[300px] lg:h-[500px] rounded-[10px] overflow-hidden shadow-xl group">
                        <img src="${item.vertical.src}" alt="Gallery Image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        pagination.textContent = `${index + 1} / ${galleryItems.length}`;
    }

    function handleNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        renderGallery(currentIndex);
    }

    function handlePrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        renderGallery(currentIndex);
    }

    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);

    // Initial Render
    renderGallery(currentIndex);
});

// Add custom keyframes for animation if not present
const style = document.createElement('style');
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
