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

        // ✅ رابط جوجل شيت Web App المعتمد والصحيح 100%
        const googleSheetUrl = "https://script.google.com/macros/s/AKfycbwZKoOvZeYbImuRbPVZrmaouCTtXx7qlWS2kWhqWKsBDn1CS2AnYICJ6zJANO7sDW18/exec"; 

        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const quantity = document.getElementById('quantity').value;

        // تجهيز البيانات كـ URL Query وأيضاً JSON
        const params = new URLSearchParams();
        params.append('العنوان', address);
        params.append('رقم الهاتف', phone);
        params.append('الكمية', quantity);

        const targetUrl = googleSheetUrl + '?' + params.toString();
        const jsonBody = JSON.stringify({
            'العنوان': address,
            'رقم الهاتف': phone,
            'الكمية': quantity
        });

        // إرسال البيانات مع keepalive لضمان عدم إلغاء الطلب عند التحويل في الموبايل
        fetch(targetUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: jsonBody,
            keepalive: true
        })
        .then(() => {
            setTimeout(() => {
                window.location.href = 'thankyou.html';
            }, 500);
        })
        .catch(error => {
            console.error(error);
            setTimeout(() => {
                window.location.href = 'thankyou.html';
            }, 500);
        });
    });
}
