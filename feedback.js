document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const reviewsContainer = document.getElementById('reviewsContainer');
    
    // Загрузка отзывов из localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('flowerReviews')) || [];
        displayReviews(reviews);
    }
    
    // Отображение отзывов
    function displayReviews(reviews) {
        reviewsContainer.innerHTML = '';
        
        if (reviews.length === 0) {
            reviewsContainer.innerHTML = '<div class="empty-review">Пока нет отзывов. Будьте первым!</div>';
            return;
        }
        
        // Сортируем отзывы по дате (новые сначала)
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <div class="review-header">
                    <span class="review-author">${review.name}</span>
                    <span class="review-rating">${getRatingStars(review.rating)}</span>
                </div>
                <div class="review-date">${formatDate(review.date)}</div>
                <div class="review-text">${review.message}</div>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }
    
    // Форматирование даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Получение звезд рейтинга
    function getRatingStars(rating) {
        rating = parseInt(rating);
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '★' : '☆';
        }
        return stars;
    }
    
    // Обработка отправки формы
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            rating: document.getElementById('rating').value,
            message: document.getElementById('message').value.trim(),
            date: new Date().toISOString()
        };
        
        // Проверка заполнения обязательных полей
        if (!formData.name || !formData.rating || !formData.message) {
            alert('Пожалуйста, заполните все обязательные поля!');
            return;
        }
        
        // Сохранение отзыва
        const reviews = JSON.parse(localStorage.getItem('flowerReviews')) || [];
        reviews.push(formData);
        localStorage.setItem('flowerReviews', JSON.stringify(reviews));
        
        // Обновление отображения
        displayReviews(reviews);
        
        // Очистка формы
        feedbackForm.reset();
        
        // Уведомление
        alert('Спасибо за ваш отзыв!');
    });
    
    // Первоначальная загрузка отзывов
    loadReviews();
});