/**
 * Модуль для работы с вкладками и фильтрацией
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация вкладок
    initTabs();
    
    // Инициализация фильтрации портфолио
    initPortfolioFilter();
});

/**
 * Инициализация вкладок
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Удаляем активный класс у всех кнопок
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Добавляем активный класс выбранной кнопке
                this.classList.add('active');
                
                // Получаем ID контента, который нужно показать
                const tabId = this.getAttribute('data-tab');
                
                // Скрываем все контенты
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Показываем нужный контент
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

/**
 * Инициализация фильтрации портфолио
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Удаляем активный класс у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Добавляем активный класс выбранной кнопке
                this.classList.add('active');
                
                // Получаем фильтр
                const filter = this.getAttribute('data-filter');
                
                // Фильтруем элементы
                portfolioItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
} 