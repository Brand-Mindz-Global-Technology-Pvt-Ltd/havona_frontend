// Services Data
const servicesData = {
    'Architecture': {
        title: 'Architecture',
        quote: '" Smart, purposeful architecture designed for your vision and environment  "',
        desc: 'Our Architectural Services focus on creating buildings that are both visually strong and functionally efficient. From conceptual planning to detailed design, we shape architecture that reflects your needs, context, and long-term goals. Every element is carefully considered to ensure balance, durability, and usability, making your project truly one-of-a-kind.',
        image: '../assets/Services/Architecture.webp'
    },
    'Construction': {
        title: 'Construction',
        quote: '" Strong, reliable construction built for lasting performance "',
        desc: 'Our Construction Services focus on delivering structures that are both durable and well-executed. From planning and material selection to on-site execution and final handover, we build with attention to quality, safety, and efficiency. Every stage is carefully managed to ensure strength, consistency, and long-term value, making your project truly one-of-a-kind.',
        image: '../assets/Services/Construction.webp'
    },
    'Interior': {
        title: 'Interior',
        quote: '"  Smart, elegant interiors tailored for your lifestyle or workspace "',
        desc: 'Our Interior Solutions focus on creating spaces that are both beautiful and functional. From conceptual design to execution, we craft interiors that reflect your personality, brand, and lifestyle. Every element is thoughtfully planned to ensure comfort, style, and efficiency, making your space truly one-of-a-kind.',
        images: [
            '../assets/Services/Interior.webp',
            '../assets/Services/Interior-1.webp',
            '../assets/Services/Interior-2.webp'
        ]
    },
    'PMC': {
        title: 'Project Management',
        quote: '" Structured, transparent project management for smooth execution "',
        desc: 'Our Project Management Services focus on organizing and controlling every stage of the project with clarity and coordination. From planning and scheduling to site supervision and quality monitoring, we ensure each phase runs efficiently and on track. Every process is carefully managed to maintain timelines, budgets, and standards, making your project truly one-of-a-kind.',
        image: '../assets/Services/Project-Management.webp'
    },
    'Real Estate': {
        title: 'Real Estate',
        quote: '" Trusted real estate guidance for confident property decisions "',
        desc: 'Our Real Estate Services focus on helping clients find and develop properties that offer both value and potential. From property evaluation to transaction support and development planning, we guide every step with market insight and professional care. Each decision is thoughtfully supported to ensure clarity, security, and long-term benefit, making your investment truly one-of-a-kind.',
        image: '../assets/Services/Real-Estate.webp'
    }
};

let currentService = 'Interior';
let interiorSlideIndex = 0;
let slideInterval;

function switchService(serviceName, btn) {
    if (serviceName === currentService) return;

    currentService = serviceName;
    const data = servicesData[serviceName];

    // Update Tab Styles (Synchronize Desktop & Mobile)
    const allTabs = document.querySelectorAll('.service-tab, .service-tab-mob');

    allTabs.forEach(t => {
        const isTarget = t.getAttribute('onclick').includes(`'${serviceName}'`);

        if (t.classList.contains('service-tab')) {
            // Desktop Styles
            if (isTarget) {
                t.classList.remove('text-gray-400');
                t.classList.add('text-black', 'font-semibold');
                // Move Indicator
                let indicator = document.querySelector('.tab-indicator');
                if (indicator) t.appendChild(indicator);
            } else {
                t.classList.add('text-gray-400');
                t.classList.remove('text-black', 'font-semibold');
            }
        } else {
            // Mobile Styles (Pills)
            if (isTarget) {
                t.classList.remove('text-gray-500', 'bg-gray-100');
                t.classList.add('text-white', 'bg-black', 'shadow-lg');
            } else {
                t.classList.add('text-gray-500', 'bg-gray-100');
                t.classList.remove('text-white', 'bg-black', 'shadow-lg');
            }
        }
    });

    // Fade out content
    const contentBox = document.getElementById('service-content-box');
    contentBox.style.opacity = '0';
    contentBox.style.transform = 'translateY(10px)';

    setTimeout(() => {
        // Update Content
        document.getElementById('service-rotated-title').textContent = serviceName;
        document.getElementById('service-main-title').textContent = data.title;
        document.getElementById('service-quote').textContent = data.quote;

        // Handle Description (repeat text for Interior as per image)
        const descContainer = document.getElementById('service-description');
        const pClass = "font-rethink text-white text-[15px] md:text-[16px] lg:text-[17px] leading-relaxed font-light";

        if (serviceName === 'Interior') {
            descContainer.innerHTML = `<p class="${pClass}">${data.desc}</p><p class="${pClass}">${data.desc}</p>`;
        } else {
            descContainer.innerHTML = `<p class="${pClass}">${data.desc}</p>`;
        }

        // Handle Background (Slider for Interior, Static for others)
        const bgContainer = document.getElementById('service-bg-container');
        const pagination = document.getElementById('service-pagination');

        clearInterval(slideInterval);

        if (serviceName === 'Interior') {
            pagination.style.display = 'flex';
            bgContainer.innerHTML = `
                <div id="interior-slider" class="w-full h-full relative">
                    ${data.images.map((img, i) => `
                        <img src="${img}" class="service-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === 0 ? 'opacity-100' : 'opacity-0'}" alt="Interior ${i + 1}">
                    `).join('')}
                </div>
            `;
            interiorSlideIndex = 0;
            updateDots();
            startAutoScroll();
        } else {
            pagination.style.display = 'none';
            bgContainer.innerHTML = `
                <img src="${data.image}" class="w-full h-full object-cover opacity-100" alt="${serviceName}">
            `;
        }

        // Fade in content
        contentBox.style.opacity = '1';
        contentBox.style.transform = 'translateY(0)';
    }, 400);
}

function startAutoScroll() {
    slideInterval = setInterval(() => {
        interiorSlideIndex = (interiorSlideIndex + 1) % 3;
        showSlide(interiorSlideIndex);
    }, 5000);
}

function setSlide(index) {
    clearInterval(slideInterval);
    interiorSlideIndex = index;
    showSlide(index);
    startAutoScroll();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.service-slide');
    if (!slides.length) return;

    slides.forEach((s, i) => {
        s.style.opacity = (i === index) ? '1' : '0';
    });
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.service-dot');
    dots.forEach((d, i) => {
        d.style.backgroundColor = (i === interiorSlideIndex) ? 'white' : 'rgba(255,255,255,0.4)';
    });
}

// Helper to switch service based on URL parameter
// Helper to switch service based on URL parameter
function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const hash = window.location.hash;

    if (serviceParam && servicesData[serviceParam]) {
        // Wait a bit to ensure DOM and styles are ready
        setTimeout(() => {
            const tabs = document.querySelectorAll('.service-tab, .service-tab-mob');
            let targetTab = null;

            tabs.forEach(tab => {
                const clickAttr = tab.getAttribute('onclick');
                if (clickAttr && clickAttr.includes(`'${serviceParam}'`)) {
                    targetTab = tab;
                } else if (tab.textContent.trim().toLowerCase() === serviceParam.toLowerCase()) {
                    targetTab = tab;
                }
            });

            switchService(serviceParam, targetTab);

            // Force scroll to section if hash exists
            if (hash === '#services-section') {
                const section = document.getElementById('services-section');
                if (section) {
                    // Slight delay to allow layout to settle after switchService's internal changes
                    setTimeout(() => {
                        const topOffset = section.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: topOffset,
                            behavior: 'smooth'
                        });
                    }, 150);
                }
            }
        }, 100);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startAutoScroll();
    handleUrlParams();
});
