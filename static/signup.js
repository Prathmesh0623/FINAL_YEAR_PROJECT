document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (email && password && confirmPassword) {
        alert('Sign-Up Successful!');
    } else {
        alert('Please fill in all fields.');
    }
});
