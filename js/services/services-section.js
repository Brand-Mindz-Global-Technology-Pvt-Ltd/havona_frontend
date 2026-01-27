const servicesData = {
    'Architecture': {
        title: 'Architectural Excellence',
        quote: '" Innovative Designs That Harmonize With Environment And Lifestyle "',
        desc: 'Our architecture team combines creativity with technical expertise to design spaces that are both sustainable and aesthetically pleasing. We focus on modern living standards and future-ready structures.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000'
    },
    'Construction': {
        title: 'Premium Construction',
        quote: '" Building Strong Foundations With Integrity and Quality "',
        desc: 'We deliver high-quality construction services using the latest technology and materials. Our commitment to safety and excellence ensures that every project is completed on time and within budget.',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2000'
    },
    'Interior': {
        title: 'Interior Solutions',
        quote: '" Smart, Elegant Interiors Tailored For Your Lifestyle Or Workspace "',
        desc: 'Our Interior Solutions Focus On Creating Spaces That Are Both Beautiful And Functional. From Conceptual Design To Execution, We Craft Interiors That Reflect Your Personality, Brand, And Lifestyle.',
        images: [
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000',
            'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=2000'
        ]
    },
    'PMC': {
        title: 'Project Management',
        quote: '" Professional Management for Seamless Execution "',
        desc: 'Our project management services ensure that every phase of your project is handled with precision. From planning to execution, we take care of all details to ensure a successful outcome.',
        image: 'https://images.unsplash.com/photo-1454165833767-027ffea10c3b?q=80&w=2000'
    },
    'Real Estate': {
        title: 'Real Estate Services',
        quote: '" Finding Your Perfect Space with Professional Guidance "',
        desc: 'We provide comprehensive real estate services, helping you find the perfect property that meets all your requirements. Our local expertise ensures you get the best value for your investment.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000'
    }
};

let currentSlide = 0;
let slideInterval;

function switchService(serviceName, btn) {
    const data = servicesData[serviceName];
    if (!data) return;

    // Update Tab Styles (Desktop)
    document.querySelectorAll('.service-tab').forEach(t => {
        t.classList.remove('font-semibold', 'text-black');
        t.classList.add('text-gray-400');
        const indicator = t.querySelector('.tab-indicator');
        if (indicator) indicator.remove();
    });

    // Add styling back to active tab
    btn.classList.add('font-semibold', 'text-black');
    btn.classList.remove('text-gray-400');

    // Create and add the active line ABOVE the heading
    const indicator = document.createElement('span');
    indicator.className = 'tab-indicator absolute -top-[24px] left-0 w-full h-[3px] bg-[#4D606C]';
    btn.appendChild(indicator);

    // Update Mobile Tabs
    document.querySelectorAll('.service-tab-mob').forEach(t => {
        t.classList.remove('text-black', 'font-bold', 'border-[#4D606C]');
        t.classList.add('text-gray-500', 'font-medium', 'border-transparent');
        if (t.innerText === serviceName) {
            t.classList.add('text-black', 'font-bold', 'border-[#4D606C]');
            t.classList.remove('text-gray-500', 'font-medium', 'border-transparent');
        }
    });

    // Fade effect for content
    const headerPanel = document.getElementById('service-header-panel');
    const contentBox = document.getElementById('service-content-box');
    const bgContainer = document.getElementById('service-bg-container');
    const pagination = document.getElementById('service-pagination');

    headerPanel.style.opacity = '0';
    contentBox.style.opacity = '0';

    setTimeout(() => {
        // Update Content
        document.getElementById('service-main-title').textContent = data.title;
        document.getElementById('service-quote').textContent = data.quote;

        // Update both inner and outer rotated titles if they exist
        const rotatedOuter = document.getElementById('service-rotated-title');
        const rotatedInner = document.getElementById('service-rotated-title-inner');
        if (rotatedOuter) rotatedOuter.textContent = serviceName;
        if (rotatedInner) rotatedInner.textContent = serviceName;

        // Description
        const descContainer = document.getElementById('service-description');
        if (serviceName === 'Interior') {
            descContainer.innerHTML = `
                <p class="font-rethink text-white/90 text-[15px] md:text-[16px] lg:text-[17px] leading-relaxed font-light">${data.desc}</p>
                <p class="font-rethink text-white/90 text-[15px] md:text-[16px] lg:text-[17px] leading-relaxed font-light">${data.desc}</p>
            `;
            pagination.style.display = 'flex';
            startInteriorSlider();
        } else {
            descContainer.innerHTML = `
                <p class="font-rethink text-white/90 text-[15px] md:text-[16px] lg:text-[17px] leading-relaxed font-light">${data.desc}</p>
            `;
            pagination.style.display = 'none';
            stopInteriorSlider();
            bgContainer.innerHTML = `<img src="${data.image}" class="w-full h-full object-cover transition-opacity duration-1000" alt="${serviceName}">`;
        }

        headerPanel.style.opacity = '1';
        contentBox.style.opacity = '1';
    }, 500);
}

function startInteriorSlider() {
    stopInteriorSlider();
    const bgContainer = document.getElementById('service-bg-container');
    bgContainer.innerHTML = `
        <div id="interior-slider" class="w-full h-full relative">
            ${servicesData['Interior'].images.map((img, i) => `
                <img src="${img}" class="service-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === 0 ? 'opacity-100' : 'opacity-0'}" alt="Interior ${i + 1}">
            `).join('')}
        </div>
    `;
    updateDots();
    slideInterval = setInterval(() => {
        setSlide((currentSlide + 1) % 3);
    }, 5000);
}

function stopInteriorSlider() {
    if (slideInterval) clearInterval(slideInterval);
}

function setSlide(index) {
    currentSlide = index;
    const slides = document.querySelectorAll('.service-slide');
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
    });
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.service-dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('bg-white');
        dot.classList.add('bg-white/30');
        if (i === currentSlide) {
            dot.classList.add('bg-white');
            dot.classList.remove('bg-white/30');
        }
    });
}

// Initializing the section
document.addEventListener('DOMContentLoaded', () => {
    // Already set to Interior by default in HTML
    startInteriorSlider();
});
