// Ждем пока загрузится страница
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            // Блокируем прокрутку страницы при открытом меню
            document.body.classList.toggle('menu-open');
        });
        
        // Закрытие меню при клике на затемнение
        menuOverlay.addEventListener('click', function() {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
    
    // Плавный скролл к якорям
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
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
    
    // Анимация появления элементов при скролле
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
    
    // Обработка формы бронирования
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(this);
            let formEntries = {};
            
            formData.forEach((value, key) => {
                formEntries[key] = value;
            });
            
            // Анимация успешной отправки формы
            bookingForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Спасибо за вашу заявку!</h3>
                    <p>Мы свяжемся с вами в ближайшее время для подтверждения записи.</p>
                </div>
            `;
            
            // В реальном проекте здесь будет отправка данных на сервер
            console.log('Форма отправлена:', formEntries);
        });
    }
    
    // Анимация для хедера при скролле
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
    
    // Анимированный счетчик для секции "О нас" (можно добавить позже)
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
    
    // Пример анимированных цифр, которые можно добавить в секцию "О нас"
    /*
    const counters = document.querySelectorAll('.counter-number');
    
    function startCounters() {
        counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-count'));
            createCounter(counter, targetValue, 2000);
        });
    }
    
    // Запустить счетчики, когда секция в поле зрения
    const aboutSection = document.querySelector('.about');
    
    function checkAboutSection() {
        if (isElementInViewport(aboutSection) && !aboutSection.classList.contains('counted')) {
            aboutSection.classList.add('counted');
            startCounters();
        }
    }
    
    window.addEventListener('scroll', checkAboutSection);
    checkAboutSection(); // Проверка при загрузке
    */
    
    // Галерея с легким эффектом параллакса
    const galleryItems = document.querySelectorAll('.gallery-item');
    
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
            
            this.querySelector('.gallery-image').style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
        
        // Возвращаем в исходное положение при снятии мыши
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-image').style.transform = 'translateX(0) translateY(0)';
        });
    });
    
    // Инициализация Яндекс карты
    function initYandexMap() {
        // Проверяем, загружен ли API Яндекс.Карт
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(function() {
                // Координаты салона (замените на реальные координаты)
                const salonCoordinates = [55.942219, 37.870212]; // Москва, центр (пример)
                
                // Создаем карту
                const map = new ymaps.Map('map', {
                    center: salonCoordinates,
                    zoom: 16,
                    controls: ['zoomControl', 'geolocationControl']
                });
                
                // Создаем метку на карте
                const placemark = new ymaps.Placemark(salonCoordinates, {
                    hintContent: 'Snoopy Dogs',
                    balloonContent: `
                        <div class="map-balloon">
                            <h3>Салон груминга "Snoopy Dogs"</h3>
                            <p>ул. Пушистая, д. 15, г. Москва</p>
                            <p>Телефон: +7 (999) 123-45-67</p>
                            <p>Режим работы:<br>
                            Пн-Пт: 10:00 - 20:00<br>
                            Сб-Вс: 10:00 - 18:00</p>
                        </div>
                    `
                }, {
                    // Опции метки
                    preset: 'islands#redDogIcon', // Иконка собаки красного цвета
                    iconColor: '#e85a4f' // Обновляем цвет иконки на коралловый/терракотовый
                });
                
                // Добавляем метку на карту
                map.geoObjects.add(placemark);
                
                // Отключаем скролл карты при скролле страницы
                map.behaviors.disable('scrollZoom');
                
                // Включаем скролл карты при наведении на нее
                const mapElement = document.getElementById('map');
                
                mapElement.addEventListener('mouseenter', function() {
                    map.behaviors.enable('scrollZoom');
                });
                
                mapElement.addEventListener('mouseleave', function() {
                    map.behaviors.disable('scrollZoom');
                });
                
                // Делаем карту адаптивной при изменении размера окна
                window.addEventListener('resize', function() {
                    map.container.fitToViewport();
                });
            });
        }
    }
    
    // Запускаем инициализацию карты
    initYandexMap();
}); 