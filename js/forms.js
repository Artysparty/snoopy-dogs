/**
 * Модуль для работы с формами
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация формы бронирования
    initBookingForm();
    
    // Инициализация формы контактов
    initContactForm();
});

/**
 * Инициализация формы бронирования
 */
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация формы
            if (validateForm(this)) {
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
            }
        });
    }
}

/**
 * Инициализация формы контактов
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        // Скрываем блок успешной отправки изначально
        formSuccess.style.display = 'none';
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация формы
            if (validateForm(this)) {
                // Сбор данных формы
                const formData = new FormData(this);
                let formEntries = {};
                
                formData.forEach((value, key) => {
                    formEntries[key] = value;
                });
                
                // Скрываем форму и показываем сообщение об успехе
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // В реальном проекте здесь будет отправка данных на сервер
                console.log('Форма контактов отправлена:', formEntries);
            }
        });
    }
}

/**
 * Валидация формы
 * @param {HTMLFormElement} form - Форма для валидации
 * @returns {boolean} - Результат валидации
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Удаляем предыдущие сообщения об ошибках
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
    
    // Проверяем обязательные поля
    requiredFields.forEach(field => {
        field.classList.remove('error');
        
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Добавляем сообщение об ошибке
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Это поле обязательно для заполнения';
            field.parentNode.appendChild(errorMessage);
        }
    });
    
    // Проверка email, если есть
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            isValid = false;
            emailField.classList.add('error');
            
            // Добавляем сообщение об ошибке
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Пожалуйста, введите корректный email';
            emailField.parentNode.appendChild(errorMessage);
        }
    }
    
    // Проверка телефона, если есть
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value.trim()) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(phoneField.value.trim())) {
            isValid = false;
            phoneField.classList.add('error');
            
            // Добавляем сообщение об ошибке
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Пожалуйста, введите корректный номер телефона';
            phoneField.parentNode.appendChild(errorMessage);
        }
    }
    
    return isValid;
} 