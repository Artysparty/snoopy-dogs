document.addEventListener("DOMContentLoaded", () => {
  const formHandler = new FormHandler();

  // Обработка видео на главном экране
  function handleVideoFallback() {
    const desktopVideo = document.querySelector('.video-desktop');
    const mobileVideo = document.querySelector('.video-mobile');
    const fallbackImage = document.querySelector('.video-fallback');
    
    if (!desktopVideo && !mobileVideo && !fallbackImage) return;
    
    // Функция для проверки доступности видеофайла
    function checkVideoFile(videoElement, onError) {
      if (!videoElement) return;
      
      const source = videoElement.querySelector('source');
      if (!source || !source.src) {
        console.error('Video source not found');
        onError();
        return;
      }
      
      // Проверяем наличие файла
      fetch(source.src)
        .then(response => {
          if (!response.ok) {
            console.error(`Video file ${source.src} not found or not accessible`);
            onError();
          } else {
            console.log(`Video file ${source.src} is accessible`);
          }
        })
        .catch(error => {
          console.error(`Error checking video file ${source.src}:`, error);
          onError();
        });
      
      // Также добавляем обработчики событий для видео
      videoElement.addEventListener('error', () => {
        console.error(`Error loading video: ${source.src}`);
        onError();
      });
      
      videoElement.addEventListener('loadeddata', () => {
        console.log(`Video loaded successfully: ${source.src}`);
      });
    }
    
    // Определяем, какое видео использовать в зависимости от размера экрана
    function selectAppropriateVideo() {
      const isMobile = window.innerWidth <= 768;
      
      // Скрываем оба видео по умолчанию
      if (desktopVideo) desktopVideo.style.display = 'none';
      if (mobileVideo) mobileVideo.style.display = 'none';
      
      if (isMobile) {
        if (mobileVideo) {
          console.log('Using mobile video');
          mobileVideo.style.display = 'block';
          
          // Проверяем доступность видео
          checkVideoFile(mobileVideo, () => {
            mobileVideo.style.display = 'none';
            
            // Если мобильное видео недоступно, пробуем десктопное как запасной вариант
            if (desktopVideo) {
              desktopVideo.style.display = 'block';
              checkVideoFile(desktopVideo, () => {
                desktopVideo.style.display = 'none';
                if (fallbackImage) fallbackImage.style.display = 'block';
              });
            } else if (fallbackImage) {
              fallbackImage.style.display = 'block';
            }
          });
        } else if (desktopVideo) {
          // Если нет мобильного видео, пробуем десктопное
          console.log('Mobile video not available, using desktop video');
          desktopVideo.style.display = 'block';
          
          checkVideoFile(desktopVideo, () => {
            desktopVideo.style.display = 'none';
            if (fallbackImage) fallbackImage.style.display = 'block';
          });
        } else if (fallbackImage) {
          fallbackImage.style.display = 'block';
        }
      } else {
        // Десктопная версия
        if (desktopVideo) {
          console.log('Using desktop video');
          desktopVideo.style.display = 'block';
          
          checkVideoFile(desktopVideo, () => {
            desktopVideo.style.display = 'none';
            
            // Если десктопное видео недоступно, пробуем мобильное как запасной вариант
            if (mobileVideo) {
              mobileVideo.style.display = 'block';
              checkVideoFile(mobileVideo, () => {
                mobileVideo.style.display = 'none';
                if (fallbackImage) fallbackImage.style.display = 'block';
              });
            } else if (fallbackImage) {
              fallbackImage.style.display = 'block';
            }
          });
        } else if (mobileVideo) {
          // Если нет десктопного видео, пробуем мобильное
          console.log('Desktop video not available, using mobile video');
          mobileVideo.style.display = 'block';
          
          checkVideoFile(mobileVideo, () => {
            mobileVideo.style.display = 'none';
            if (fallbackImage) fallbackImage.style.display = 'block';
          });
        } else if (fallbackImage) {
          fallbackImage.style.display = 'block';
        }
      }
    }
    
    // Вызываем функцию выбора видео при загрузке
    selectAppropriateVideo();
    
    // Обновляем выбор видео при изменении размера окна
    window.addEventListener('resize', selectAppropriateVideo);
  }

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

  function initYandexMap() {
    if (document.getElementById("map")) {
      ymaps.ready(function () {
        const map = new ymaps.Map(
          "map",
          {
            center: [55.942219, 37.870212],
            zoom: 12,
            controls: ["zoomControl", "fullscreenControl"],
          },
          {
            suppressMapOpenBlock: true,
            suppressObsoleteBrowserNotifier: true,
          }
        );

        // Отключаем все стандартные поведения
        map.behaviors.disable(["scrollZoom", "dblClickZoom"]);

        // Включаем только нужные поведения
        map.behaviors.enable(["drag", "multiTouch"]);

        const placemark = new ymaps.Placemark(
          [55.942219, 37.870212],
          {
            balloonContent: "Адрес салона",
          },
          {
            preset: "islands#violetIcon",
          }
        );

        map.geoObjects.add(placemark);

        // Обработчик для включения/отключения скролла при наведении
        const mapElement = document.getElementById("map");
        mapElement.addEventListener("mouseenter", function () {
          map.behaviors.enable("scrollZoom");
        });

        mapElement.addEventListener("mouseleave", function () {
          map.behaviors.disable("scrollZoom");
        });

        // Обработчик для мобильных устройств
        let isScrolling = false;
        let startY = 0;

        mapElement.addEventListener("touchstart", function (e) {
          if (e.touches.length === 2) {
            // Если два пальца - разрешаем масштабирование
            map.behaviors.enable("scrollZoom");
          } else if (e.touches.length === 1) {
            // Если один палец - запоминаем начальную позицию
            startY = e.touches[0].clientY;
            isScrolling = false;
          }
        });

        mapElement.addEventListener("touchmove", function (e) {
          if (e.touches.length === 1) {
            const currentY = e.touches[0].clientY;
            const diffY = startY - currentY;

            // Если движение по вертикали больше чем по горизонтали
            if (Math.abs(diffY) > 10 && !isScrolling) {
              isScrolling = true;
              // Отключаем все поведения карты для прокрутки страницы
              map.behaviors.disable(["drag", "scrollZoom"]);
            }
          }
        });

        mapElement.addEventListener("touchend", function () {
          // После окончания касания включаем все поведения обратно
          map.behaviors.enable(["drag", "multiTouch"]);
          map.behaviors.disable("scrollZoom");
          isScrolling = false;
        });
      });
    }
  }

  function initWelcomeIcons() {
    const container = document.querySelector(".welcome-icons-container");
    if (!container) return;

    const icons = ["fa-paw", "fa-soap", "fa-cut"];
    const isMobile = window.innerWidth <= 768;
    const numIcons = isMobile ? 20 : 35; // Меняем количество иконок в зависимости от размера экрана
    const minDistance = isMobile ? 50 : 75; // Уменьшаем минимальное расстояние для мобильных устройств
    const placedIcons = [];

    function isValidPosition(x, y) {
      return placedIcons.every((icon) => {
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
    container.innerHTML = "";

    for (let i = 0; i < numIcons; i++) {
      const position = getRandomPosition();
      if (!position) continue;

      const icon = document.createElement("i");
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

  const servicesData = {
    cats: {
      title: "Услуги для кошек",
      items: [
        {
          name: "Вычесывание кошки (до часа)",
          price: "2300 - 2700",
          icon: "brush",
        },
        {
          name: "Вычесывание мейн-куна (до часа)",
          price: "2600 - 3100",
          icon: "brush",
        },
        {
          name: "Вычесывание и мытье кошки",
          price: "3000 - 4000",
          icon: "bath",
        },
        {
          name: "Вычесывание и мытье мейн-куна",
          price: "3500 - 4500",
          icon: "bath",
        },
        { name: "Стрижка кошки", price: "2900", icon: "cut" },
        { name: "Стрижка и мытье кошки", price: "3500", icon: "cut" },
        {
          name: "Люкс для кошки",
          price: "4000 - 5000",
          icon: "star",
          description:
            "Полное обезжиривание шерсти, вычесывание, мытье, стрижка когтей",
        },
        {
          name: "Люкс для мейн-куна",
          price: "4500 - 5500",
          icon: "star",
          description:
            "Полное обезжиривание шерсти, вычесывание, мытье, стрижка когтей",
        },
        { name: "Обезжиривание одной зоны", price: "500", icon: "soap" },
        { name: "Подстригание когтей", price: "400", icon: "cut" },
      ],
    },
    trimming: {
      title: "Тримминг",
      items: [
        { name: "Аффен-пинчер / Грифон", price: "4000", icon: "cut" },
        { name: "Американский кокер спаниель", price: "5300", icon: "cut" },
        { name: "Английский кокер спаниель", price: "5300", icon: "cut" },
        { name: "Бордер терьер", price: "4600", icon: "cut" },
        { name: "Вельш-терьер", price: "5300", icon: "cut" },
        { name: "Вест хайленд уайт терьер", price: "4900", icon: "cut" },
        { name: "Денди Даймонд терьер", price: "4900", icon: "cut" },
        { name: "Джек рассел терьер", price: "4000", icon: "cut" },
        { name: "Ирландский терьер", price: "5800", icon: "cut" },
        { name: "Керн терьер", price: "4600", icon: "cut" },
        { name: "Лейкленд терьер", price: "5800", icon: "cut" },
        { name: "Миттельшнауцер", price: "5900", icon: "cut" },
        { name: "Норвич терьер", price: "4900", icon: "cut" },
        { name: "Норфолк терьер", price: "4900", icon: "cut" },
        { name: "Силихем терьер", price: "4900", icon: "cut" },
        { name: "Скотч-терьер", price: "4900", icon: "cut" },
        { name: "Такса стандартная 7-9 кг", price: "5400", icon: "cut" },
        { name: "Такса миниатюрная 4-7 кг", price: "4800", icon: "cut" },
        { name: "Такса кроличья до 3,5 кг", price: "4500", icon: "cut" },
        { name: "Фокс терьер", price: "5400", icon: "cut" },
        { name: "Цвергшнауцер", price: "5300", icon: "cut" },
        { name: "Дратхаар", price: "6500", icon: "cut" },
        { name: "Ирландский волкодав", price: "9500", icon: "cut" },
        { name: "Ризеншнауцер", price: "8000", icon: "cut" },
        { name: "Эрдельтерьер", price: "7000", icon: "cut" },
        { name: "Пшеничный терьер", price: "5600", icon: "cut" },
      ],
    },
    large: {
      title: "Крупные породы",
      items: [
        { name: "Акита Ину", price: "от 5000", icon: "cut" },
        { name: "Английский сеттер", price: "5100", icon: "cut" },
        { name: "Английский бульдог", price: "4100", icon: "cut" },
        { name: "Американский бульдог", price: "4500", icon: "cut" },
        { name: "Афганская борзая", price: "5300", icon: "cut" },
        { name: "Бассет-хаунд", price: "4500", icon: "cut" },
        { name: "Бельгийская овчарка", price: "5600 - 6600", icon: "cut" },
        { name: "Бернский зенненхунд", price: "7100 - 9100", icon: "cut" },
        { name: "Бигль", price: "3700", icon: "cut" },
        { name: "Бладхаунд", price: "5300", icon: "cut" },
        { name: "Бобтейл, Бриар", price: "6600 - 8600", icon: "cut" },
        { name: "Боксер", price: "4400", icon: "cut" },
        { name: "Бордер колли", price: "4500 - 5500", icon: "cut" },
        { name: "Бордосский дог", price: "5400", icon: "cut" },
        { name: "Бувье", price: "5600", icon: "cut" },
        { name: "Бультерьер", price: "3800", icon: "cut" },
        { name: "Бульмастиф", price: "5400", icon: "cut" },
        {
          name: "Восточно-европейская овчарка",
          price: "5400 - 6400",
          icon: "cut",
        },
        { name: "Грейхаунд", price: "4300", icon: "cut" },
        { name: "Далматин", price: "4100", icon: "cut" },
        { name: "Доберман", price: "4600", icon: "cut" },
        { name: "Дратхаар", price: "4600", icon: "cut" },
        { name: "Испанский мастиф", price: "5500", icon: "cut" },
        { name: "Кавказская овчарка", price: "8500", icon: "cut" },
        { name: "Керри-блю-терьер", price: "5400", icon: "cut" },
        { name: "Курцхаар", price: "4500", icon: "cut" },
        { name: "Лабрадор", price: "5400", icon: "cut" },
        { name: "Лабродудель", price: "5400", icon: "cut" },
        { name: "Самоед", price: "6800 - 8800", icon: "cut" },
        { name: "Мастино-наполетано", price: "5900", icon: "cut" },
        { name: "Маламут", price: "6900 - 7900", icon: "cut" },
        { name: "Метис (от 15 кг)", price: "5200", icon: "cut" },
        { name: "Немецкая овчарка", price: "от 5600", icon: "cut" },
        { name: "Ньюфаундленд", price: "7900 - 10400", icon: "cut" },
        { name: "Ретривер", price: "5600 - 6600", icon: "cut" },
        { name: "Ризеншнауцер модельно", price: "5900", icon: "cut" },
        { name: "Тайский Риджбек", price: "4600", icon: "cut" },
        { name: "Ротвейлер", price: "5600", icon: "cut" },
        { name: "Русская борзая", price: "4900", icon: "cut" },
        { name: "Русский черный терьер", price: "7900 - 10400", icon: "cut" },
        { name: "Салюки", price: "4200", icon: "cut" },
        {
          name: "Среднеазиатская овчарка / Алабай",
          price: "7500 - 9500",
          icon: "cut",
        },
        { name: "Хаски / Лайка", price: "5400", icon: "cut" },
        { name: "Шарпей", price: "3900", icon: "cut" },
        { name: "Эрдельтерьер", price: "5500", icon: "cut" },
      ],
    },
    medium: {
      title: "Средние породы",
      items: [
        { name: "Бедлингтон", price: "3900", icon: "cut" },
        { name: "Бесенджи", price: "3200", icon: "cut" },
        { name: "Вельш-корги", price: "3400", icon: "cut" },
        { name: "Вест хайленд уайт терьер", price: "3700", icon: "cut" },
        { name: "Денди Даймонд терьер", price: "3600", icon: "cut" },
        { name: "Джек рассел терьер", price: "3100", icon: "cut" },
        {
          name: "Кеесхонд (Немецкий вольфшпиц)",
          price: "4500 - 6500",
          icon: "cut",
        },
        { name: "Лейкленд терьер", price: "4000", icon: "cut" },
        { name: "Мальтипу", price: "от 3700", icon: "cut" },
        { name: "Метисы (5-15 кг)", price: "3800", icon: "cut" },
        { name: "Миттельшнауцер", price: "4500", icon: "cut" },
        { name: "Миниатюрный пудель", price: "4000", icon: "cut" },
        { name: "Малый пудель", price: "4400", icon: "cut" },
        { name: "Русский спаниель", price: "3900", icon: "cut" },
        { name: "Сиба Ину", price: "3400", icon: "cut" },
        { name: "Силихем терьер", price: "3900", icon: "cut" },
        { name: "Скай терьер", price: "3900", icon: "cut" },
        { name: "Спаниель Кавалер Кинг Чарльз", price: "3300", icon: "cut" },
        { name: "Спрингер спаниель", price: "3400", icon: "cut" },
        { name: "Тибетский терьер", price: "3800", icon: "cut" },
        { name: "Французский бульдог", price: "3100", icon: "cut" },
        { name: "Цвергшнауцер", price: "3800", icon: "cut" },
        { name: "Шелти", price: "4400 - 5400", icon: "cut" },
      ],
    },
    decorative: {
      title: "Декоративные породы",
      items: [
        { name: "Аффен-пинчер / Грифон", price: "3000", icon: "cut" },
        { name: "Бишон Фризе", price: "4100", icon: "cut" },
        { name: "Болоньез", price: "3000", icon: "cut" },
        { name: "Бивер-йорк", price: "3000", icon: "cut" },
        { name: "Йоркширский терьер", price: "3000", icon: "cut" },
        { name: "Китайская хохлатая голая", price: "2800", icon: "cut" },
        { name: "Китайская хохлатая пуховка", price: "3200", icon: "cut" },
        { name: "Лхасский апсо", price: "3700", icon: "cut" },
        { name: "Мальтийская болонка", price: "3200", icon: "cut" },
        { name: "Метис до 5 кг", price: "3000", icon: "cut" },
        { name: "Метис больше 5 кг", price: "3800", icon: "cut" },
        { name: "Московский дракон", price: "2700", icon: "cut" },
        { name: "Мопс", price: "2600", icon: "cut" },
        { name: "Папильон", price: "2900", icon: "cut" },
        { name: "Пекинес", price: "3200", icon: "cut" },
        { name: "Пти-брабансон", price: "2700", icon: "cut" },
        { name: "Русская цветная болонка", price: "3200", icon: "cut" },
        { name: "Той-пудель", price: "3400", icon: "cut" },
        { name: "Той-терьер", price: "2500", icon: "cut" },
        { name: "Чихуа-хуа гладкошерстный", price: "2500", icon: "cut" },
        { name: "Чихуа-хуа длинношерстный", price: "2700", icon: "cut" },
        { name: "Ши-тцу", price: "3500", icon: "cut" },
        { name: "Шпиц померанский (до 22 см)", price: "3100", icon: "cut" },
        { name: "Шпиц малый (от 23 до 29 см)", price: "3400", icon: "cut" },
        { name: "Шпиц средний (свыше 30 см)", price: "3600", icon: "cut" },
        { name: "Японский хин", price: "2900", icon: "cut" },
      ],
    },
  };

  function createServiceItem(item) {
    return `
      <li class="service-item">
        <div class="service-name">
          <i class="fas fa-${item.icon}"></i>
          <span>${item.name}</span>
        </div>
        <div class="service-price">${item.price} ₽</div>
      </li>
    `;
  }

  function renderServices(category = "all") {
    const servicesList = document.querySelector(".services-list");
    if (!servicesList) return;

    servicesList.innerHTML = "";

    const categories =
      category === "all" ? Object.keys(servicesData).reverse() : [category];

    categories.forEach((cat) => {
      if (servicesData[cat]) {
        const categoryHtml = `
          <div class="service-category show" data-category="${cat}">
            <h3 class="category-title">${servicesData[cat].title}</h3>
            <ul class="service-items">
              ${servicesData[cat].items
                .map((item) => createServiceItem(item))
                .join("")}
            </ul>
          </div>
        `;
        servicesList.innerHTML += categoryHtml;
      }
    });

    // Добавляем обработчики событий для модального окна после рендеринга
    const serviceItems = document.querySelectorAll(".service-item");
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalClose = document.querySelector(".modal-close");
    const modalForm = document.querySelector(".modal-form");
    const formSuccess = document.querySelector(".form-success");

    serviceItems.forEach((item) => {
      item.addEventListener("click", () => {
        modalOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
        modalForm.style.display = "block";
        formSuccess.style.display = "none";
      });
    });

    modalClose.addEventListener("click", () => {
      modalOverlay.style.display = "none";
      document.body.style.overflow = "auto";
      modalForm.reset();
      modalForm.style.display = "block";
      formSuccess.style.display = "none";
    });

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
        document.body.style.overflow = "auto";
        modalForm.reset();
        modalForm.style.display = "block";
        formSuccess.style.display = "none";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.style.display === "flex") {
        modalOverlay.style.display = "none";
        document.body.style.overflow = "auto";
        modalForm.reset();
        modalForm.style.display = "block";
        formSuccess.style.display = "none";
      }
    });
  }

  function searchServices(query) {
    const searchQuery = query.toLowerCase().trim();
    const servicesList = document.querySelector(".services-list");
    const noResults = document.getElementById("no-results");
    let found = false;

    Object.keys(servicesData).forEach((category) => {
      const categoryElement = servicesList.querySelector(
        `[data-category="${category}"]`
      );
      if (!categoryElement) return;

      const items = categoryElement.querySelectorAll(".service-item");
      let categoryHasVisibleItems = false;

      items.forEach((item) => {
        const name = item
          .querySelector(".service-name span")
          .textContent.toLowerCase();
        // Разбиваем название породы на слова
        const words = name.split(" ");
        // Проверяем, начинается ли хотя бы одно слово с введенного запроса
        const matches = words.some((word) => word.startsWith(searchQuery));

        if (matches) {
          item.style.display = "";
          categoryHasVisibleItems = true;
          found = true;
        } else {
          item.style.display = "none";
        }
      });

      if (categoryHasVisibleItems) {
        categoryElement.classList.add("show");
        categoryElement.classList.remove("hidden");
      } else {
        categoryElement.classList.remove("show");
        categoryElement.classList.add("hidden");
      }
    });

    noResults.style.display = found ? "none" : "block";
  }

  function initServices() {
    renderServices();

    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchContainer = document.querySelector(".search-container");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        const category = e.target.dataset.category;

        renderServices(category);
        document.getElementById("breed-search").value = "";
        document.getElementById("no-results").style.display = "none";
      });
    });

    if (searchContainer) {
      searchContainer.style.display = "block";

      const searchInput = document.getElementById("breed-search");
      let searchTimeout;
  
      searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          const query = e.target.value;
          if (query) {
            // Показываем все категории перед поиском
            renderServices();
            searchServices(query);
          } else {
            // Если поле поиска пустое, показываем текущую активную категорию
            const activeCategory =
              document.querySelector(".filter-btn.active").dataset.category;
            renderServices(activeCategory);
            document.getElementById("no-results").style.display = "none";
          }
        }, 300);
      });
    }
  }

  // Портфолио - фильтрация галереи
  function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.services-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Активный класс для кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Фильтрация элементов
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.classList.add('active');
            }, 50);
          } else {
            item.classList.remove('active');
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    // Анимация при наведении
    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('hover');
      });
      
      item.addEventListener('mouseleave', () => {
        item.classList.remove('hover');
      });
    });

    // Показать все элементы при загрузке
    galleryItems.forEach(item => {
      item.classList.add('active');
      item.style.display = 'block';
    });
  }

  // Анимация падающих иконок
  function animateFallingIcons() {
    const iconContainers = document.querySelectorAll('.falling-icons-container');
    
    if (!iconContainers.length) return;
    
    iconContainers.forEach(container => {
      const icons = container.querySelectorAll('.falling-icon');
      
      icons.forEach(icon => {
        // Случайное начальное положение
        const startX = Math.random() * 100;
        const startDelay = Math.random() * 5;
        
        // Случайная скорость падения
        const duration = 5 + Math.random() * 10;
        
        // Случайное вращение
        const rotation = Math.random() * 360;
        const rotationSpeed = Math.random() > 0.5 ? 1 : -1;
        
        // Применяем стили
        icon.style.left = `${startX}%`;
        icon.style.animationDelay = `${startDelay}s`;
        icon.style.animationDuration = `${duration}s`;
        icon.style.transform = `rotate(${rotation}deg)`;
        icon.style.setProperty('--rotation-direction', rotationSpeed);
      });
    });
  }

  // Инициализация всех функций
  initMobileMenu();
  highlightActiveMenuItem();
  initSmoothScroll();
  initScrollAnimations();
  handleVideoFallback();
  initYandexMap();
  initWelcomeIcons();
  initServices();
  initPortfolioFilter();
  animateFallingIcons();
});

class FormHandler {
  constructor() {
    this.rateLimiter = new RateLimiter(TELEGRAM_CONFIG.RATE_LIMIT_MS);
    this.initForms();
    this.initValidation();
  }

  initForms() {
    const modalForm = document.querySelector(".modal-form");
    if (modalForm) {
      modalForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await this.handleFormSubmit(modalForm, "modal");
      });
    }

    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await this.handleFormSubmit(contactForm, "contact");
      });
    }
  }

  initValidation() {
    // Инициализация валидации для всех форм
    const forms = document.querySelectorAll('.modal-form, .contact-form');
    
    forms.forEach(form => {
      const nameInput = form.querySelector('input[name="name"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const submitButton = form.querySelector('button[type="submit"]');
      
      // Добавление индикаторов обязательных полей
      if (nameInput) {
        // Добавляем звездочку после placeholder
        nameInput.placeholder = nameInput.placeholder + ' *';
      }
      
      if (phoneInput) {
        // Добавляем звездочку после placeholder
        phoneInput.placeholder = phoneInput.placeholder + ' *';
        
        // Маска для телефона
        this.initPhoneMask(phoneInput);
        
        // Валидация при вводе
        phoneInput.addEventListener('input', () => {
          this.validateForm(form);
        });
      }
      
      // Валидация имени
      if (nameInput) {
        nameInput.addEventListener('input', () => {
          this.validateForm(form);
        });
      }
      
      // Изначальная блокировка кнопки
      if (submitButton) {
        submitButton.disabled = true;
      }
      
      // Первичная валидация
      this.validateForm(form);
    });
  }
  
  initPhoneMask(input) {
    let prevValue = '';
    
    input.addEventListener('input', (e) => {
      // Сохраняем текущую позицию курсора
      const cursorPos = input.selectionStart;
      // Получаем только цифры из введенного значения
      let value = input.value.replace(/\D/g, '');
      
      // Если первая цифра 7, удаляем её, т.к. код +7 уже добавляется маской
      if (value.length > 0 && value[0] === '7') {
        value = value.substring(1);
      }
      
      let formattedValue = '';
      
      if (value.length === 0) {
        formattedValue = '';
      } else if (value.length <= 3) {
        formattedValue = `+7 (${value}`;
      } else if (value.length <= 6) {
        formattedValue = `+7 (${value.substring(0, 3)}) ${value.substring(3)}`;
      } else if (value.length <= 8) {
        formattedValue = `+7 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
      } else if (value.length <= 10) {
        formattedValue = `+7 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 8)}-${value.substring(8)}`;
      } else {
        // Ограничиваем длину до 10 цифр (не считая кода страны)
        formattedValue = `+7 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 8)}-${value.substring(8, 10)}`;
      }
      
      // Устанавливаем отформатированное значение
      if (formattedValue !== input.value) {
        input.value = formattedValue;
        
        // Корректируем позицию курсора
        const newCursorPos = cursorPos + (formattedValue.length - prevValue.length);
        if (newCursorPos >= 0) {
          input.setSelectionRange(newCursorPos, newCursorPos);
        }
      }
      
      prevValue = formattedValue;
    });
    
    // Обрабатываем случай когда пользователь вставляет номер
    input.addEventListener('paste', (e) => {
      setTimeout(() => {
        input.dispatchEvent(new Event('input'));
      }, 0);
    });
    
    // Проверяем внесенные ранее данные
    input.dispatchEvent(new Event('input'));
  }
  
  validateForm(form) {
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const submitButton = form.querySelector('button[type="submit"]');
    
    let isValid = true;
    
    // Валидация имени
    if (nameInput) {
      const nameValue = nameInput.value.trim();
      const namePattern = /^[А-ЯЁа-яёA-Za-z\s-]{2,50}$/;
      
      // Выделяем только если пользователь уже взаимодействовал с полем и ввел некорректные данные
      if (nameValue && !namePattern.test(nameValue)) {
        nameInput.classList.add('invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
        // Проверяем заполненность поля для активации кнопки
        if (!nameValue) {
          isValid = false;
        }
      }
    }
    
    // Валидация телефона
    if (phoneInput) {
      const phoneValue = phoneInput.value.replace(/\D/g, '');
      
      // Выделяем только если пользователь уже взаимодействовал с полем и ввел некорректные данные
      if (phoneValue && phoneValue.length < 11) {
        phoneInput.classList.add('invalid');
        isValid = false;
      } else {
        phoneInput.classList.remove('invalid');
        // Проверяем заполненность поля для активации кнопки
        if (!phoneValue) {
          isValid = false;
        }
      }
    }
    
    // Управление кнопкой
    if (submitButton) {
      submitButton.disabled = !isValid;
    }
    
    return isValid;
  }

  async handleFormSubmit(form, type) {
    // Дополнительная проверка валидности перед отправкой
    if (!this.validateForm(form)) {
      this.showNotification("Пожалуйста, заполните все обязательные поля", "error");
      return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    const formSuccess = form.closest(".modal-content")
      ? form.closest(".modal-content").querySelector(".form-success")
      : form.nextElementSibling;

    if (!this.rateLimiter.canMakeRequest()) {
      const waitTime = Math.ceil(this.rateLimiter.getTimeToWait() / 1000);
      this.showNotification(
        `Пожалуйста, подождите ${waitTime} секунд перед следующей отправкой`,
        "error"
      );
      return;
    }

    if (
      this.rateLimiter.getMessageCount() >=
      TELEGRAM_CONFIG.MAX_MESSAGES_PER_SESSION
    ) {
      this.showNotification(
        "Превышен лимит отправки сообщений. Попробуйте позже.",
        "error"
      );
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Отправка...";

    try {
      const formData = this.getFormData(form, type);
      const message = this.formatMessage(formData, type);

      const response = await this.sendToTelegram(message);
      const result = await response.json();

      if (result.ok) {
        this.rateLimiter.recordRequest();
        form.style.display = "none";
        formSuccess.style.display = "block";
        form.reset();

        // Закрываем модальное окно через 3 секунды
        if (type === "modal") {
          setTimeout(() => {
            const modalOverlay = form.closest(".modal-overlay");
            modalOverlay.style.display = "none";
            document.body.style.overflow = "auto";
            form.style.display = "block";
            formSuccess.style.display = "none";
          }, 3000);
        }
      } else {
        throw new Error(result.description || "Ошибка при отправке сообщения");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      this.showNotification(
        "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Отправить";
    }
  }

  getFormData(form, type) {
    const formData = new FormData(form);
    return {
      name: formData.get("name")?.trim() || "",
      phone: formData.get("phone")?.trim() || "",
      message: formData.get("message")?.trim() || "",
      type: type,
    };
  }

  formatMessage(formData, type) {
    return `
          📩 Новое сообщение с сайта

          👤 Имя: ${this.sanitizeInput(formData.name)}
          📱 Телефон: ${this.sanitizeInput(formData.phone)}
          💬 Сообщение: ${this.sanitizeInput(formData.message || "Не указано")}
      `.trim();
  }

  sanitizeInput(input) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async sendToTelegram(message) {
    return fetch(
      `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CONFIG.CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );
  }

  showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
          <i class="fas fa-${
            type === "error" ? "exclamation-circle" : "check-circle"
          }"></i>
          <p>${message}</p>
      `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}
class RateLimiter {
  constructor(timeWindowMs) {
    this.timeWindowMs = timeWindowMs;
    this.lastRequestTime = 0;
    this.messageCount = 0;
  }

  canMakeRequest() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    return timeSinceLastRequest >= this.timeWindowMs;
  }

  recordRequest() {
    this.lastRequestTime = Date.now();
    this.messageCount++;
  }

  getTimeToWait() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    return Math.max(0, this.timeWindowMs - timeSinceLastRequest);
  }

  getMessageCount() {
    return this.messageCount;
  }
}

const TELEGRAM_CONFIG = {
  BOT_TOKEN: "7685362973:AAFTszNQyawQ8dZvf7joA4EFVvQecSSd7pI",
  CHAT_ID: "1369258684",
  RATE_LIMIT_MS: 30000,
  MAX_MESSAGES_PER_SESSION: 5,
};

// Обновляем стили для валидации
const validationStyles = document.createElement('style');
validationStyles.textContent = `
  .form-group input.invalid,
  .form-group textarea.invalid {
    border-color: #e74c3c;
    box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
  }
  
  .form-group input.invalid:focus,
  .form-group textarea.invalid:focus {
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.3);
  }
  
  .form-group input::placeholder {
    color: #999;
  }
  
  .form-group input:focus::placeholder {
    opacity: 0.5;
  }

  button[type="submit"]:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: #cccccc;
    color: #666666;
    box-shadow: none;
  }

  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    animation: slideIn 0.3s ease;
  }

  .notification.error {
    background-color: #e74c3c;
  }

  .notification i {
    font-size: 1.5rem;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(validationStyles);
