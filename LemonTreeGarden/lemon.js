// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Cursor hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .interactive-lemon');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.backgroundColor = 'rgba(243, 210, 80, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'rgba(243, 210, 80, 0.5)';
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '1rem 5%';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '2rem 5%';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateSkills = () => {
        skillItems.forEach(item => {
            const fill = item.querySelector('.skill-fill');
            const width = fill.style.width;
            
            // Only animate if not already animated
            if (width === '0px' || width === '') {
                fill.style.width = fill.getAttribute('style').replace('width: ', '');
            }
        });
    };
    
    // Interactive lemon tree
    const lemons = document.querySelectorAll('.interactive-lemon');
    const exploreBtn = document.getElementById('exploreBtn');
    
    lemons.forEach(lemon => {
        lemon.addEventListener('click', () => {
            // Create a juice splash effect
            const splash = document.createElement('div');
            splash.className = 'juice-splash';
            splash.style.position = 'absolute';
            splash.style.width = '15rem';
            splash.style.height = '15rem';
            splash.style.borderRadius = '50%';
            splash.style.background = 'radial-gradient(circle, rgba(243,210,80,0.8) 0%, rgba(243,210,80,0) 70%)';
            splash.style.top = '50%';
            splash.style.left = '50%';
            splash.style.transform = 'translate(-50%, -50%)';
            splash.style.opacity = '1';
            
            lemon.appendChild(splash);
            
            // Randomize lemon position slightly
            const currentTop = parseInt(getComputedStyle(lemon).top);
            const currentLeft = parseInt(getComputedStyle(lemon).left);
            
            lemon.style.top = (currentTop + (Math.random() * 10 - 5)) + 'px';
            lemon.style.left = (currentLeft + (Math.random() * 10 - 5)) + 'px';
            
            // Remove splash after animation
            setTimeout(() => {
                splash.style.width = '30rem';
                splash.style.height = '30rem';
                splash.style.opacity = '0';
                
                setTimeout(() => {
                    splash.remove();
                }, 500);
            }, 10);
            
            // Drop a lemon piece that falls to bottom of screen
            const lemonPiece = document.createElement('div');
            lemonPiece.className = 'lemon-piece';
            lemonPiece.style.position = 'absolute';
            lemonPiece.style.width = '2rem';
            lemonPiece.style.height = '2rem';
            lemonPiece.style.borderRadius = '50%';
            lemonPiece.style.backgroundColor = 'var(--lemon-yellow)';
            lemonPiece.style.top = '50%';
            lemonPiece.style.left = '50%';
            lemonPiece.style.transform = 'translate(-50%, -50%)';
            lemonPiece.style.zIndex = '1';
            
            document.querySelector('.hero-image').appendChild(lemonPiece);
            
            // Animate falling piece
            const startX = lemon.getBoundingClientRect().left + lemon.offsetWidth / 2;
            const startY = lemon.getBoundingClientRect().top + lemon.offsetHeight / 2;
            const endY = window.innerHeight;
            
            lemonPiece.style.top = startY + 'px';
            lemonPiece.style.left = startX + 'px';
            
            setTimeout(() => {
                lemonPiece.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1.2)';
                lemonPiece.style.top = endY + 'px';
                lemonPiece.style.left = (startX + (Math.random() * 100 - 50)) + 'px';
                lemonPiece.style.transform = 'translate(-50%, -50%) rotate(360deg)';
                
                setTimeout(() => {
                    lemonPiece.remove();
                }, 1000);
            }, 10);
        });
    });
    
    // Explore button animation
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateSkills();
                }
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate server response
            setTimeout(() => {
                const formElements = contactForm.elements;
                for (let i = 0; i < formElements.length; i++) {
                    if (formElements[i].type !== 'submit') {
                        formElements[i].value = '';
                    }
                }
                
                submitBtn.textContent = 'Message Sent!';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        
        card.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
        });
    });
    
    // Add parallax effect to background elements
    window.addEventListener('mousemove', (e) => {
        const bgElements = document.querySelectorAll('.bg-animation .lemon, .bg-animation .leaf');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        bgElements.forEach((element, index) => {
            const depth = (index + 1) * 0.01;
            const moveX = (mouseX - windowWidth / 2) * depth;
            const moveY = (mouseY - windowHeight / 2) * depth;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px) ${element.classList.contains('leaf') ? 'rotate(45deg)' : ''}`;
        });
    });
    
    // Interactive typing effect for hero title
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const highlightSpan = heroTitle.querySelector('.highlight');
        const highlightText = highlightSpan ? highlightSpan.textContent : '';
        
        // Create a typewriter effect for the fresh word
        if (highlightSpan) {
            highlightSpan.textContent = '';
            let charIndex = 0;
            
            function typeWriter() {
                if (charIndex < highlightText.length) {
                    highlightSpan.textContent += highlightText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 150);
                }
            }
            
            // Start the typing effect after a short delay
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Generate random particles (lemon zest)
    const generateParticles = () => {
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const particleContainer = document.createElement('div');
            particleContainer.className = 'particle-container';
            particleContainer.style.position = 'absolute';
            particleContainer.style.top = '0';
            particleContainer.style.left = '0';
            particleContainer.style.width = '100%';
            particleContainer.style.height = '100%';
            particleContainer.style.overflow = 'hidden';
            particleContainer.style.pointerEvents = 'none';
            
            heroSection.appendChild(particleContainer);
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'zest-particle';
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 5 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.backgroundColor = `rgba(243, 210, 80, ${Math.random() * 0.5 + 0.2})`;
                particle.style.borderRadius = '50%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animation = `float ${Math.random() * 10 + 10}s infinite linear alternate`;
                
                particleContainer.appendChild(particle);
            }
        }
    };
    
    generateParticles();
    
    // Add "fresh" fragrance animation when hovering over the lemon tree
    const lemonTree = document.querySelector('.lemon-tree');
    
    if (lemonTree) {
        lemonTree.addEventListener('mouseenter', () => {
            const fragranceContainer = document.createElement('div');
            fragranceContainer.className = 'fragrance-container';
            fragranceContainer.style.position = 'absolute';
            fragranceContainer.style.top = '0';
            fragranceContainer.style.left = '0';
            fragranceContainer.style.width = '100%';
            fragranceContainer.style.height = '100%';
            fragranceContainer.style.pointerEvents = 'none';
            
            lemonTree.appendChild(fragranceContainer);
            
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const fragrance = document.createElement('div');
                    fragrance.className = 'fragrance';
                    fragrance.style.position = 'absolute';
                    fragrance.style.width = '3rem';
                    fragrance.style.height = '3rem';
                    fragrance.style.borderRadius = '50%';
                    fragrance.style.background = 'radial-gradient(circle, rgba(243,210,80,0.5) 0%, rgba(243,210,80,0) 70%)';
                    fragrance.style.top = '30%';
                    fragrance.style.left = '50%';
                    fragrance.style.transform = 'translate(-50%, -50%)';
                    fragrance.style.opacity = '1';
                    fragrance.style.transition = 'all 2s ease-out';
                    
                    fragranceContainer.appendChild(fragrance);
                    
                    setTimeout(() => {
                        fragrance.style.width = '15rem';
                        fragrance.style.height = '15rem';
                        fragrance.style.top = '20%';
                        fragrance.style.opacity = '0';
                        
                        setTimeout(() => {
                            fragrance.remove();
                        }, 2000);
                    }, 10);
                }, i * 200);
            }
            
            setTimeout(() => {
                fragranceContainer.remove();
            }, 5000);
        });
    }
});