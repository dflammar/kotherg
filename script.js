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

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = orderForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'جاري الإرسال... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        fetch("https://formsubmit.co/ajax/Alkawthergrope@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "العنوان": document.getElementById('address').value,
                "رقم الهاتف": document.getElementById('phone').value,
                "الكمية": document.getElementById('quantity').value,
                "_subject": "طلب جديد: كرسي الأطفال (الكوثر للأثاث)"
            })
        })
        .then(response => response.json())
        .then(data => {
            // Redirect to thank you page so Meta Pixel can track the lead/purchase properly
            window.location.href = 'thankyou.html';
        })
        .catch(error => {
            console.error(error);
            alert('حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}
