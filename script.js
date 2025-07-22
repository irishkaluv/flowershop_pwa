document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
 
    // Обработчики для кнопок "Добавить в корзину" и "Купить"
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            
            addToCart(id, name, price);
            showAlert(`${name} добавлен в корзину!`);
        });
    });
 
    // Функция добавления в корзину
    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
 
    // Обновление счетчика корзины
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }
 
    // Всплывающее уведомление
    function showAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'alert-message';
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => alert.classList.add('show'), 10);
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => document.body.removeChild(alert), 300);
        }, 2000);
    }
 
    // Проверка корзины на странице заказа
    function checkCartOnOrderPage() {
        if (window.location.pathname.includes('order.html')) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                window.location.href = 'index.html';
            }
        }
    }
 
    // Настройка кнопки очистки корзины
    function setupClearCartButton() {
        const clearCartBtn = document.getElementById('clearCart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function() {
                if (confirm('Вы действительно хотите очистить корзину?')) {
                    localStorage.removeItem('cart');
                    updateCartCount();
                    
                    if (window.location.pathname.includes('order.html')) {
                        window.location.reload();
                    } else {
                        showAlert('Корзина очищена');
                    }
                }
            });
        }
    }
 
    // Инициализация функций
    checkCartOnOrderPage();
    setupClearCartButton();
});