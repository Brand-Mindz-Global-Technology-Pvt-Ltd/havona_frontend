let allBlogs = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchFrontendBlogs();
});

function fetchFrontendBlogs() {
    const apiUrl = 'https://havona.brandmindz.com/api/blogs/fetch.php?status=Published';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                allBlogs = data.data;
                renderLatestInsights(allBlogs); // New function for the specific requested section
                renderFrontendBlogs(allBlogs); // Existing Studio Notes section
                populateCategories(allBlogs);
            }
        })
        .catch(error => console.error('Error fetching blogs:', error));
}

// Function to render "Latest Insights" with the specific Large - Stacked - Large layout
function renderLatestInsights(blogs) {
    const container = document.getElementById('blog-insights-scroll');
    if (!container) return;
    container.innerHTML = '';

    // Take recent 5 posts or however many available for the layout
    // Layout requires specific groups
    if (blogs.length === 0) return;

    // Helper to generate Large Card
    const createLargeCard = (blog) => {
        const imgUrl = blog.image ? `https://havona.brandmindz.com/uploads/blogs/${blog.image}` : 'https://via.placeholder.com/450x550';
        return `
         <div class="shrink-0 w-[300px] sm:w-[350px] md:w-[450px] h-[550px] rounded-[30px] overflow-hidden relative group cursor-pointer snap-start shadow-xl" onclick="window.location.href='blogdetail.html?slug=${blog.slug}'">
            <img src="${imgUrl}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${blog.title}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div class="absolute top-6 right-6">
                <span class="px-5 py-2 bg-[#4D606C] text-white text-[11px] font-rethink font-medium uppercase tracking-widest rounded-full shadow-md">${blog.category || 'General'}</span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-8 bg-black/20 backdrop-blur-sm rounded-b-[30px]">
                <h3 class="font-rethink text-xl md:text-2xl font-semibold mb-4 text-white leading-tight line-clamp-2">${blog.title}</h3>
                <p class="text-white/70 text-sm font-rethink line-clamp-2 leading-relaxed">${blog.short_description || ''}</p>
            </div>
        </div>`;
    };

    // Helper to generate Stacked Column
    const createStackedColumn = (blog1, blog2) => {
        let html = '<div class="shrink-0 flex flex-col gap-6 lg:gap-8 snap-start">';

        if (blog1) {
            const img1 = blog1.image ? `https://havona.brandmindz.com/uploads/blogs/${blog1.image}` : 'https://via.placeholder.com/450x262';
            html += `
            <div class="w-[300px] sm:w-[350px] md:w-[450px] h-[262px] rounded-[30px] overflow-hidden relative group cursor-pointer shadow-lg" onclick="window.location.href='blogdetail.html?slug=${blog1.slug}'">
                <img src="${img1}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${blog1.title}">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"></div>
                <div class="absolute top-6 right-6">
                    <span class="px-4 py-1.5 bg-[#4D606C] text-white text-[10px] font-rethink font-medium uppercase tracking-widest rounded-full shadow-md">${blog1.category || 'General'}</span>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-sm rounded-b-[30px]">
                    <h3 class="font-rethink text-lg font-semibold text-white line-clamp-2">${blog1.title}</h3>
                </div>
            </div>`;
        }

        if (blog2) {
            const img2 = blog2.image ? `https://havona.brandmindz.com/uploads/blogs/${blog2.image}` : 'https://via.placeholder.com/450x262';
            html += `
            <div class="w-[300px] sm:w-[350px] md:w-[450px] h-[262px] rounded-[30px] overflow-hidden relative group cursor-pointer shadow-lg" onclick="window.location.href='blogdetail.html?slug=${blog2.slug}'">
                <img src="${img2}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${blog2.title}">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"></div>
                <div class="absolute top-6 right-6">
                    <span class="px-4 py-1.5 bg-[#4D606C] text-white text-[10px] font-rethink font-medium uppercase tracking-widest rounded-full shadow-md">${blog2.category || 'General'}</span>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-sm rounded-b-[30px]">
                    <h3 class="font-rethink text-lg font-semibold text-white line-clamp-2">${blog2.title}</h3>
                </div>
            </div>`;
        }

        html += '</div>';
        return html;
    };

    // Logic to build layout: Large -> Stacked -> Large -> Stacked ...
    let i = 0;
    while (i < blogs.length) {
        // pattern: large, then 2 stacked, then large...
        // We can just alternate types or try to fit user request "L222-L333" which had Large, Stacked(2), Large

        // 1. Large Card
        container.insertAdjacentHTML('beforeend', createLargeCard(blogs[i]));
        i++;
        if (i >= blogs.length) break;

        // 2. Stacked Column (needs up to 2 blogs)
        const b1 = blogs[i];
        const b2 = blogs[i + 1];
        container.insertAdjacentHTML('beforeend', createStackedColumn(b1, b2));
        i += 2;
    }
}

function renderFrontendBlogs(blogs) {
    const blogContainer = document.getElementById('studio-notes-grid');
    if (!blogContainer) return;

    blogContainer.innerHTML = '';

    if (blogs.length === 0) {
        blogContainer.innerHTML = '<p class="text-center w-full col-span-3 text-gray-500">No stories found.</p>';
        return;
    }

    blogs.forEach(blog => {
        const imgUrl = blog.image ? `https://havona.brandmindz.com/uploads/blogs/${blog.image}` : 'https://via.placeholder.com/400x550';

        // Using the "Card 3 (Large)" style as general style for Studio Notes
        const blogCard = document.createElement('div');
        blogCard.className = 'shrink-0 w-[300px] sm:w-[350px] md:w-[450px] h-[550px] rounded-[30px] overflow-hidden relative group cursor-pointer snap-start shadow-xl';
        blogCard.onclick = () => window.location.href = `blogdetail.html?slug=${blog.slug}`;

        blogCard.innerHTML = `
            <img src="${imgUrl}"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="${blog.title}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
            </div>

            <div class="absolute top-6 right-6">
                <span class="px-5 py-2 bg-[#4D606C] text-white text-[11px] font-rethink font-medium uppercase tracking-widest rounded-full shadow-md">
                    ${blog.category || 'General'}
                </span>
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-8 bg-black/20 backdrop-blur-sm rounded-b-[30px]">
                <h3 class="font-rethink text-xl md:text-2xl font-semibold mb-4 text-white leading-tight line-clamp-2">
                    ${blog.title}
                </h3>
                <p class="text-white/70 text-sm font-rethink line-clamp-2 leading-relaxed">
                    ${blog.short_description || ''}
                </p>
                <div class="mt-4 flex items-center text-white/80 text-xs font-rethink uppercase tracking-wider gap-2">
                    <span>Read More</span>
                    <i class="ph ph-arrow-right"></i>
                </div>
            </div>
        `;
        blogContainer.appendChild(blogCard);
    });
}

function populateCategories(blogs) {
    const categoryContainer = document.getElementById('studio-categories');
    if (!categoryContainer) return;

    // Extract unique categories
    const categories = ['All', ...new Set(blogs.map(blog => blog.category).filter(Boolean))];

    categoryContainer.innerHTML = '';

    categories.forEach((category, index) => {
        const btn = document.createElement('button');

        const baseClass = "studio-cat-btn px-7 py-3 rounded-full font-rethink text-[13px] font-medium tracking-wide transition-all duration-300";
        const activeClass = "bg-[#4D606C] text-white shadow-[0_15px_30px_-10px_rgba(77,96,108,0.6)] active";
        const inactiveClass = "bg-[#EAEAEA] text-black hover:bg-gray-200";

        btn.className = `${baseClass} ${index === 0 ? activeClass : inactiveClass}`;
        btn.textContent = category;
        btn.setAttribute('data-category', category);

        btn.addEventListener('click', () => {
            Array.from(categoryContainer.children).forEach(b => {
                b.className = `${baseClass} ${inactiveClass}`;
            });
            btn.className = `${baseClass} ${activeClass}`;

            if (category === 'All') {
                renderFrontendBlogs(allBlogs);
            } else {
                const filtered = allBlogs.filter(b => b.category === category);
                renderFrontendBlogs(filtered);
            }
        });

        categoryContainer.appendChild(btn);
    });
}
