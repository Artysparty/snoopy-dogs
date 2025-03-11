/**
 * Модуль для работы с навигацией и мобильным меню
 */

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    initMobileMenu();
    
    // Выделение активного пункта меню
    highlightActiveMenuItem();
    
    // Плавный скролл к якорям
    initSmoothScroll();
    
    // Анимация для хедера при скролле
    initHeaderAnimation();
});

/**
 * Инициализация мобильного меню
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        menuOverlay.addEventListener('click', function() {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
    
    // Закрытие мобильного меню при клике на ссылку
    const menuLinks = document.querySelectorAll('nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
}

/**
 * Выделение активного пункта меню
 */
function highlightActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Инициализация плавного скролла к якорям
 */
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const nav = document.querySelector('nav');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Закрываем мобильное меню при клике на ссылку
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            
            // Если это якорь, а не просто #
            if (targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Анимация для хедера при скролле
 */
function initHeaderAnimation() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Добавляем тень и уменьшаем хедер при скролле вниз
        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            header.style.padding = '';
        }
        
        lastScrollTop = scrollTop;
    });
} 