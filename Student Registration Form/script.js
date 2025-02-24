document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (validateForm()) {
        showSuccessMessage();
    }
});


document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function() {
        validateSingleInput(this);
    });
});

function validateForm() {
    let isValid = true;
    
    isValid &= validateInput('firstName', /^[A-Za-z]+$/);
    isValid &= validateInput('lastName', /^[A-Za-z]+$/);
    isValid &= validateInput('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    isValid &= validateInput('password', /^.{6,}$/);
    isValid &= validateInput('contact', /^\d{11}$/);
    isValid &= validateInput('dob', /.+/);
    isValid &= validateInput('address', /.+/);
    isValid &= validateInput('select-course', /.+/);
    isValid &= validateFile('profilePic');

    return isValid;
}

function validateInput(id, regex) {
    let input = document.getElementById(id);
    if (!regex.test(input.value)) {
        input.style.border = '2px solid red';
        return false;
    } else {
        input.style.border = '2px solid green';
        return true;
    }
}

function validateSingleInput(input) {
    let regexMap = {
        'firstName': /^[A-Za-z]+$/,
        'lastName': /^[A-Za-z]+$/,
        'email': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'password': /^.{6,}$/,
        'contact': /^\d{11}$/,
        'dob': /.+/,
        'address': /.+/,
        'select-course': /.+/
    };

    if (regexMap[input.id]) {
        validateInput(input.id, regexMap[input.id]);
    } else if (input.id === 'profilePic') {
        validateFile('profilePic');
    }
}

function validateFile(id) {
    let file = document.getElementById(id);
    if (file.files.length === 0) {
        file.style.border = '2px solid red';
        return false;
    } else {
        file.style.border = '2px solid green';
        return true;
    }
}

function showSuccessMessage() {
    let successMessage = document.createElement('div');
    successMessage.textContent = '✔ Done! Registration Successful';
    successMessage.style.color = 'green';
    successMessage.style.fontWeight = 'bold';
    successMessage.style.marginTop = '10px';
    successMessage.style.padding = '10px';
    successMessage.style.border = '2px solid green';
    successMessage.style.borderRadius = '5px';
    successMessage.style.backgroundColor = '#d4edda';
    
    let form = document.getElementById('registrationForm');
    form.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}