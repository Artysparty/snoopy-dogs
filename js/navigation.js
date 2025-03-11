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
    const nav = document.querySelector('.main-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuBtn && nav && menuOverlay) {
        // Добавляем обработчик для анимации кнопки меню
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            this.classList.toggle('active');
            nav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Закрываем меню при клике на оверлей
        menuOverlay.addEventListener('click', function() {
            closeMenu();
        });
        
        // Закрываем меню при клике вне навигации
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Закрытие мобильного меню при клике на ссылку
        const menuLinks = nav.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
    }
}

/**
 * Закрытие мобильного меню
 */
function closeMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.main-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuBtn && nav && menuOverlay) {
        menuBtn.classList.remove('active');
        nav.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

/**
 * Выделение активного пункта меню
 */
function highlightActiveMenuItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    
    // Удаляем класс active у всех ссылок
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Определяем текущую страницу
    let currentPage = currentPath.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Для главной страницы
        if ((currentPage === '' || currentPage === 'index.html') && 
            (href === 'index.html' || href === '/' || href === '')) {
            link.classList.add('active');
        }
        // Для остальных страниц
        else if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Инициализация плавного скролла к якорям
 */
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('header');
    
    if (!scrollLinks.length || !nav || !header) return;
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Закрываем мобильное меню при клике на ссылку
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.querySelector('.menu-btn').classList.remove('active');
                document.querySelector('.menu-overlay').classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            const targetId = this.getAttribute('href');
            
            // Если это якорь, а не просто #
            if (targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
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
    if (!header) return;
    
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