document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Collect Data
            // Note: Update HTML to have IDs matching these, or use querySelector relative to form
            const firstName = document.getElementById('firstName')?.value || '';
            const lastName = document.getElementById('lastName')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const message = document.getElementById('message')?.value || '';

            // Get selected radio for subject/service
            const selectedSubject = document.querySelector('input[name="subject"]:checked');
            // The text is inside a span sibling (or inside the label). 
            // The structure in HTML is: label > input + span (with text). 
            // Let's get the text content of the span sibling.
            let service = '';
            if (selectedSubject) {
                // The span is the next element sibling
                const span = selectedSubject.nextElementSibling;
                if (span) service = span.innerText.trim();
            }

            const payload = {
                name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                service: service,
                message: message
            };

            fetch('https://havona.brandmindz.com/api/enquiries/add.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Thank you! Your message has been sent successfully.');
                        contactForm.reset();
                    } else {
                        alert('Error: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                })
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
