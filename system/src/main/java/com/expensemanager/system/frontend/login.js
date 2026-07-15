// ============================
// ELEMENTS
// ============================

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");


// ============================
// TOGGLE LOGIN / REGISTER
// ============================

loginTab.addEventListener("click", () => {

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

});

registerTab.addEventListener("click", () => {

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

});


// ============================
// SHOW / HIDE PASSWORD
// ============================

document.querySelectorAll(".togglePassword").forEach(toggle => {

    toggle.addEventListener("click", () => {

        const input = toggle.previousElementSibling;

        if (input.type === "password") {

            input.type = "text";

            toggle.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            input.type = "password";

            toggle.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });

});


// ============================
// PASSWORD STRENGTH
// ============================

const password = document.getElementById("password");

password.addEventListener("input", () => {

    const value = password.value;

    let score = 0;

    if(value.length >= 8) score++;

    if(/[A-Z]/.test(value)) score++;

    if(/[0-9]/.test(value)) score++;

    if(/[!@#$%^&*]/.test(value)) score++;

    switch(score){

        case 0:

        case 1:

            strengthBar.style.width="25%";
            strengthBar.style.background="#ef4444";
            strengthText.textContent="Weak Password";

            break;

        case 2:

            strengthBar.style.width="50%";
            strengthBar.style.background="#f59e0b";
            strengthText.textContent="Medium Password";

            break;

        case 3:

            strengthBar.style.width="75%";
            strengthBar.style.background="#3b82f6";
            strengthText.textContent="Good Password";

            break;

        case 4:

            strengthBar.style.width="100%";
            strengthBar.style.background="#22c55e";
            strengthText.textContent="Strong Password";

            break;

    }

});


// ============================
// REGISTER
// ============================

registerForm.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const pass =
        document.getElementById("password").value;

    const confirm =
        document.getElementById("confirmPassword").value;

    if(pass !== confirm){

        alert("Passwords do not match.");

        return;

    }

    const user={

        name:document.getElementById("name").value,

        email:document.getElementById("email").value,

        password:pass

    };

    fetch(`http://localhost:8080/auth/register`,
        {method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then(response=> {
            if (response.ok) {
                window.alert("Successfully created account");
            } else {
                window.alert("Email already exist");
            }
        })
        .then(data=>{

        })
        .catch(error=>{
            console.error(error);
        });
    registerForm.reset();
    loginTab.click();
});


// ============================
// LOGIN
// ============================

loginForm.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const loginData={

        email:document.getElementById("loginEmail").value,

        password:document.getElementById("loginPassword").value

    };

    fetch(
        `http://localhost:8080/auth/login`,
        {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(loginData)
        })
        .then(async response=>{
            const msg = await response.text();
            if (response.ok){
                alert("login successful");
                window.location.href="index.html";
            }
            else{
                alert(msg);
            }
        })
        .catch(error=>{
            console.error(error);
        })
    loginForm.reset();
});