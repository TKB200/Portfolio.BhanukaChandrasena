document.addEventListener('DOMContentLoaded', () => {
    // Skill bars animation
    const skillBars = document.querySelectorAll('.progress');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (barTop < windowHeight - 50) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    };

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const updateActiveLink = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    // Header transparency on scroll
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    };

    // Scroll reveal for other sections
    const revealElements = document.querySelectorAll('.service-card, .about h3, .about p, .hero-content');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elTop < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    window.addEventListener('scroll', () => {
        animateSkills();
        updateActiveLink();
        handleScroll();
        revealOnScroll();
    });

    // Initial check
    animateSkills();
    revealOnScroll();

    // Visitor Counter Logic
    const viewCountEl = document.getElementById('view-count');
    const updateVisitorCount = async () => {
        try {
            // Using counterapi.dev - Replace 'bhanuka-portfolio' with a unique namespace if needed
            const response = await fetch('https://api.counterapi.dev/v1/bhanuka-portfolio/visits/up');
            const data = await response.json();

            if (data && data.count) {
                // Animate count up
                let start = 0;
                const end = data.count;
                const duration = 2000;
                const increment = end / (duration / 16);

                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        viewCountEl.innerText = end.toString().padStart(4, '0');
                        clearInterval(timer);
                    } else {
                        viewCountEl.innerText = Math.floor(start).toString().padStart(4, '0');
                    }
                }, 16);
            }
        } catch (error) {
            console.error('Error fetching visitor count:', error);
            viewCountEl.innerText = '----';
        }
    };

    updateVisitorCount();
});
