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

        // ✅ رابط جوجل شيت Web App
        const googleSheetUrl = "https://script.google.com/macros/s/AKfycbwZKoOvZeYbImuRbPVZrmaouCTtXx7qIWS2kWhqWKsBDn1CS2AnYICJ6zJAN07sDW18/exec"; 

        const formData = new FormData();
        formData.append('العنوان', document.getElementById('address').value);
        formData.append('رقم الهاتف', document.getElementById('phone').value);
        formData.append('الكمية', document.getElementById('quantity').value);

        // إرسال البيانات إلى شيت جوجل
        fetch(googleSheetUrl, {
            method: "POST",
            mode: "no-cors",
            body: formData
        })
        .then(response => {
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
