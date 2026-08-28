// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.style.maxHeight = null;
        });

        // Open if wasn't active
        if (!isActive) {
            question.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const orderForm = document.getElementById('orderForm');
const successMessage = document.getElementById('successMessage');

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Hide form and show success message
        orderForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Hide order title
        const orderTitle = document.querySelector('.order-title');
        if (orderTitle) {
            orderTitle.style.display = 'none';
        }
    });
}
