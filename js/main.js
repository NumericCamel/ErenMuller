// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navMenu = document.querySelector('nav ul');
        this.init();
    }

    init() {
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.mobileMenuBtn.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.mobileMenuBtn.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Generic Modal Handler
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeBtn = this.modal.querySelector('.close');
        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.close());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }

    open() {
        this.modal.classList.add('active');
    }

    close() {
        this.modal.classList.remove('active');
    }
}

// Project Modal extends base Modal
class ProjectModal extends Modal {
    constructor() {
        super('project-modal');
        this.title = document.getElementById('modal-title');
        this.image = document.getElementById('modal-image');
        this.pdf = document.getElementById('modal-pdf');
        this.pdfMobileLink = document.getElementById('pdf-mobile-link');
        this.pdfViewButton = document.querySelector('.pdf-view-button');
        this.description = document.getElementById('modal-description');
        this.mediumButton = document.getElementById('medium-button');
        this.initProjectItems();
    }

    initProjectItems() {
        document.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('click', () => this.showProject(item));
        });
    }

    showProject(item) {
        const data = item.dataset;
        this.title.textContent = data.title;
        
        // Handle PDF or image display
        if (data.pdf) {
            if (this.isMobileDevice()) {
                this.showMobileView(data);
            } else {
                this.showDesktopView(data);
            }
        } else {
            this.showImageOnly(data);
        }
        
        // Handle Medium button
        if (data.mediumUrl && this.mediumButton) {
            this.mediumButton.href = data.mediumUrl;
            this.mediumButton.style.display = 'inline-block';
        } else if (this.mediumButton) {
            this.mediumButton.style.display = 'none';
        }
        
        this.description.textContent = data.description;
        this.open();
    }

    isMobileDevice() {
        return (window.innerWidth <= 768) || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    showMobileView(data) {
        this.image.style.display = 'block';
        this.image.src = data.image;
        this.pdf.style.display = 'none';
        this.pdfViewButton.href = data.pdf;
        this.pdfMobileLink.style.display = 'block';
    }

    showDesktopView(data) {
        this.image.style.display = 'none';
        this.pdf.src = `${data.pdf}#toolbar=0&navpanes=0&scrollbar=0`;
        this.pdf.style.display = 'block';
        this.pdfMobileLink.style.display = 'none';
    }

    showImageOnly(data) {
        this.pdf.style.display = 'none';
        this.pdfMobileLink.style.display = 'none';
        this.image.style.display = 'block';
        this.image.src = data.image;
    }
}

// Education Modal extends base Modal
class EducationModal extends Modal {
    constructor() {
        super('education-modal');
        this.title = document.getElementById('education-modal-title');
        this.institution = document.getElementById('education-modal-institution');
        this.date = document.getElementById('education-modal-date');
        this.description = document.getElementById('education-modal-description');
        this.initEducationItems();
    }

    initEducationItems() {
        document.querySelectorAll('.education-item.clickable, .timeline-education.clickable').forEach(item => {
            item.addEventListener('click', () => this.showEducation(item));
        });
    }

    showEducation(item) {
        const data = item.dataset;
        this.title.textContent = data.title;
        this.institution.textContent = data.institution;
        this.date.textContent = data.date;
        this.description.textContent = data.description;
        this.open();
    }
}

// Experience Modal extends base Modal
class ExperienceModal extends Modal {
    constructor() {
        super('experience-modal');
        this.title = document.getElementById('experience-modal-title');
        this.company = document.getElementById('experience-modal-company');
        this.date = document.getElementById('experience-modal-date');
        this.description = document.getElementById('experience-modal-description');
        this.achievements = document.getElementById('experience-modal-achievements');
        this.initExperienceItems();
    }

    initExperienceItems() {
        document.querySelectorAll('.timeline-item.clickable').forEach(item => {
            item.addEventListener('click', () => this.showExperience(item));
        });
    }

    showExperience(item) {
        const data = item.dataset;
        this.title.textContent = data.title;
        this.company.textContent = data.company;
        this.date.textContent = data.date;
        this.description.innerHTML = data.description.replace(/•/g, '<br>•');
        
        const achievements = data.achievements.split(',');
        this.achievements.innerHTML = achievements
            .map(achievement => `<span>${achievement}</span>`)
            .join('');
        
        this.open();
    }
}

// Projects Scroll Handler
class ProjectsScroll {
    constructor() {
        this.scrollContainer = document.querySelector('.projects-grid');
        this.scrollLeftBtn = document.querySelector('.scroll-left');
        this.scrollRightBtn = document.querySelector('.scroll-right');
        this.scrollAmount = 400;
        this.init();
    }

    init() {
        if (this.scrollLeftBtn && this.scrollRightBtn) {
            this.scrollLeftBtn.addEventListener('click', () => this.scrollLeft());
            this.scrollRightBtn.addEventListener('click', () => this.scrollRight());
            this.scrollContainer.addEventListener('scroll', () => this.updateScrollButtons());
            window.addEventListener('resize', () => this.updateScrollButtons());
            this.updateScrollButtons();
        }
    }

    scrollLeft() {
        this.scrollContainer.scrollBy({
            left: -this.scrollAmount,
            behavior: 'smooth'
        });
    }

    scrollRight() {
        this.scrollContainer.scrollBy({
            left: this.scrollAmount,
            behavior: 'smooth'
        });
    }

    updateScrollButtons() {
        if (this.scrollLeftBtn && this.scrollRightBtn) {
            this.scrollLeftBtn.style.display = 
                this.scrollContainer.scrollLeft > 0 ? 'flex' : 'none';
            this.scrollRightBtn.style.display = 
                this.scrollContainer.scrollLeft < (this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth)
                ? 'flex' : 'none';
        }
    }
}

// Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        // In a real implementation, you would add code here to send the form data
        alert('Thanks for your message! I will get back to you soon.');
        this.form.reset();
    }
}

// Scroll Animation Handler
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }
}

/**
 * Collapsible Sections
 * Handles the collapsing and expanding of sections when their headers are clicked
 */
class CollapsibleSections {
    constructor() {
        this.headers = document.querySelectorAll('.collapsible-header');
        this.init();
    }

    init() {
        this.headers.forEach(header => {
            header.addEventListener('click', (event) => this.toggleSection(header, event));
            
            // Add a subtle entrance animation when the page loads
            const content = header.nextElementSibling;
            if (content && content.classList.contains('collapsible-content')) {
                // Start with a slight delay for a staggered effect
                setTimeout(() => {
                    content.style.transition = 'max-height 0.6s cubic-bezier(0.44, 0.05, 0.21, 1), opacity 0.4s ease, transform 0.4s ease';
                }, 100);
            }
        });
    }

    toggleSection(header, event) {
        const content = header.nextElementSibling;
        
        // Create a ripple effect on click
        this.createRippleEffect(header, event);
        
        if (content && content.classList.contains('collapsible-content')) {
            // Toggle the collapsed state
            header.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
            
            // Add a subtle bounce effect when expanding
            if (!content.classList.contains('collapsed')) {
                content.style.animation = 'none';
                setTimeout(() => {
                    content.style.animation = 'bounceOpen 0.5s ease forwards';
                }, 10);
            }
        }
    }
    
    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        
        // Calculate position relative to the clicked element
        const x = event ? (event.clientX - rect.left) : (rect.width / 2);
        const y = event ? (event.clientY - rect.top) : (rect.height / 2);
        
        // Style the ripple
        ripple.className = 'ripple-effect';
        
        // Set initial size
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x - size/2}px`;
        ripple.style.top = `${y - size/2}px`;
        
        // Add and then remove the ripple
        element.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Initialize all components when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new MobileMenu();
    new ProjectModal();
    new EducationModal();
    new ExperienceModal();
    new ProjectsScroll();
    new ContactForm();
    new ScrollAnimations();
    new CollapsibleSections();
}); 