 document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();
            let valid = true;

            // Clear previous errors
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
            });
            document.getElementById('nameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('phoneError').textContent = '';
            document.getElementById('messageError').textContent = '';

            // Name validation
            const name = document.getElementById('name').value;
            if (!/^[a-zA-Z\s]+$/.test(name)) {
                document.getElementById('nameError').textContent = 'Name must contain only alphabets and spaces.';
                document.getElementById('name').closest('.form-group').classList.add('error');
                valid = false;
            } else if (name.length < 2 || name.length > 50) {
                document.getElementById('nameError').textContent = 'Name must be between 2 and 50 characters.';
                document.getElementById('name').closest('.form-group').classList.add('error');
                valid = false;
            }

            // Email validation
            const email = document.getElementById('email').value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                document.getElementById('email').closest('.form-group').classList.add('error');
                valid = false;
            } else if (/[<>]/.test(email)) {
                document.getElementById('emailError').textContent = 'Email cannot contain < or > characters.';
                document.getElementById('email').closest('.form-group').classList.add('error');
                valid = false;
            }

            // Phone validation (Egyptian number)
            const phone = document.getElementById('phone').value;
            const egyptianPhonePattern = /^(?:\+20|0020)?1[0-9]{9}$/;
            if (!egyptianPhonePattern.test(phone)) {
                document.getElementById('phoneError').textContent = 'Phone number must be a valid Egyptian number starting with +20 or 0020 followed by 10 digits.';
                document.getElementById('phone').closest('.form-group').classList.add('error');
                valid = false;
            }

            // Message validation
            const message = document.getElementById('message').value;
            if (message.trim() === '') {
                document.getElementById('messageError').textContent = 'Message cannot be empty.';
                document.getElementById('message').closest('.form-group').classList.add('error');
                valid = false;
            } else if (message.length < 10 || message.length > 500) {
                document.getElementById('messageError').textContent = 'Message must be between 10 and 500 characters.';
                document.getElementById('message').closest('.form-group').classList.add('error');
                valid = false;
            } else if (/[^a-zA-Z0-9\s.,!?'"()\-]/.test(message)) {
                document.getElementById('messageError').textContent = 'Message contains invalid characters.';
                document.getElementById('message').closest('.form-group').classList.add('error');
                valid = false;
            }

            if (valid) {
                alert('Form submitted successfully!');
                // Here you can add code to actually submit the form
                // e.g., using AJAX or simply resetting the form
                // this.submit();
                // or
                // document.getElementById('contactForm').reset();
            }
        });