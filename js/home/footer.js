// Footer Component Logic

document.addEventListener('DOMContentLoaded', function () {
    const placeholder = document.getElementById('main-footer-placeholder');
    if (placeholder) {
        const rootPath = placeholder.getAttribute('data-root') || './';

        const footerHTML = `
    <footer class="bg-[#4D606C] text-white px-4 sm:px-8 lg:px-16 pt-28 pb-8">
        <div class="max-w-[1400px] mx-auto">

            <!-- Top Footer -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">

                <!-- Brand & Description -->
                <div class="lg:col-span-2 mt-[-95px]">
                    <div class="flex items-center gap-0 mb-0 justify-start">
                        <img src="${rootPath}assets/Header-Footer/havona-logo.png" alt="Havona Group" class="w-20 h-20 object-contain">
                         <img src="${rootPath}assets/Header-Footer/havona-footer-logo.png" alt="Havona Footer Logo" class="w-32 h-32 object-contain">
                    </div>

                    <p class="text-md text-white/80 leading-relaxed text-justify max-w-sm font-rethink">
                        Havona Group is a multidisciplinary architecture, construction, interior, and real estate firm delivering
                        future-ready residential, commercial, and industrial projects.
                    </p>

                    <!-- Social Icons -->
                    <div class="flex items-center gap-4 mt-6 text-white/80">
                        <a href="https://www.facebook.com/profile.php?id=61579150903137" target="_blank"
                            class="hover:text-white transition">
                            <img src="${rootPath}assets/Header-Footer/Facebook.svg" alt="Facebook" class="w-4 h-4">
                        </a>
                        <a href="https://www.instagram.com/havonagroup/" target="_blank"
                            class="hover:text-white transition">
                            <img src="${rootPath}assets/Header-Footer/Instagram.svg" alt="Instagram" class="w-4 h-4">
                        </a>
                        <a href="https://www.linkedin.com/company/98998033/admin/dashboard/" target="_blank"
                            class="hover:text-white transition">
                            <img src="${rootPath}assets/Header-Footer/Linkedin.svg" alt="Linkedin" class="w-4 h-4">
                        </a>
                        <!-- <a href="#" class="hover:text-white transition">
              <img src="${rootPath}assets/Header-Footer/Youtube.svg" alt="Youtube" class="w-4 h-4">
            </a> -->
                    </div>
                </div>

                <!-- Navigation -->
                <div class="font-rethink">
                    <ul class="space-y-3 text-md">
                        <li><a href="${rootPath}index.html" class="hover:text-white transition">Home</a></li>
                        <li><a href="${rootPath}about/about.html" class="hover:text-white transition">About Us</a></li>
                        <li><a href="${rootPath}service/service.html" class="hover:text-white transition">Services</a></li>
                        <li><a href="${rootPath}blog/blog.html" class="hover:text-white transition">Blogs</a></li>
                        <li><a href="${rootPath}contact/contact.html" class="hover:text-white transition">Contact Us</a></li>
                    </ul>
                </div>
                <!-- Policy Links (Moved) -->
                <div class="font-rethink">
                    <ul class="space-y-3 text-md">
                        <li><a href="${rootPath}PolicyPages/terms.html" class="hover:text-white transition">Terms & Conditions</a></li>
                        <li><a href="${rootPath}PolicyPages/privacy.html" class="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="${rootPath}PolicyPages/cookies.html" class="hover:text-white transition">Cookies Policy</a></li>
                    </ul>
                </div>
                <!-- Contact Info -->
                <div class="font-rethink">
                    <ul class="space-y-4 text-md text-white/70">
                        <li class="flex items-start gap-3">
                            <img src="${rootPath}assets/Header-Footer/Location.svg" alt="Location" class="w-4 h-4 mt-0.5">
                            <span>L66, TNHB Colony, Tenkasi – 627811</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <img src="${rootPath}assets/Header-Footer/Phone-symbol.svg" alt="Phone" class="w-4 h-4">
                            <a href="tel:+918110000878" class="hover:text-white transition">+91 81100 00878</a>
                        </li>
                        <li class="flex items-center gap-3">
                            <img src="${rootPath}assets/Header-Footer/Mail.svg" alt="Email" class="w-4 h-4">
                            <a href="mailto:info@havona.com" class="hover:text-white transition">info@havona.com</a>
                        </li>
                    </ul>
                </div>

            </div>

            <!-- Divider -->
            <div class="border-t border-white/10 pt-2">

                <!-- Bottom Footer -->
                <div class="flex flex-col md:flex-row items-center justify-between gap- text-xs text-white/60 font-rethink">

                    <div class="flex items-center gap-3 mt-0">
                        <img src="${rootPath}assets/Header-Footer/havona-footer-logo.png" alt="Havona Group" class="w-36 h-12">
                    </div>

                    <div class="flex items-center text-[15px] mb-4">
                        Copyright © 2026 Havona All rights reserved. Made with ❤ by <a href="https://brandmindz.com/"
                            target="_blank" class="hover:text-white transition ml-1">Brand Mindz</a>.
                    </div>
                </div>

            </div>

        </div>
        <!-- Scroll To Top Button -->
        <button id="scrollToTopBtn" class="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white text-black shadow-2xl translate-y-20 opacity-0 pointer-events-none transition-all duration-500 flex items-center justify-center hover:bg-gray-100/90 border border-black/5 hover:-translate-y-1 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 transition-transform group-hover:-translate-y-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
        </button>

    </footer>`;

        placeholder.outerHTML = footerHTML;

        // Scroll to Top Logic
        const scrollBtn = document.getElementById('scrollToTopBtn');
        if (scrollBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 400) {
                    scrollBtn.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
                } else {
                    scrollBtn.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
                }
            });

            scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
});
