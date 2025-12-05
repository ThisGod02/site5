// Основной JavaScript для веб-сайта АвтоДоктор

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Переключение темы (для главной страницы)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            if (currentTheme === 'light') {
                window.location.href = 'index-dark.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }
    
    // Слайдер отзывов
    initSlider();
    
    // Валидация форм
    initFormValidation();
});

// Слайдер отзывов
function initSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const indicators = slider.querySelectorAll('.slider-indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        
        if (indicators.length > 0) {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Автопрокрутка
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
    
    // Показываем первый слайд
    showSlide(0);
}

// Валидация форм
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
    });
    
    // Валидация телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                this.setCustomValidity('');
            }
        });
    });
    
    // Валидация email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !this.validity.valid) {
                this.setCustomValidity('Введите корректный email адрес');
            } else {
                this.setCustomValidity('');
            }
        });
    });
}

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

