document.addEventListener('DOMContentLoaded', function() {
    // Èíèöèàëèçàöèÿ êîðçèíû
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
 
    // Îáðàáîò÷èêè äëÿ êíîïîê "Äîáàâèòü â êîðçèíó" è "Êóïèòü"
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            
            addToCart(id, name, price);
            showAlert(`${name} äîáàâëåí â êîðçèíó!`);
        });
    });
 
    // Ôóíêöèÿ äîáàâëåíèÿ â êîðçèíó
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
 
    // Îáíîâëåíèå ñ÷åò÷èêà êîðçèíû
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }
 
    // Âñïëûâàþùåå óâåäîìëåíèå
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
 
    // Ïðîâåðêà êîðçèíû íà ñòðàíèöå çàêàçà
    function checkCartOnOrderPage() {
        if (window.location.pathname.includes('order.html')) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                window.location.href = 'index.html';
            }
        }
    }
 
    // Íàñòðîéêà êíîïêè î÷èñòêè êîðçèíû
    function setupClearCartButton() {
        const clearCartBtn = document.getElementById('clearCart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function() {
                if (confirm('Âû äåéñòâèòåëüíî õîòèòå î÷èñòèòü êîðçèíó?')) {
                    localStorage.removeItem('cart');
                    updateCartCount();
                    
                    if (window.location.pathname.includes('order.html')) {
                        window.location.reload();
                    } else {
                        showAlert('Êîðçèíà î÷èùåíà');
                    }
                }
            });
        }
    }
 
    // Èíèöèàëèçàöèÿ ôóíêöèé
    checkCartOnOrderPage();
    setupClearCartButton();
});
    // Инициализация функций
    checkCartOnOrderPage();
    setupClearCartButton();
});
// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
  });
}
