document.addEventListener('DOMContentLoaded', () => {
    fetchInsights();
    setupScrollControls();
});

function fetchInsights() {
    // using absolute URL as seen in other scripts to ensure it works
    const apiUrl = 'https://havona.brandmindz.com/api/blogs/fetch.php?status=Published';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                renderInsights(data.data);
            } else {
                // Optional: Handle empty state or leave static content (though we are replacing it)
                console.log('No blogs found');
            }
        })
        .catch(error => console.error('Error fetching insights:', error));
}

function renderInsights(blogs) {
    const container = document.getElementById('insights-scroll');
    if (!container) return;

    container.innerHTML = '';

    // Logic to build layout: Large -> Stacked Pair -> Large -> Stacked Pair ...
    let i = 0;
    while (i < blogs.length) {

        // 1. Large Card (Takes 1 item)
        if (i < blogs.length) {
            const blog = blogs[i];
            const largeCardHTML = createLargeCard(blog);
            container.insertAdjacentHTML('beforeend', largeCardHTML);
            i++;
        }

        // 2. Stacked Column (Takes up to 2 items)
        if (i < blogs.length) {
            const blog1 = blogs[i];
            const blog2 = (i + 1 < blogs.length) ? blogs[i + 1] : null; // Check if second exists

            const stackedColumnHTML = createStackedColumn(blog1, blog2);
            container.insertAdjacentHTML('beforeend', stackedColumnHTML);

            i += 2; // Move past these two
        }
    }
}

function createLargeCard(blog) {
    const imgUrl = blog.image ? `https://havona.brandmindz.com/uploads/blogs/${blog.image}` : 'https://via.placeholder.com/420x520';
    // Using layout from the user's static HTML
    return `
    <div class="shrink-0 w-[300px] sm:w-[350px] md:w-[420px] h-[520px] rounded-[24px] overflow-hidden shadow-[0_15px_50px_-12px_rgba(0,0,0,0.15)] relative group cursor-pointer snap-start border border-gray-100" onclick="window.location.href='blog/blogdetail.html?slug=${blog.slug}'">
        <img src="${imgUrl}"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt="${blog.title}">
        <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

        <!-- Category Tag -->
        <div class="absolute top-6 right-6">
            <span class="px-4 py-2 bg-[#4D606C] text-white text-[11px] font-rethink font-medium uppercase tracking-wider rounded-full shadow-md border border-white/10">
                ${blog.category || 'General'}
            </span>
        </div>

        <!-- Content Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-8 bg-black/20 backdrop-blur-sm rounded-b-[24px]">
            <h3 class="font-rethink text-xl font-semibold mb-3 leading-tight text-white group-hover:text-blue-50 transition-colors line-clamp-2">
                ${blog.title}
            </h3>
            <p class="text-white/80 text-sm font-rethink line-clamp-2 leading-relaxed">
                ${blog.short_description || ''}
            </p>
        </div>
    </div>`;
}

function createStackedColumn(blog1, blog2) {
    let html = '<div class="shrink-0 flex flex-col gap-6 md:gap-8 snap-start">';

    // Top Card
    if (blog1) {
        const img1 = blog1.image ? `https://havona.brandmindz.com/uploads/blogs/${blog1.image}` : 'https://via.placeholder.com/420x246';
        html += `
        <div class="w-[300px] sm:w-[350px] md:w-[420px] h-[246px] rounded-[24px] overflow-hidden shadow-[0_15px_50px_-12px_rgba(0,0,0,0.15)] relative group cursor-pointer border border-gray-100" onclick="window.location.href='blog/blogdetail.html?slug=${blog1.slug}'">
            <img src="${img1}"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="${blog1.title}">
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

            <div class="absolute top-4 right-4">
                <span class="px-4 py-1.5 bg-[#4D606C] text-white text-[10px] font-rethink font-medium uppercase tracking-wider rounded-full shadow-md">
                    ${blog1.category || 'General'}
                </span>
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-sm rounded-b-[24px]">
                <h3 class="font-rethink text-sm sm:text-lg lg:text-xl font-semibold leading-tight text-white line-clamp-2">
                    ${blog1.title}
                </h3>
            </div>
        </div>`;
    }

    // Bottom Card
    if (blog2) {
        const img2 = blog2.image ? `https://havona.brandmindz.com/uploads/blogs/${blog2.image}` : 'https://via.placeholder.com/420x246';
        html += `
        <div class="w-[300px] sm:w-[350px] md:w-[420px] h-[246px] rounded-[24px] overflow-hidden shadow-[0_15px_50px_-12px_rgba(0,0,0,0.15)] relative group cursor-pointer border border-gray-100" onclick="window.location.href='blog/blogdetail.html?slug=${blog2.slug}'">
            <img src="${img2}"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="${blog2.title}">
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

            <div class="absolute top-4 right-4">
                <span class="px-4 py-1.5 bg-[#4D606C] text-white text-[10px] font-rethink font-medium uppercase tracking-wider rounded-full shadow-md">
                    ${blog2.category || 'General'}
                </span>
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-sm rounded-b-[24px]">
                <h3 class="font-rethink text-sm sm:text-lg lg:text-xl font-semibold leading-tight text-white line-clamp-2">
                    ${blog2.title}
                </h3>
            </div>
        </div>`;
    }

    html += '</div>';
    return html;
}

function setupScrollControls() {
    const scrollContainer = document.getElementById('insights-scroll');
    const leftBtn = document.getElementById('insights-scroll-left');
    const rightBtn = document.getElementById('insights-scroll-right');

    if (!scrollContainer || !leftBtn || !rightBtn) return;

    leftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -450, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 450, behavior: 'smooth' });
    });
}
