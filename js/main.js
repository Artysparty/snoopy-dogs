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

            // Отключаем все стандартные поведения
            map.behaviors.disable([
                'scrollZoom',
                'dblClickZoom'
            ]);

            // Включаем только нужные поведения
            map.behaviors.enable([
                'drag',
                'multiTouch'
            ]);

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

            // Обработчик для мобильных устройств
            let isScrolling = false;
            let startY = 0;

            mapElement.addEventListener('touchstart', function(e) {
                if (e.touches.length === 2) {
                    // Если два пальца - разрешаем масштабирование
                    map.behaviors.enable('scrollZoom');
                } else if (e.touches.length === 1) {
                    // Если один палец - запоминаем начальную позицию
                    startY = e.touches[0].clientY;
                    isScrolling = false;
                }
            });

            mapElement.addEventListener('touchmove', function(e) {
                if (e.touches.length === 1) {
                    const currentY = e.touches[0].clientY;
                    const diffY = startY - currentY;
                    
                    // Если движение по вертикали больше чем по горизонтали
                    if (Math.abs(diffY) > 10 && !isScrolling) {
                        isScrolling = true;
                        // Отключаем все поведения карты для прокрутки страницы
                        map.behaviors.disable(['drag', 'scrollZoom']);
                    }
                }
            });

            mapElement.addEventListener('touchend', function() {
                // После окончания касания включаем все поведения обратно
                map.behaviors.enable(['drag', 'multiTouch']);
                map.behaviors.disable('scrollZoom');
                isScrolling = false;
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

  // Массив с услугами
  const servicesData = {
    cats: {
      title: 'Услуги для кошек',
      items: [
        { name: 'Вычесывание кошки (до часа)', price: '2300 - 2700', icon: 'brush' },
        { name: 'Вычесывание мейн-куна (до часа)', price: '2600 - 3100', icon: 'brush' },
        { name: 'Вычесывание и мытье кошки', price: '3000 - 4000', icon: 'bath' },
        { name: 'Вычесывание и мытье мейн-куна', price: '3500 - 4500', icon: 'bath' },
        { name: 'Стрижка кошки', price: '2900', icon: 'cut' },
        { name: 'Стрижка и мытье кошки', price: '3500', icon: 'cut' },
        { 
          name: 'Люкс для кошки',
          price: '4000 - 5000',
          icon: 'star',
          description: 'Полное обезжиривание шерсти, вычесывание, мытье, стрижка когтей'
        },
        { 
          name: 'Люкс для мейн-куна',
          price: '4500 - 5500',
          icon: 'star',
          description: 'Полное обезжиривание шерсти, вычесывание, мытье, стрижка когтей'
        },
        { name: 'Обезжиривание одной зоны', price: '500', icon: 'soap' },
        { name: 'Подстригание когтей', price: '400', icon: 'cut' }
      ]
    },
    trimming: {
      title: 'Тримминг',
      items: [
        { name: 'Аффен-пинчер / Грифон', price: '4000', icon: 'cut' },
        { name: 'Американский кокер спаниель', price: '5300', icon: 'cut' },
        { name: 'Английский кокер спаниель', price: '5300', icon: 'cut' },
        { name: 'Бордер терьер', price: '4600', icon: 'cut' },
        { name: 'Вельш-терьер', price: '5300', icon: 'cut' },
        { name: 'Вест хайленд уайт терьер', price: '4900', icon: 'cut' },
        { name: 'Денди Даймонд терьер', price: '4900', icon: 'cut' },
        { name: 'Джек рассел терьер', price: '4000', icon: 'cut' },
        { name: 'Ирландский терьер', price: '5800', icon: 'cut' },
        { name: 'Керн терьер', price: '4600', icon: 'cut' },
        { name: 'Лейкленд терьер', price: '5800', icon: 'cut' },
        { name: 'Миттельшнауцер', price: '5900', icon: 'cut' },
        { name: 'Норвич терьер', price: '4900', icon: 'cut' },
        { name: 'Норфолк терьер', price: '4900', icon: 'cut' },
        { name: 'Силихем терьер', price: '4900', icon: 'cut' },
        { name: 'Скотч-терьер', price: '4900', icon: 'cut' },
        { name: 'Такса стандартная 7-9 кг', price: '5400', icon: 'cut' },
        { name: 'Такса миниатюрная 4-7 кг', price: '4800', icon: 'cut' },
        { name: 'Такса кроличья до 3,5 кг', price: '4500', icon: 'cut' },
        { name: 'Фокс терьер', price: '5400', icon: 'cut' },
        { name: 'Цвергшнауцер', price: '5300', icon: 'cut' },
        { name: 'Дратхаар', price: '6500', icon: 'cut' },
        { name: 'Ирландский волкодав', price: '9500', icon: 'cut' },
        { name: 'Ризеншнауцер', price: '8000', icon: 'cut' },
        { name: 'Эрдельтерьер', price: '7000', icon: 'cut' },
        { name: 'Пшеничный терьер', price: '5600', icon: 'cut' }
      ]
    },
    large: {
      title: 'Крупные породы',
      items: [
        { name: 'Акита Ину', price: 'от 5000', icon: 'cut' },
        { name: 'Английский сеттер', price: '5100', icon: 'cut' },
        { name: 'Английский бульдог', price: '4100', icon: 'cut' },
        { name: 'Американский бульдог', price: '4500', icon: 'cut' },
        { name: 'Афганская борзая', price: '5300', icon: 'cut' },
        { name: 'Бассет-хаунд', price: '4500', icon: 'cut' },
        { name: 'Бельгийская овчарка', price: '5600 - 6600', icon: 'cut' },
        { name: 'Бернский зенненхунд', price: '7100 - 9100', icon: 'cut' },
        { name: 'Бигль', price: '3700', icon: 'cut' },
        { name: 'Бладхаунд', price: '5300', icon: 'cut' },
        { name: 'Бобтейл, Бриар', price: '6600 - 8600', icon: 'cut' },
        { name: 'Боксер', price: '4400', icon: 'cut' },
        { name: 'Бордер колли', price: '4500 - 5500', icon: 'cut' },
        { name: 'Бордосский дог', price: '5400', icon: 'cut' },
        { name: 'Бувье', price: '5600', icon: 'cut' },
        { name: 'Бультерьер', price: '3800', icon: 'cut' },
        { name: 'Бульмастиф', price: '5400', icon: 'cut' },
        { name: 'Восточно-европейская овчарка', price: '5400 - 6400', icon: 'cut' },
        { name: 'Грейхаунд', price: '4300', icon: 'cut' },
        { name: 'Далматин', price: '4100', icon: 'cut' },
        { name: 'Доберман', price: '4600', icon: 'cut' },
        { name: 'Дратхаар', price: '4600', icon: 'cut' },
        { name: 'Испанский мастиф', price: '5500', icon: 'cut' },
        { name: 'Кавказская овчарка', price: '8500', icon: 'cut' },
        { name: 'Керри-блю-терьер', price: '5400', icon: 'cut' },
        { name: 'Курцхаар', price: '4500', icon: 'cut' },
        { name: 'Лабрадор', price: '5400', icon: 'cut' },
        { name: 'Лабродудель', price: '5400', icon: 'cut' },
        { name: 'Самоед', price: '6800 - 8800', icon: 'cut' },
        { name: 'Мастино-наполетано', price: '5900', icon: 'cut' },
        { name: 'Маламут', price: '6900 - 7900', icon: 'cut' },
        { name: 'Метис (от 15 кг)', price: '5200', icon: 'cut' },
        { name: 'Немецкая овчарка', price: 'от 5600', icon: 'cut' },
        { name: 'Ньюфаундленд', price: '7900 - 10400', icon: 'cut' },
        { name: 'Ретривер', price: '5600 - 6600', icon: 'cut' },
        { name: 'Ризеншнауцер модельно', price: '5900', icon: 'cut' },
        { name: 'Тайский Риджбек', price: '4600', icon: 'cut' },
        { name: 'Ротвейлер', price: '5600', icon: 'cut' },
        { name: 'Русская борзая', price: '4900', icon: 'cut' },
        { name: 'Русский черный терьер', price: '7900 - 10400', icon: 'cut' },
        { name: 'Салюки', price: '4200', icon: 'cut' },
        { name: 'Среднеазиатская овчарка / Алабай', price: '7500 - 9500', icon: 'cut' },
        { name: 'Хаски / Лайка', price: '5400', icon: 'cut' },
        { name: 'Шарпей', price: '3900', icon: 'cut' },
        { name: 'Эрдельтерьер', price: '5500', icon: 'cut' }
      ]
    },
    medium: {
      title: 'Средние породы',
      items: [
        { name: 'Бедлингтон', price: '3900', icon: 'cut' },
        { name: 'Бесенджи', price: '3200', icon: 'cut' },
        { name: 'Вельш-корги', price: '3400', icon: 'cut' },
        { name: 'Вест хайленд уайт терьер', price: '3700', icon: 'cut' },
        { name: 'Денди Даймонд терьер', price: '3600', icon: 'cut' },
        { name: 'Джек рассел терьер', price: '3100', icon: 'cut' },
        { name: 'Кеесхонд (Немецкий вольфшпиц)', price: '4500 - 6500', icon: 'cut' },
        { name: 'Лейкленд терьер', price: '4000', icon: 'cut' },
        { name: 'Мальтипу', price: 'от 3700', icon: 'cut' },
        { name: 'Метисы (5-15 кг)', price: '3800', icon: 'cut' },
        { name: 'Миттельшнауцер', price: '4500', icon: 'cut' },
        { name: 'Миниатюрный пудель', price: '4000', icon: 'cut' },
        { name: 'Малый пудель', price: '4400', icon: 'cut' },
        { name: 'Русский спаниель', price: '3900', icon: 'cut' },
        { name: 'Сиба Ину', price: '3400', icon: 'cut' },
        { name: 'Силихем терьер', price: '3900', icon: 'cut' },
        { name: 'Скай терьер', price: '3900', icon: 'cut' },
        { name: 'Спаниель Кавалер Кинг Чарльз', price: '3300', icon: 'cut' },
        { name: 'Спрингер спаниель', price: '3400', icon: 'cut' },
        { name: 'Тибетский терьер', price: '3800', icon: 'cut' },
        { name: 'Французский бульдог', price: '3100', icon: 'cut' },
        { name: 'Цвергшнауцер', price: '3800', icon: 'cut' },
        { name: 'Шелти', price: '4400 - 5400', icon: 'cut' }
      ]
    },
    decorative: {
      title: 'Декоративные породы',
      items: [
        { name: 'Аффен-пинчер / Грифон', price: '3000', icon: 'cut' },
        { name: 'Бишон Фризе', price: '4100', icon: 'cut' },
        { name: 'Болоньез', price: '3000', icon: 'cut' },
        { name: 'Бивер-йорк', price: '3000', icon: 'cut' },
        { name: 'Йоркширский терьер', price: '3000', icon: 'cut' },
        { name: 'Китайская хохлатая голая', price: '2800', icon: 'cut' },
        { name: 'Китайская хохлатая пуховка', price: '3200', icon: 'cut' },
        { name: 'Лхасский апсо', price: '3700', icon: 'cut' },
        { name: 'Мальтийская болонка', price: '3200', icon: 'cut' },
        { name: 'Метис до 5 кг', price: '3000', icon: 'cut' },
        { name: 'Метис больше 5 кг', price: '3800', icon: 'cut' },
        { name: 'Московский дракон', price: '2700', icon: 'cut' },
        { name: 'Мопс', price: '2600', icon: 'cut' },
        { name: 'Папильон', price: '2900', icon: 'cut' },
        { name: 'Пекинес', price: '3200', icon: 'cut' },
        { name: 'Пти-брабансон', price: '2700', icon: 'cut' },
        { name: 'Русская цветная болонка', price: '3200', icon: 'cut' },
        { name: 'Той-пудель', price: '3400', icon: 'cut' },
        { name: 'Той-терьер', price: '2500', icon: 'cut' },
        { name: 'Чихуа-хуа гладкошерстный', price: '2500', icon: 'cut' },
        { name: 'Чихуа-хуа длинношерстный', price: '2700', icon: 'cut' },
        { name: 'Ши-тцу', price: '3500', icon: 'cut' },
        { name: 'Шпиц померанский (до 22 см)', price: '3100', icon: 'cut' },
        { name: 'Шпиц малый (от 23 до 29 см)', price: '3400', icon: 'cut' },
        { name: 'Шпиц средний (свыше 30 см)', price: '3600', icon: 'cut' },
        { name: 'Японский хин', price: '2900', icon: 'cut' }
      ]
    }
  };

  // Функция для создания HTML элемента услуги
  function createServiceItem(item) {
    return `
      <li class="service-item">
        <div class="service-name">
          <i class="fas fa-${item.icon}"></i>
          <span>${item.name}</span>
        </div>
        ${item.description ? `<div class="service-description">${item.description}</div>` : ''}
        <div class="service-price">${item.price} ₽</div>
        <a href="contacts.html" class="btn btn-sm">Записаться</a>
      </li>
    `;
  }

  // Функция для отображения услуг
  function renderServices(category = 'all') {
    const servicesList = document.querySelector('.services-list');
    if (!servicesList) return;
    
    servicesList.innerHTML = '';
    
    const categories = category === 'all' ? Object.keys(servicesData).reverse() : [category];
    
    categories.forEach(cat => {
      if (servicesData[cat]) {
        const categoryHtml = `
          <div class="service-category show" data-category="${cat}">
            <h3 class="category-title">${servicesData[cat].title}</h3>
            <ul class="service-items">
              ${servicesData[cat].items.map(item => createServiceItem(item)).join('')}
            </ul>
          </div>
        `;
        servicesList.innerHTML += categoryHtml;
      }
    });
  }

  // Функция поиска
  function searchServices(query) {
    const searchQuery = query.toLowerCase().trim();
    const servicesList = document.querySelector('.services-list');
    const noResults = document.getElementById('no-results');
    let found = false;

    Object.keys(servicesData).forEach(category => {
      const categoryElement = servicesList.querySelector(`[data-category="${category}"]`);
      if (!categoryElement) return;

      const items = categoryElement.querySelectorAll('.service-item');
      let categoryHasVisibleItems = false;

      items.forEach(item => {
        const name = item.querySelector('.service-name span').textContent.toLowerCase();
        // Разбиваем название породы на слова
        const words = name.split(' ');
        // Проверяем, начинается ли хотя бы одно слово с введенного запроса
        const matches = words.some(word => word.startsWith(searchQuery));
        
        if (matches) {
          item.style.display = '';
          categoryHasVisibleItems = true;
          found = true;
        } else {
          item.style.display = 'none';
        }
      });

      if (categoryHasVisibleItems) {
        categoryElement.classList.add('show');
        categoryElement.classList.remove('hidden');
      } else {
        categoryElement.classList.remove('show');
        categoryElement.classList.add('hidden');
      }
    });

    noResults.style.display = found ? 'none' : 'block';
  }

  // Инициализация сервисов
  function initServices() {
    // Рендерим все услуги при загрузке
    renderServices();

    // Обработчик для фильтров категорий
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchContainer = document.querySelector('.search-container');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const category = e.target.dataset.category;
        
        renderServices(category);
        document.getElementById('breed-search').value = '';
        document.getElementById('no-results').style.display = 'none';
      });
    });

    // Поле поиска всегда видимо
    searchContainer.style.display = 'block';

    // Обработчик поиска
    const searchInput = document.getElementById('breed-search');
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const query = e.target.value;
        if (query) {
          // Показываем все категории перед поиском
          renderServices();
          searchServices(query);
        } else {
          // Если поле поиска пустое, показываем текущую активную категорию
          const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
          renderServices(activeCategory);
          document.getElementById('no-results').style.display = 'none';
        }
      }, 300);
    });
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
  initServices(); // Добавляем инициализацию сервисов

  // Добавляем обработчик изменения размера окна
  window.addEventListener('resize', initWelcomeIcons);
});
