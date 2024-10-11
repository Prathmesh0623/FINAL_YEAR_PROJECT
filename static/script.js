document.addEventListener('DOMContentLoaded', function () {
    const signInButton = document.querySelector('.sign-in');
    const signUpButton = document.querySelector('.sign-up');
    const modalBox = document.createElement('div');
    const overlay = document.createElement('div');

   
    modalBox.style.display = 'none'; 
    modalBox.style.position = 'fixed';
    modalBox.style.top = '50%';
    modalBox.style.left = '50%';
    modalBox.style.transform = 'translate(-50%, -50%)';
    modalBox.style.width = '65%';
    modalBox.style.maxWidth = '400px';
    modalBox.style.padding = '20px';
    modalBox.style.backgroundColor = 'transparent';
    modalBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    modalBox.style.zIndex = '1000';

    overlay.style.display = 'none'; 
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '999';

    
    document.body.appendChild(overlay);
    document.body.appendChild(modalBox);

   
    function loadContent(file) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                modalBox.innerHTML = data;
                modalBox.style.display = 'block';
                overlay.style.display = 'block';
                addSwitchListeners(); 
            })
            .catch(error => console.error('Error loading content:', error));
    }

   
    // signInButton.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     loadContent('sign_in.html');
    // });

    // signUpButton.addEventListener('click', function (event) {
    //     event.preventDefault(); 
    //     loadContent('sign_up.html'); 
    // });

    
    function addSwitchListeners() {
        const switchToSignIn = document.querySelector('.switch-to-sign-in');
        const switchToSignUp = document.querySelector('.switch-to-sign-up');

        if (switchToSignIn) {
            switchToSignIn.addEventListener('click', function (event) {
                event.preventDefault(); 
                loadContent('sign_in.html'); 
            });
        }

        if (switchToSignUp) {
            switchToSignUp.addEventListener('click', function (event) {
                event.preventDefault(); 
                loadContent('sign_up.html'); 
            });
        }
    }

    
    overlay.addEventListener('click', function () {
        modalBox.style.display = 'none';
        overlay.style.display = 'none';
        modalBox.innerHTML = ''; 
    });
});
