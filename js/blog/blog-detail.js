document.addEventListener('DOMContentLoaded', () => {
    // Get slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (slug) {
        fetchBlogDetail(slug);
    } else {
        // Handle missing slug (redirect or show error)
        console.error('No slug provided');
        document.querySelector('main').innerHTML = '<div class="text-center py-20">Blog not found.</div>';
    }
});

function fetchBlogDetail(slug) {
    // API endpoint to fetch specific blog
    const apiUrl = `https://havona.brandmindz.com/api/blogs/fetch.php?slug=${slug}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                renderBlogDetail(data.data[0]);
                fetchRelatedBlogs(data.data[0].category, data.data[0].id);
            } else {
                document.querySelector('main').innerHTML = '<div class="text-center py-20 font-rethink">Blog not found.</div>';
            }
        })
        .catch(error => {
            console.error('Error fetching blog detail:', error);
            document.querySelector('main').innerHTML = '<div class="text-center py-20 font-rethink">An error occurred while loading the blog.</div>';
        });
}

function renderBlogDetail(blog) {
    // Update Hero Title
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.innerHTML = blog.title;

    // Update Hero Description
    const heroDesc = document.getElementById('hero-desc');
    if (heroDesc) heroDesc.textContent = blog.short_description || '';

    // Update Hero Image
    const heroImage = document.getElementById('hero-image');
    if (heroImage && blog.image) {
        heroImage.src = `https://havona.brandmindz.com/uploads/blogs/${blog.image}`;
    }

    // Update Content Title
    const titleEl = document.querySelector('h2.font-new-york');
    if (titleEl) titleEl.textContent = blog.title;

    // Update Meta/Date
    const dateEl = document.querySelector('p.font-rethink.text-gray-400');
    if (dateEl) {
        const date = new Date(blog.created_at);
        dateEl.textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) + ' ' + date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Update Content
    const contentContainer = document.querySelector('.prose');
    if (contentContainer) {
        // If content is HTML, set innerHTML. If it's plain text with newlines, replace them.
        // Usually from a textarea, newlines are common.
        const formattedContent = blog.content.includes('<p>') ? blog.content : blog.content.replace(/\n/g, '<br><br>');
        contentContainer.innerHTML = formattedContent;
    }

    // Update Page Title
    document.title = `${blog.title} - Havona`;
}

function fetchRelatedBlogs(category, currentId) {
    // Fetch all blogs and filter by category, excluding current one
    const apiUrl = `https://havona.brandmindz.com/api/blogs/fetch.php?category=${category}&status=Published`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const related = data.data.filter(b => b.id != currentId).slice(0, 3);
                renderRelatedBlogs(related);
            }
        })
        .catch(error => console.error('Error fetching related blogs:', error));
}

function renderRelatedBlogs(blogs) {
    const container = document.querySelector('.lg\\:col-span-4 .space-y-8');
    if (!container) return;

    if (blogs.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-sm font-rethink italic">No related stories found in this category.</p>';
        return;
    }

    container.innerHTML = ''; // Clear existing static cards

    blogs.forEach(blog => {
        const imgUrl = blog.image ? `https://havona.brandmindz.com/uploads/blogs/${blog.image}` : 'https://via.placeholder.com/400x400';

        const card = document.createElement('div');
        card.className = 'flex gap-4 group cursor-pointer';
        card.onclick = () => window.location.href = `blogdetail.html?slug=${blog.slug}`;

        card.innerHTML = `
            <div class="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden shadow-md">
                <img src="${imgUrl}"
                    alt="${blog.title}"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            </div>
            <div class="flex flex-col justify-center">
                <span class="inline-block self-start px-3 py-1 bg-[#4D606C] text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                    ${blog.category || 'General'}
                </span>
                <h4 class="font-rethink text-sm sm:text-base font-bold text-[#1A1A1A] line-clamp-2 leading-snug group-hover:text-[#4D606C] transition-colors">
                    ${blog.title}
                </h4>
                <p class="font-rethink text-gray-400 text-[10px] mt-2 italic">
                    ${new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>
        `;
        container.appendChild(card);
    });
}
