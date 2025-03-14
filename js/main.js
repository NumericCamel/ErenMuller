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
        this.initProjectButtons();
    }

    initProjectButtons() {
        document.querySelectorAll('.view-project').forEach(button => {
            button.addEventListener('click', () => this.showProject(button));
        });
    }

    showProject(button) {
        const data = button.dataset;
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
        document.querySelectorAll('.education-item.clickable').forEach(item => {
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    new ProjectModal();
    new EducationModal();
    new ExperienceModal();
    new ProjectsScroll();
    new ContactForm();
    new ScrollAnimations();
}); 