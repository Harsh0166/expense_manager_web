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

    try{

        const response = await fetch("http://localhost:8080/register",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(user)

        });

        if(response.ok){

            alert("Registration Successful!");

            registerForm.reset();

            loginTab.click();

        }else{

            const msg=await response.text();

            alert(msg);

        }

    }catch(error){

        console.error(error);

        alert("Server Error");

    }

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

    try{

        const response = await fetch("http://localhost:8080/login",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(loginData)

        });

        if(response.ok){

            const data = await response.json();

            localStorage.setItem("token",data.token);

            window.location.href="index.html";

        }

        else{

            const msg = await response.text();

            alert(msg);

        }

    }catch(error){

        console.error(error);

        alert("Unable to connect server.");

    }

});