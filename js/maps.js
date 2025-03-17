/**
 * Модуль для работы с картами
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Яндекс карты с небольшой задержкой для гарантии загрузки API
    console.log('DOM загружен, пытаемся инициализировать карту...');
    setTimeout(initYandexMap, 1000);
});

/**
 * Инициализация Яндекс карты
 */
function initYandexMap() {
    console.log('Запуск инициализации карты');
    console.log('Проверка наличия ymaps:', typeof ymaps !== 'undefined' ? 'Доступен' : 'Не определен');
    console.log('Проверка наличия элемента карты:', document.getElementById('map') ? 'Найден' : 'Не найден');
    
    // Проверяем, загружен ли API Яндекс.Карт и существует ли элемент карты на странице
    if (typeof ymaps !== 'undefined' && document.getElementById('map')) {
        console.log('Условия выполнены, запускаем ymaps.ready()');
        
        ymaps.ready(function() {
            console.log('ymaps.ready() сработал, создаем карту');
            // Координаты салона
            const salonCoordinates = [55.942219, 37.870212]; // Москва, центр (пример)
            
            try {
                // Создаем карту
                const map = new ymaps.Map('map', {
                    center: salonCoordinates,
                    zoom: 16,
                    controls: ['zoomControl', 'geolocationControl']
                });
                
                console.log('Карта создана успешно');
                
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
                    preset: 'islands#redDogIcon',
                    iconColor: '#8280FF' // Обновленный цвет метки соответствует новой цветовой гамме
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
                
                console.log('Карта полностью настроена');
            } catch (error) {
                console.error('Ошибка при создании карты:', error);
            }
        });
    } else {
        console.error('Не удалось инициализировать карту: ymaps или элемент map не найдены');
    }
} 