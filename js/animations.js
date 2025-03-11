/**
 * Модуль для анимаций и эффектов
 */

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов при скролле
    initScrollAnimations();
    
    // Галерея с эффектом параллакса
    initParallaxGallery();
    
    // Анимированные счетчики (если нужны)
    // initCounters();
});

/**
 * Анимация появления элементов при скролле
 */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Функция для проверки видимости элемента в области просмотра
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Функция для обработки анимации
    function handleScrollAnimation() {
        animateElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('appear')) {
                element.classList.add('appear');
            }
        });
    }
    
    // Запускаем один раз при загрузке
    handleScrollAnimation();
    
    // Запускаем при скролле
    window.addEventListener('scroll', handleScrollAnimation);
}

/**
 * Галерея с эффектом параллакса
 */
function initParallaxGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item, .portfolio-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Перемещаем фон в зависимости от положения мыши
            const xPercent = x / rect.width * 100;
            const yPercent = y / rect.height * 100;
            
            // Ограничиваем движение для более тонкого эффекта
            const moveX = (50 - xPercent) / 20;
            const moveY = (50 - yPercent) / 20;
            
            const imageElement = this.querySelector('.gallery-image') || this.querySelector('.portfolio-image');
            if (imageElement) {
                imageElement.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
            }
        });
        
        // Возвращаем в исходное положение при снятии мыши
        item.addEventListener('mouseleave', function() {
            const imageElement = this.querySelector('.gallery-image') || this.querySelector('.portfolio-image');
            if (imageElement) {
                imageElement.style.transform = 'translateX(0) translateY(0)';
            }
        });
    });
}

/**
 * Анимированные счетчики
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    function createCounter(element, targetValue, duration) {
        let startTime = null;
        const startValue = 0;
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(progress * (targetValue - startValue) + startValue);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = targetValue;
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    function startCounters() {
        counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-count'));
            createCounter(counter, targetValue, 2000);
        });
    }
    
    // Запустить счетчики, когда секция в поле зрения
    const aboutSection = document.querySelector('.about-page');
    
    function checkAboutSection() {
        if (aboutSection && isElementInViewport(aboutSection) && !aboutSection.classList.contains('counted')) {
            aboutSection.classList.add('counted');
            startCounters();
        }
    }
    
    // Функция для проверки видимости элемента в области просмотра
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    window.addEventListener('scroll', checkAboutSection);
    checkAboutSection(); // Проверка при загрузке
} 