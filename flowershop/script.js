document.addEventListener('DOMContentLoaded', function() {
    // ������������� �������
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
 
    // ����������� ��� ������ "�������� � �������" � "������"
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            
            addToCart(id, name, price);
            showAlert(`${name} �������� � �������!`);
        });
    });
 
    // ������� ���������� � �������
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
 
    // ���������� �������� �������
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }
 
    // ����������� �����������
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
 
    // �������� ������� �� �������� ������
    function checkCartOnOrderPage() {
        if (window.location.pathname.includes('order.html')) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                window.location.href = 'index.html';
            }
        }
    }
 
    // ��������� ������ ������� �������
    function setupClearCartButton() {
        const clearCartBtn = document.getElementById('clearCart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function() {
                if (confirm('�� ������������� ������ �������� �������?')) {
                    localStorage.removeItem('cart');
                    updateCartCount();
                    
                    if (window.location.pathname.includes('order.html')) {
                        window.location.reload();
                    } else {
                        showAlert('������� �������');
                    }
                }
            });
        }
    }
 
    // ������������� �������
    checkCartOnOrderPage();
    setupClearCartButton();
});