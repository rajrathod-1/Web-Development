document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const nameInput = document.getElementById('name-input');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = nameInput.value;

        if (name) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/login', true)
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.onload = function(){
                if(xhr.status === 200)
                {
                    window.location.href = 'index.html';
                }
                else{
                    console.error("Login failed:", xhr.responseText);
                }
            };

            xhr.send(JSON.stringify({user: name}));
        }
    });
});
