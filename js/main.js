document.addEventListener("DOMContentLoaded", function () {
  // Header
  const header = document.querySelector(".header");
  const welcomeSection = document.querySelector(".welcome-section");
  const burger = document.querySelector(".header-burger");
  const nav = document.querySelector(".header-nav");
  const overlay = document.querySelector(".menu-overlay");

  // Плавное появление header при скролле
  function handleScroll() {
    if (welcomeSection) {
      const welcomeSectionTop = welcomeSection.getBoundingClientRect().top;
      if (welcomeSectionTop <= 0) {
        header.classList.add("visible");
      } else {
        header.classList.remove("visible");
      }
    }
  }

  // Запускаем handleScroll сразу и при скролле
  handleScroll();
  window.addEventListener("scroll", handleScroll);

  // Бургер-меню
  if (burger && nav && overlay) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("active");
      nav.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = burger.classList.contains("active")
        ? "hidden"
        : "";
    });

    overlay.addEventListener("click", function () {
      burger.classList.remove("active");
      nav.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        burger.classList.remove("active");
        nav.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // Навигация
  function initMobileMenu() {
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".main-nav");
    const menuOverlay = document.querySelector(".menu-overlay");

    if (menuBtn && nav && menuOverlay) {
      menuBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("active");
        nav.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        document.body.classList.toggle("menu-open");
      });

      menuOverlay.addEventListener("click", function () {
        closeMenu();
      });

      document.addEventListener("click", function (e) {
        if (
          nav.classList.contains("active") &&
          !nav.contains(e.target) &&
          !menuBtn.contains(e.target)
        ) {
          closeMenu();
        }
      });

      const menuLinks = nav.querySelectorAll("a");
      menuLinks.forEach((link) => {
        link.addEventListener("click", function () {
          closeMenu();
        });
      });
    }
  }

  function closeMenu() {
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".main-nav");
    const menuOverlay = document.querySelector(".menu-overlay");

    if (menuBtn && nav && menuOverlay) {
      menuBtn.classList.remove("active");
      nav.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  }

  function highlightActiveMenuItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".main-nav ul li a");

    navLinks.forEach((link) => link.classList.remove("active"));

    let currentPage = currentPath.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (
        (currentPage === "" || currentPage === "index.html") &&
        (href === "index.html" || href === "/" || href === "")
      ) {
        link.classList.add("active");
      } else if (href === currentPage) {
        link.classList.add("active");
      }
    });
  }

  function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const nav = document.querySelector(".main-nav");
    const header = document.querySelector("header");

    if (!scrollLinks.length || !nav || !header) return;

    scrollLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          document.querySelector(".menu-btn").classList.remove("active");
          document.querySelector(".menu-overlay").classList.remove("active");
          document.body.classList.remove("menu-open");
        }

        const targetId = this.getAttribute("href");

        if (targetId !== "#") {
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition =
              targetElement.getBoundingClientRect().top +
              window.pageYOffset -
              headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }

  // Анимации
  function initScrollAnimations() {
    const animateElements = document.querySelectorAll(".animate-on-scroll");

    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.85
      );
    }

    function handleScrollAnimation() {
      animateElements.forEach((element) => {
        if (
          isElementInViewport(element) &&
          !element.classList.contains("appear")
        ) {
          element.classList.add("appear");
        }
      });
    }

    handleScrollAnimation();
    window.addEventListener("scroll", handleScrollAnimation);
  }

  function initParallaxGallery() {
    const galleryItems = document.querySelectorAll(
      ".gallery-item, .portfolio-item"
    );

    galleryItems.forEach((item) => {
      item.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        const moveX = (50 - xPercent) / 20;
        const moveY = (50 - yPercent) / 20;

        const imageElement =
          this.querySelector(".gallery-image") ||
          this.querySelector(".portfolio-image");
        if (imageElement) {
          imageElement.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }
      });

      item.addEventListener("mouseleave", function () {
        const imageElement =
          this.querySelector(".gallery-image") ||
          this.querySelector(".portfolio-image");
        if (imageElement) {
          imageElement.style.transform = "translateX(0) translateY(0)";
        }
      });
    });
  }

  // Формы
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить отправку формы на сервер
            // Для примера просто показываем сообщение об успехе
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Очищаем форму
            contactForm.reset();
            
            // Через 5 секунд возвращаем форму
            setTimeout(() => {
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }
  }

  function initYandexMap() {
    if (document.getElementById('map')) {
        ymaps.ready(function () {
            const map = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 12,
                controls: ['zoomControl', 'fullscreenControl']
            }, {
                suppressMapOpenBlock: true,
                suppressObsoleteBrowserNotifier: true
            });

            // Отключаем стандартное поведение скролла
            map.behaviors.disable('scrollZoom');
            
            // Включаем скролл только по двойному тапу
            map.behaviors.enable('multiTouch');

            const placemark = new ymaps.Placemark([55.76, 37.64], {
                balloonContent: 'Адрес салона'
            }, {
                preset: 'islands#violetIcon'
            });

            map.geoObjects.add(placemark);

            // Обработчик для включения/отключения скролла при наведении
            const mapElement = document.getElementById('map');
            mapElement.addEventListener('mouseenter', function() {
                map.behaviors.enable('scrollZoom');
            });
            
            mapElement.addEventListener('mouseleave', function() {
                map.behaviors.disable('scrollZoom');
            });
        });
    }
  }

  // Инициализация предупреждений в карточках
  function initTipWarnings() {
    const warningIcons = document.querySelectorAll('.tip-warning-icon');
    let activeWarning = null;

    warningIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const warningText = icon.nextElementSibling;
        
        // Если есть активное предупреждение и оно не текущее - скрываем его
        if (activeWarning && activeWarning !== warningText) {
          activeWarning.classList.remove('active');
        }
        
        // Переключаем текущее предупреждение
        warningText.classList.toggle('active');
        activeWarning = warningText.classList.contains('active') ? warningText : null;
      });
    });

    // Закрываем предупреждение при клике вне его
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.tip-warning-text') && !e.target.closest('.tip-warning-icon') && activeWarning) {
        activeWarning.classList.remove('active');
        activeWarning = null;
      }
    });
  }

  function initWelcomeIcons() {
    const container = document.querySelector('.welcome-icons-container');
    if (!container) return;

    const icons = ['fa-paw', 'fa-soap', 'fa-cut'];
    const isMobile = window.innerWidth <= 768;
    const numIcons = isMobile ? 20 : 35; // Меняем количество иконок в зависимости от размера экрана
    const minDistance = isMobile ? 50 : 75; // Уменьшаем минимальное расстояние для мобильных устройств
    const placedIcons = [];

    function isValidPosition(x, y) {
        return placedIcons.every(icon => {
            const distance = Math.sqrt(
                Math.pow(x - icon.x, 2) + Math.pow(y - icon.y, 2)
            );
            return distance >= minDistance;
        });
    }

    function getRandomPosition() {
        const padding = isMobile ? 30 : 40; // Уменьшаем отступ от краев для мобильных устройств
        const containerRect = container.getBoundingClientRect();
        let x, y;
        let attempts = 0;
        const maxAttempts = 50;

        do {
            x = padding + Math.random() * (containerRect.width - 2 * padding);
            y = padding + Math.random() * (containerRect.height - 2 * padding);
            attempts++;
        } while (!isValidPosition(x, y) && attempts < maxAttempts);

        return attempts < maxAttempts ? { x, y } : null;
    }

    // Очищаем контейнер перед добавлением новых иконок
    container.innerHTML = '';

    for (let i = 0; i < numIcons; i++) {
        const position = getRandomPosition();
        if (!position) continue;

        const icon = document.createElement('i');
        icon.className = `fas ${icons[i % icons.length]}`;
        
        const rotation = Math.random() * 360;
        const scale = 0.8 + Math.random() * 0.4;
        
        icon.style.left = `${(position.x / container.offsetWidth) * 100}%`;
        icon.style.top = `${(position.y / container.offsetHeight) * 100}%`;
        icon.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        
        container.appendChild(icon);
        placedIcons.push(position);
    }
  }

  // Инициализация всех функций
  initMobileMenu();
  highlightActiveMenuItem();
  initSmoothScroll();
  initScrollAnimations();
  initParallaxGallery();
  initContactForm();
  initYandexMap();
  initTipWarnings();
  initWelcomeIcons();

  // Добавляем обработчик изменения размера окна
  window.addEventListener('resize', initWelcomeIcons);
});
