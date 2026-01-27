// FAQ Logic
function toggleFaq(button) {
    const item = button.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
    });

    // Open clicked if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

// Open first item by default on load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.faq-item')?.classList.add('active');
});
