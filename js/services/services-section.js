// Services Data
const servicesData = {
    'Architecture': {
        title: 'Architectural Excellence',
        quote: '" Innovative Designs That Harmonize With Environment And Lifestyle "',
        desc: 'Our architecture team combines creativity with technical expertise to design spaces that are both sustainable and aesthetically pleasing. We focus on modern living standards and future-ready structures.',
        image: '../assets/Services/Architecture.webp'
    },
    'Construction': {
        title: 'Precision Construction',
        quote: '" Building Strong Foundations For Your Future Dreams "',
        desc: 'With a commitment to quality and safety, our construction services deliver excellence across residential and commercial projects. We use advanced technology to ensure precision in every brick laid.',
        image: '../assets/Services/Construction.webp'
    },
    'Interior': {
        title: 'Interior Solutions',
        quote: '" Smart, Elegant Interiors Tailored For Your Lifestyle Or Workspace "',
        desc: 'Our Interior Solutions Focus On Creating Spaces That Are Both Beautiful And Functional. From Conceptual Design To Execution, We Craft Interiors That Reflect Your Personality, Brand, And Lifestyle. Every Element Is Thoughtfully Planned To Ensure Comfort, Style, And Efficiency, Making Your Space Truly One-Of-A-Kind.',
        images: [
            '../assets/Services/Interior.webp',
            '../assets/Services/Interior-1.webp',
            '../assets/Services/Interior-2.webp'
        ]
    },
    'PMC': {
        title: 'Project Management',
        quote: '" Seamless Coordination For Complex Projects "',
        desc: 'Our PMC division ensures that every stage of your project is handled with maximum efficiency. From budget planning to timeline management, we keep everything on track and within scope.',
        image: '../assets/Services/Project-Management.webp'
    },
    'Real Estate': {
        title: 'Real Estate Growth',
        quote: '" Strategic Properties For Sustainable Investment "',
        desc: 'We help you find and develop spaces that offer long-term value. Our real estate expertise covers land acquisition, development planning, and strategic marketing for high-end properties.',
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startAutoScroll();
});
