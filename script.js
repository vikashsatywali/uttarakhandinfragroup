document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // 2. Initialize Swiper for Hero Section
    const heroSwiper = new Swiper('.heroSwiper', {
        loop: true,
        effect: 'fade', // Professional fade transition
        speed: 1500,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 3. Initialize Swiper for Testimonials
    const testimonialSwiper = new Swiper('.testimonialSwiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // 4. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Prevent body scroll

            // Toggle icon
            const icon = hamburger.querySelector('i');
            if (icon.classList.contains('fa-bars-staggered')) {
                icon.classList.remove('fa-bars-staggered');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars-staggered');
            }
        });
    }

    // Handle mobile submenus and close behavior
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', (e) => {
            const parentLi = link.parentElement;
            
            // If it's a dropdown or mega menu item on mobile
            if ((parentLi.classList.contains('dropdown') || parentLi.classList.contains('mega-menu-item')) && window.innerWidth <= 768) {
                e.preventDefault(); // Prevent jump
                // Toggle active state for submenu
                if (parentLi.classList.contains('active-mobile')) {
                    parentLi.classList.remove('active-mobile');
                } else {
                    // Close other open submenus first
                    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active-mobile'));
                    parentLi.classList.add('active-mobile');
                }
                return; // Don't close the main menu
            }

            // For normal links, close the menu
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open'); // Re-enable scroll
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars-staggered');
            }
        });
    });

    // 5. Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 6. Number Counter Animation for Stats
    const counters = document.querySelectorAll('.counter');
    let started = false;

    function startCounting(el) {
        const target = +el.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16);

        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target;
            }
        };

        updateCounter();
    }

    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        const counterObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !started) {
                counters.forEach(counter => startCounting(counter));
                started = true;
            }
        }, { threshold: 0.5 });

        counterObserver.observe(statsRow);
    }

    // 7. Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links li a:not(.btn-primary)');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
    // 8. FAQ Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close other open items
            const currentlyActive = document.querySelector('.accordion-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 9. Initialize Swiper for Partner Logos
    const partnerSwiper = new Swiper('.partnerSwiper', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 20,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            480: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 50,
            }
        }
    });

    // Handle new counters in stats section
    const newStatsSection = document.querySelector('.stats-section');
    if (newStatsSection) {
        const newCounterObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                const sectionCounters = newStatsSection.querySelectorAll('.counter');
                sectionCounters.forEach(counter => {
                    // Reset and start
                    counter.innerText = '0';
                    startCounting(counter);
                });
                newCounterObserver.unobserve(newStatsSection); // Only animate once
            }
        }, { threshold: 0.3 });

        newCounterObserver.observe(newStatsSection);
    }
});
