// ЖДЕМ ПОЛНОЙ ЗАГРУЗКИ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. МОБИЛЬНОЕ МЕНЮ =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        console.log('Меню найдено, инициализация...');
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            navMenu.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && (href.startsWith('http') || href.startsWith('#'))) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    if (menuToggle) {
                        menuToggle.querySelector('i').className = 'fas fa-bars';
                    }
                }
            });
        });
        
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!navMenu.contains(e.target) && 
                    !menuToggle.contains(e.target) &&
                    navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                }
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                menuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
    
    // ===== 2. ГАЛЕРЕИ =====
    function initGalleries() {
        const galleries = document.querySelectorAll('.gallery-container');
        
        galleries.forEach(gallery => {
            const images = gallery.querySelectorAll('.gallery-image');
            const buttons = gallery.querySelectorAll('.gallery-btn');
            
            if (images.length === 0 || buttons.length === 0) return;
            
            images.forEach(img => img.classList.remove('active'));
            buttons.forEach(btn => btn.classList.remove('active'));
            if (images[0]) images[0].classList.add('active');
            if (buttons[0]) buttons[0].classList.add('active');
            
            buttons.forEach((button, index) => {
                button.replaceWith(button.cloneNode(true));
            });
            
            const freshButtons = gallery.querySelectorAll('.gallery-btn');
            
            freshButtons.forEach((button, index) => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const parentGallery = this.closest('.gallery-container');
                    const parentImages = parentGallery.querySelectorAll('.gallery-image');
                    const parentButtons = parentGallery.querySelectorAll('.gallery-btn');
                    
                    parentImages.forEach(img => img.classList.remove('active'));
                    parentButtons.forEach(btn => btn.classList.remove('active'));
                    
                    if (parentImages[index]) parentImages[index].classList.add('active');
                    this.classList.add('active');
                });
            });
        });
    }
    
    initGalleries();
    
    // ===== 3. ПЛАВНАЯ ПРОКРУТКА =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                if (window.innerWidth <= 768 && navMenu) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    if (menuToggle) {
                        menuToggle.querySelector('i').className = 'fas fa-bars';
                    }
                }
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
// ===== ЗАЩИТА ОТ ПРОСМОТРА КОДА =====
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
    if (e.key === 'F12') e.preventDefault();
    if (e.ctrlKey && e.key.toLowerCase() === 'u') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') e.preventDefault();
});

    
    // ===== 5. КНОПКА "ГЛАВНАЯ" В ФУТЕРЕ =====
    const footerHomeLink = document.querySelector('.footer-links a[href="#"]');
    if (footerHomeLink) {
        footerHomeLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        });
    }
    
});
