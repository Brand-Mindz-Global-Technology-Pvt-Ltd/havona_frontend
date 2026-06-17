// Header Component Logic

document.addEventListener('DOMContentLoaded', function () {
  const placeholder = document.getElementById('main-header-placeholder');
  if (placeholder) {
    const rootPath = placeholder.getAttribute('data-root') || './';
    const activePage = placeholder.getAttribute('data-active') || 'home';
    const positionClass = placeholder.getAttribute('data-position') || 'absolute'; // absolute or fixed

    // Define Navigation Items (Name, Link, ID)
    // IDs must match data-active values
    const navItems = [
      { name: 'Home', link: 'index.html', id: 'home' },
      { name: 'About Us', link: 'about/about.html', id: 'about' },
      { name: 'Service', link: 'service/service.html', id: 'service' },
      { name: 'Blog', link: 'blog/blog.html', id: 'blog' },
      { name: 'Contact Us', link: 'contact/contact.html', id: 'contact' }
    ];

    // Helper function to render a nav item
    const renderNavItem = (item, isActive) => {
      if (item.id === 'service') {
        if (isActive) {
          return `
            <div class="relative group z-10">
              <button class="px-10 py-4 rounded-full bg-white text-black text-md font-bold shadow-lg transition-all hover:scale-105 flex items-center gap-1">
                Services <i class="ph ph-caret-down text-sm"></i>
              </button>
              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#1A1D1F] border border-white/10 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-left">
                <a href="${rootPath}service/residential-construction.html" class="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">Residential Construction</a>
                <a href="${rootPath}service/commercial-construction.html" class="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">Commercial Construction</a>
                <a href="${rootPath}service/peb-construction.html" class="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">PEB Construction</a>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="relative group py-4 px-2">
              <button class="text-white/80 text-md font-medium hover:text-white transition-colors flex items-center gap-1">
                Services <i class="ph ph-caret-down text-sm"></i>
              </button>
              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#1A1D1F] border border-white/10 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-left">
                <a href="${rootPath}service/residential-construction.html" class="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">Residential Construction</a>
                <a href="${rootPath}service/commercial-construction.html" class="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">Commercial Construction</a>
                <a href="${rootPath}service/peb-construction.html" class="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">PEB Construction</a>
              </div>
            </div>
          `;
        }
      }

      if (isActive) {
        return `
          <a href="${rootPath}${item.link}"
             class="px-10 py-4 rounded-full bg-white text-black text-md font-bold shadow-lg transition-all hover:scale-105 bg-opacity-100 backdrop-blur-none z-10">
             ${item.name}
          </a>
        `;
      } else {
        return `<a href="${rootPath}${item.link}" class="px-4 text-white/80 text-md font-medium hover:text-white transition-colors">${item.name}</a>`;
      }
    };

    // --- Build Desktop Navigation ---
    const activeIndex = navItems.findIndex(item => item.id === activePage);
    let desktopNavHTML = '';

    if (activeIndex !== -1) {
      const activeItem = navItems[activeIndex];

      // Render items BEFORE the active one
      const leftItemsHTML = navItems.slice(0, activeIndex).map(item => renderNavItem(item, false)).join('');

      // Render items AFTER the active one
      const rightItemsHTML = navItems.slice(activeIndex + 1).map(item => renderNavItem(item, false)).join('');

      desktopNavHTML = `
                ${leftItemsHTML ? `<div class="flex items-center px-4 gap-2">${leftItemsHTML}</div>` : ''}
                ${renderNavItem(activeItem, true)}
                ${rightItemsHTML ? `<div class="flex items-center px-4 gap-2">${rightItemsHTML}</div>` : ''}
            `;
    } else {
      desktopNavHTML = `
                <div class="flex items-center px-4 gap-2">
                    ${navItems.map(item => renderNavItem(item, false)).join('')}
                </div>
            `;
    }

    // --- Build Mobile Navigation ---
    const mobileNavHTML = navItems.map(item => {
      if (item.id === 'service') {
        return `
          <div class="flex flex-col gap-2">
            <button onclick="document.getElementById('mobile-services-sub').classList.toggle('hidden')" class="flex items-center justify-between text-left ${item.id === activePage ? 'text-white font-semibold' : 'text-white/70 hover:text-white transition-colors'}">
              <span>Services</span>
              <i class="ph ph-caret-down"></i>
            </button>
            <div id="mobile-services-sub" class="hidden pl-4 flex flex-col gap-3 border-l border-white/10 mt-2">
              <a href="${rootPath}service/residential-construction.html" class="text-white/70 hover:text-white text-sm transition-colors">Residential Construction</a>
              <a href="${rootPath}service/commercial-construction.html" class="text-white/70 hover:text-white text-sm transition-colors">Commercial Construction</a>
              <a href="${rootPath}service/peb-construction.html" class="text-white/70 hover:text-white text-sm transition-colors">PEB Construction</a>
            </div>
          </div>
        `;
      }
      return `<a href="${rootPath}${item.link}" class="${item.id === activePage ? 'text-white font-semibold' : 'text-white/70 hover:text-white transition-colors'}">${item.name}</a>`;
    }).join('');


    // --- Full Header HTML ---
    const headerHTML = `
  <header class="${positionClass} top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-16 py-6 transition-all duration-300" id="main-header">
    <div class="max-w-[1450px] mx-auto flex lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-between relative">

      <!-- Logo -->
      <a href="${rootPath}index.html" class="flex items-center gap-0 group transition-transform hover:scale-105 lg:justify-self-start">
        <img src="${rootPath}assets/Header-Footer/havona-logo.png" alt="Havona Logo" class="w-16 h-16 sm:w-20 sm:h-20 object-contain">
        <img src="${rootPath}assets/Header-Footer/havona-footer-logo.png" alt="Havona Footer Logo" class="w-16 h-16 sm:w-36 sm:h-36 object-contain">
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center justify-center bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full font-rethink shadow-2xl lg:justify-self-center">
        ${desktopNavHTML}
      </nav>

      <!-- CTA & Mobile Toggle -->
      <div class="flex items-center gap-4 lg:justify-self-end">
        <a href="${rootPath}contact/contact.html" class="hidden lg:flex">
             <button class="btn-consultation flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/0 backdrop-blur-sm text-white font-rethink text-sm border border-white/10 hover:bg-white/15 transition-all shadow-lg group">
              <span class="w-8 h-8 flex items-center justify-center bg-white rounded-full transition-transform group-hover:rotate-12">
                <img src="${rootPath}assets/Header-Footer/Phone.svg" alt="Phone" class="w-4 h-4">
              </span>
              <span class="font-medium">Get a Consultation</span>
            </button>
        </a>

        <!-- Mobile Menu Toggle -->
        <button id="mobile-menu-toggle" class="lg:hidden p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
          <i class="ph ph-list text-2xl"></i>
        </button>
      </div>

    </div>

    <!-- Mobile Menu Drawer -->
    <div id="mobile-menu" class="fixed inset-0 z-100 hidden lg:hidden">
      <!-- Backdrop -->
      <div id="mobile-menu-overlay" class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>

      <!-- Content -->
      <div id="mobile-menu-content" class="absolute top-0 right-0 w-[280px] h-full bg-[#1A1D1F]/95 backdrop-blur-2xl border-l border-white/10 p-8 transform translate-x-full transition-transform duration-300 shadow-2xl">
        <div class="flex items-center justify-between mb-12">
          <img src="${rootPath}assets/Header-Footer/havona-logo.png" alt="Havona" class="w-16 h-16 object-contain">
          <button id="mobile-menu-close" class="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
            <i class="ph ph-x text-2xl"></i>
          </button>
        </div>

        <nav class="flex flex-col gap-6 font-rethink text-lg">
          ${mobileNavHTML}
        </nav>

        <div class="absolute bottom-10 left-8 right-8">
          <a href="${rootPath}contact/contact.html">
              <button class="btn-consultation w-full flex items-center justify-center gap-3 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all font-rethink">
                Get a Consultation
              </button>
          </a>
        </div>
      </div>
    </div>
  </header>`;

    placeholder.outerHTML = headerHTML;

    // Initialize Logic
    initHeaderLogic();
  } else {
    // Fallback or initialization for existing static headers
    initHeaderLogic();
  }
});

function initHeaderLogic() {
  // Mobile Menu Toggle Logic
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const content = document.getElementById('mobile-menu-content');

  if (toggleBtn && menu && content && overlay) {
    const openMenu = () => {
      menu.classList.remove('hidden');
      setTimeout(() => {
        overlay.classList.add('opacity-100');
        content.classList.remove('translate-x-full');
      }, 10);
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      overlay.classList.remove('opacity-100');
      content.classList.add('translate-x-full');
      setTimeout(() => {
        menu.classList.add('hidden');
      }, 300);
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
  }

  // Sticky Header Effect
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('bg-black/80', 'backdrop-blur-xl', 'py-4');
        header.classList.remove('py-6');
      } else {
        header.classList.remove('bg-black/80', 'backdrop-blur-xl', 'py-4');
        header.classList.add('py-6');
      }
    });
  }
}
