document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('studio-notes-grid');
    const categoryButtons = document.querySelectorAll('.studio-cat-btn');
    const prevBtn = document.getElementById('studio-prev');
    const nextBtn = document.getElementById('studio-next');
    const prevBtnMobile = document.getElementById('studio-prev-mobile');
    const nextBtnMobile = document.getElementById('studio-next-mobile');
    const paginationContainer = document.getElementById('studio-pagination');

    // Sample Blog Data
    const blogPosts = [
        {
            id: 1,
            category: 'Architectural',
            date: '20.01.2025',
            author: 'Daniel Mathew',
            title: 'Modern Architecture in Urban Landscapes',
            description: 'Exploring the intersection of sustainability and modern design in high-density areas.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 2,
            category: 'Construction',
            date: '21.01.2025',
            author: 'Sarah Jenkins',
            title: 'Understanding Construction Timelines',
            description: 'A deep dive into project management for large-scale infrastructure.',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 3,
            category: 'Interior',
            date: '22.01.2025',
            author: 'Alex Rivera',
            title: 'The Art of Minimalist Interiors',
            description: 'How to create calm and functional spaces with minimal elements.',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 4,
            category: 'PMC',
            date: '23.01.2025',
            author: 'Michael Chen',
            title: 'Strategic Project Management',
            description: 'Maximizing efficiency through advanced project control systems.',
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 5,
            category: 'Real Estate',
            date: '24.01.2025',
            author: 'Jessica White',
            title: 'Real Estate Trends for 2025',
            description: 'What every investor should know about the upcoming market shifts.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 6,
            category: 'Architectural',
            date: '25.01.2025',
            author: 'Daniel Mathew',
            title: 'Bridging History and Innovation',
            description: 'Case studies of adaptive reuse in historic architectural landmarks.',
            image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1000&auto=format&fit=crop'
        }
    ];

    function createCard(post) {
        return `
            <div class="group relative min-w-[85vw] sm:min-w-[45vw] lg:min-w-0 h-[450px] rounded-[15px] overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 hover:-translate-y-2 snap-center animate-fade-in" data-category="${post.category}">
                <!-- Static Image (No zoom) -->
                <img src="${post.image}" alt="${post.title}" class="absolute inset-0 w-full h-full object-cover">
                
                <!-- Bottom Gradient Overlay - Fades into the glass box -->
                <div class="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <!-- Content Box with Standardized Height and Dark Glass Blur -->
                <div class="absolute inset-x-0 bottom-0 h-[220px] p-8 bg-black/40 backdrop-blur-xl border-t border-white/10 flex flex-col justify-between">
                    <div>
                        <!-- Top Row: Date & Author -->
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-white/80 text-[11px] font-rethink font-medium tracking-[0.2em] uppercase">
                                ${post.date}
                            </span>
                            <span class="text-white/80 text-[11px] font-rethink font-medium tracking-[0.2em] uppercase">
                                ${post.author}
                            </span>
                        </div>
                        
                        <!-- Heading -->
                        <h3 class="font-new-york text-white text-2xl lg:text-3xl font-light leading-tight mb-4 line-clamp-2">
                            ${post.title}
                        </h3>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-white/70 text-[14px] font-rethink font-light leading-relaxed line-clamp-2">
                        ${post.description}
                    </p>
                </div>
            </div>
        `;
    }

    function createPaginationDots(count) {
        paginationContainer.innerHTML = '';
        if (count <= 1) return;

        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');
            dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-[#4D606C] w-8' : 'bg-gray-200'}`;
            dot.addEventListener('click', () => {
                const cardWidth = grid.children[0].offsetWidth + 32; // card + gap
                grid.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
            });
            paginationContainer.appendChild(dot);
        }
    }

    function updatePagination(activeIndex) {
        const dots = paginationContainer.querySelectorAll('button');
        dots.forEach((dot, i) => {
            if (i === activeIndex) {
                dot.classList.add('bg-[#4D606C]', 'w-8');
                dot.classList.remove('bg-gray-200');
            } else {
                dot.classList.remove('bg-[#4D606C]', 'w-8');
                dot.classList.add('bg-gray-200');
            }
        });
    }

    function renderCards(category) {
        grid.innerHTML = '';
        const filteredPosts = category === 'all' ? blogPosts : blogPosts.filter(post => post.category === category);

        if (filteredPosts.length === 0) {
            grid.innerHTML = '<div class="col-span-full py-20 text-center text-gray-400 font-rethink">No posts found in this category.</div>';
            paginationContainer.innerHTML = '';
            return;
        }

        filteredPosts.forEach((post) => {
            grid.insertAdjacentHTML('beforeend', createCard(post));
        });

        // Initialize Pagination for Mobile/Tablet
        createPaginationDots(filteredPosts.length);
        grid.scrollTo({ left: 0 }); // Reset scroll
    }

    // Scroll Logic
    function handleScroll() {
        const cardWidth = grid.children[0]?.offsetWidth + 32 || 0;
        if (cardWidth === 0) return;

        const activeIndex = Math.round(grid.scrollLeft / cardWidth);
        updatePagination(activeIndex);
    }

    grid.addEventListener('scroll', () => {
        window.requestAnimationFrame(handleScroll);
    });

    // Navigation Logic
    function scroll(direction) {
        const cardWidth = grid.children[0].offsetWidth + 32;
        const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    [prevBtn, prevBtnMobile].forEach(btn => btn?.addEventListener('click', () => scroll('prev')));
    [nextBtn, nextBtnMobile].forEach(btn => btn?.addEventListener('click', () => scroll('next')));

    // Category Logic
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-[#4D606C]', 'text-white', 'shadow-[0_15px_30px_-10px_rgba(77,96,108,0.6)]', 'active');
                btn.classList.add('bg-[#EAEAEA]', 'text-black');
            });

            button.classList.add('bg-[#4D606C]', 'text-white', 'shadow-[0_15px_30px_-10px_rgba(77,96,108,0.6)]', 'active');
            button.classList.remove('bg-[#EAEAEA]', 'text-black');

            renderCards(category);
        });
    });

    // Initial Render
    const activeBtn = document.querySelector('.studio-cat-btn.active');
    renderCards(activeBtn ? activeBtn.getAttribute('data-category') : 'all');
});
