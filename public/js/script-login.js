/* Declaración de el formualario completo  */
let username = document.getElementById('username');
let formulario = document.getElementById('formulario');
let password = document.getElementById('password');
let email = document.getElementById('email');
const inputs = document.querySelectorAll('#formulario input');


//Declaracion de expresiones regulares
const Expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,// Letras, guion bajo caracteres especiales. 
}


const campos = {
    usuario: false,
    password: false,
    correo: false
}

//aqui hacemos la validación de los campos 

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarFormulario(Expresiones.usuario, e.target, 'usuario');
            break;
        case "correo":
            validarCampo(Expresiones.correo, e.target, 'correo');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarpassword2();
            break;
        case "password2":
            validarpassword2();
            break;
    }

};




// function setFormMessage(formElement, type, message) {
//     const messageElement = formElement.querySelector(".formulario-mensaje");

//     messageElement.textContent = message;
//     messageElement.classList.remove("formulario-mensaje-success", "formulario-mensaje-error");
//     messageElement.classList.add(`formulario-mensaje-${type}`);
// }

// function setInputError(inputElement, message) {
//     inputElement.classList.add("formulario-input-error");
//     inputElement.parentElement.querySelector(".formulario-input-error-mensaje").textContent = message;
// }

// function clearInputError(inputElement) {
//     inputElement.classList.remove("formulario-input-error");
//     inputElement.parentElement.querySelector(".formulario-input-error-mensaje").textContent = "";
// }

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        formulario.classList.add("formulario-hidden");
        createAccountForm.classList.remove("formulario-hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        createAccountForm.classList.add("formulario-hidden");
        formulario.classList.remove("formulario-hidden");
    });

    // formulario.addEventListener("submit", (e) => {
    //     e.preventDefault();

    //     // Perform your AJAX/Fetch login
    //     setFormMessage(formulario, "error", `Usuario incorrecto y/o contraseña incorrecta.`);
    // });

    inputs.forEach(inputElement => {
        inputElement.addEventListener("keyup", validarFormulario);
        inputElement.addEventListener("blur", validarFormulario);

        inputElement.addEventListener("input", (e) => {
            clearInputError(inputElement);
        });
    });
});