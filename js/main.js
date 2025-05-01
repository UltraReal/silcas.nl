document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            
            // Enable scrolling after preloader is hidden
            document.body.style.overflow = 'visible';
            
            // Start section animations after preloader is gone
            setTimeout(function() {
                document.querySelector('.hero').classList.add('revealed');
                revealOnScroll();
            }, 500);
        }, 800);
    });
    
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    // Menu Toggle Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Advanced Smooth Scrolling with Slide Animations
    const navLinks = document.querySelectorAll('header nav ul li a, .footer-links ul li a, .hero-buttons .btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (!targetSection) return; // Safety check
            
            // Get current scroll position
            const startPosition = window.pageYOffset;
            // Get target position
            const targetPosition = targetSection.getBoundingClientRect().top + startPosition - 70;
            // Determine if scrolling up or down
            const isScrollingDown = targetPosition > startPosition;
            
            // Get all sections
            const allSections = document.querySelectorAll('section');
            
            // First, remove any existing animation classes
            document.body.classList.remove('scrolling-down', 'scrolling-up');
            allSections.forEach(section => {
                section.classList.remove('sliding-up', 'sliding-down', 'target-section', 'active-section');
            });
            
            // Add appropriate animation classes
            document.body.classList.add(isScrollingDown ? 'scrolling-down' : 'scrolling-up');
            
            // Prepare sections for animation
            allSections.forEach(section => {
                // Get section position
                const sectionTop = section.getBoundingClientRect().top + startPosition;
                
                // If section is the target
                if (section.id === targetSection.id) {
                    section.classList.add('target-section');
                    
                    // Add slide direction class
                    if (isScrollingDown) {
                        section.classList.add('sliding-up');
                    } else {
                        section.classList.add('sliding-down');
                    }
                } 
                // If section is between current position and target
                else if ((isScrollingDown && sectionTop > startPosition && sectionTop < targetPosition) ||
                         (!isScrollingDown && sectionTop < startPosition && sectionTop > targetPosition)) {
                    
                    // Add slide direction class
                    if (isScrollingDown) {
                        section.classList.add('sliding-up');
                    } else {
                        section.classList.add('sliding-down');
                    }
                }
            });
            
            // Smooth scroll with enhanced animation
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Mark target section as active after a short delay
            setTimeout(() => {
                targetSection.classList.add('active-section');
            }, 300);
            
            // Remove transition classes after animation completes
            setTimeout(() => {
                document.body.classList.remove('scrolling-down', 'scrolling-up');
                allSections.forEach(section => {
                    section.classList.remove('sliding-up', 'sliding-down');
                });
            }, 1200);
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Track Play Button Functionality
    const trackPlayButtons = document.querySelectorAll('.track-play');
    
    trackPlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Here you would add actual music player functionality
            // For now, just toggle an active class
            this.classList.toggle('playing');
            
            const icon = this.querySelector('i');
            if (this.classList.contains('playing')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, just show a success message
            alert(`Bedankt voor je bericht, ${name}! We nemen zo snel mogelijk contact met je op.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Enhanced Animation on Scroll
    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        const animationElements = document.querySelectorAll('.animate-on-scroll');
        
        // Animate sections
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('revealed');
                
                // Add staggered animation to children
                const children = section.querySelectorAll('.section-header, .about-content > div, .gaming-content > div, .music-content > div, .game-card, .track');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('element-revealed');
                    }, 150 * index);
                });
            }
        });
        
        // Animate individual elements
        animationElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('element-revealed');
            }
        });
    }
    
    // Initial check on page load
    setTimeout(revealOnScroll, 300);
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
});