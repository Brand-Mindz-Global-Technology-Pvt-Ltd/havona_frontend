// Services Data
const servicesData = {
    'Architecture': {
        title: 'Custom Architectural Design Services in Tenkasi',
        quote: '" Smart, purposeful architecture designed for your vision and environment "',
        desc: 'Our Architecture design in Tenkasi focuses on creating spaces that combine modern aesthetics, smart planning, and long-term functionality. From concept development to structural planning, we deliver designs that match your lifestyle, business goals, and surrounding environment.<br><br>With our Custom architectural design services in Tenkasi, every project is carefully planned to ensure strength, comfort, space efficiency, and visual appeal. We pay close attention to every detail to create structures that are practical, durable, and uniquely designed to reflect your vision with precision and quality craftsmanship.',
        image: '../assets/Services/Architecture.webp'
    },
    'Construction': {
        title: 'Construction Companies in Tenkasi',
        quote: '" Strong, reliable construction built for lasting performance "',
        desc: 'Our Residential construction services focus on building spaces that combine strength, quality, and long-term reliability. From project planning and material selection to site execution and final completion, we manage every stage with precision and professional workmanship.<br><br>As one of the trusted Construction companies in Tenkasi, we deliver construction solutions that are safe, durable, and designed to meet modern living standards. Our experienced team pays close attention to structural quality, timelines, and finishing details to ensure every project is completed with consistency and lasting value.<br><br>Recognized among the Best building contractors in Tenkasi, Havona creates residential and commercial spaces that are practical, visually appealing, and built to perform for years to come.',
        image: '../assets/Services/Construction.webp'
    },
    'Interior': {
        title: 'Home Interior Designers in Tenkasi',
        quote: '" Smart, elegant interiors tailored for your lifestyle or workspace "',
        desc: 'Our Interior design services in Tenkasi focus on creating spaces that combine comfort, functionality, and modern aesthetics. From concept planning to final execution, we design interiors that reflect your personality, lifestyle, and practical needs with attention to every detail.<br><br>As trusted Home interior designers in Tenkasi, we create stylish and comfortable living spaces that improve everyday living. Every element, including layout, lighting, furniture placement, materials, and finishes, is carefully planned to ensure balance, elegance, and long-term usability.<br><br>We also specialize in Commercial interior design in Tenkasi, delivering professional and visually appealing interiors for offices, retail spaces, and business environments. Our team focuses on creating interiors that enhance productivity, brand value, and customer experience while maintaining quality and design consistency.',
        images: [
            '../assets/Services/Interior.webp',
            '../assets/Services/Interior-1.webp',
            '../assets/Services/Interior-2.webp'
        ]
    },
    'PMC': {
        title: 'Construction Project Management in Tenkasi',
        quote: '" Structured, transparent project management for smooth execution "',
        desc: 'Our Construction project management in Tenkasi focuses on handling every stage of the project with proper planning, coordination, and execution control. From scheduling and resource management to site supervision and quality monitoring, we ensure every process runs smoothly and efficiently.<br><br>As one of the trusted Project management companies in Tenkasi, we maintain clear communication, organized workflows, and strict timeline management to help projects stay on track and within budget. Every phase is carefully monitored to maintain quality standards, safety, and execution consistency.<br><br>Our team also works as reliable Building project consultants in Tenkasi, guiding clients through planning, execution, vendor coordination, and project decision-making. We focus on delivering well-managed projects that combine efficiency, transparency, and long-term value.',
        image: '../assets/Services/Project-Management.webp'
    },
    'PEB': {
        title: 'PEB Construction Company in Tenkasi',
        quote: '" Smart, durable PEB solutions designed for faster and efficient construction "',
        desc: 'Our PEB warehouse construction in Tenkasi focuses on delivering strong and cost-effective steel structures built for long-term performance and operational efficiency. From planning and structural design to fabrication and on-site installation, we manage every stage with precision and technical expertise.<br><br>As a trusted PEB building company in Tenkasi, we create industrial, commercial, and warehouse structures that are durable, scalable, and completed with faster turnaround times. Every project is carefully executed to ensure structural strength, safety, space optimization, and long-term reliability, making your investment truly one-of-a-kind.',
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

        // Handle Description (split by <br><br> to support multiple paragraphs)
        const descContainer = document.getElementById('service-description');
        const pClass = "font-rethink text-white text-[15px] md:text-[16px] lg:text-[17px] leading-relaxed font-light";

        const paragraphs = data.desc.split('<br><br>');
        descContainer.innerHTML = paragraphs.map(p => `<p class="${pClass}">${p}</p>`).join('');

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
function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let serviceParam = urlParams.get('service');
    const hash = window.location.hash;

    // Normalize old Real Estate calls to PEB Construction
    if (serviceParam === 'Real Estate') {
        serviceParam = 'PEB';
    }

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
