// variables
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const btnEnviar = document.querySelector('#enviar');
const formularioEnviar = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');

const regularExpresion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function inicioApp(){
     btnEnviar.disabled = true;
     btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// event Listener
eventListeners();

function eventListeners() {
     // Inicio de la aplicación y deshabilitar submit
     document.addEventListener('DOMContentLoaded', inicioApp);

     // Campos del formulario
     email.addEventListener('blur', validarFormulario);
     asunto.addEventListener('blur', validarFormulario);
     mensaje.addEventListener('blur', validarFormulario);

     // Reinicia el formulario
     resetBtn.addEventListener('click', resetForm);

     // Enviar email
     formularioEnviar.addEventListener('submit', enviarEmail);
}


function validarFormulario(e){

     // Valida que los campos tengan información
     if (e.target.value.length > 0) {  
          // Elimina los errores
          const error = document.querySelector('p.error');
          error &&  error.remove();        
          e.target.classList.remove('border', 'border-red-500');     
          e.target.classList.add('border', 'border-green-500');   
     } else {
          e.target.classList.remove('border', 'border-green-500');
          e.target.classList.add('border', 'border-red-500');
          mostrarError('Todos los campos son obligatorios');
     }

     // Valida el input Email
     if (e.target.type === 'email'){
          if (regularExpresion.test(e.target.value)){
               const error = document.querySelector('p.error');
               error &&  error.remove();
               e.target.classList.remove('border', 'border-red-500');     
               e.target.classList.add('border', 'border-green-500');  
          } else {
               e.target.classList.remove('border', 'border-green-500');
               e.target.classList.add('border', 'border-red-500');
               mostrarError('El email no es válido'); 
          }
     }

     if (regularExpresion.test(email.value) && asunto.value !==  '' && mensaje.value !== ''){
          btnEnviar.disabled = false;
          btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
     }
}

function mostrarError(mensaje){
     const mensajeError = document.createElement('p');
     mensajeError.textContent = mensaje;
     mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
     
     const errores = document.querySelectorAll('.error');
     if (errores.length === 0){
          formularioEnviar.appendChild(mensajeError);
     }
}

// Envia el email
function enviarEmail(e){
     e.preventDefault();
     
     // Mostrar spiner
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     // Oculta spinner despues de 2seg y muestra mensaje
     setTimeout( () => {
          spinner.style.display = 'none'; 

          // Mensaje de envio exitoso
          const parrafo = document.createElement('p');
          parrafo.textContent = 'El mensaje se envio correctamente!!';
          parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

          // Inserta parrafo antes del spinner
          formularioEnviar.insertBefore(parrafo, spinner);

          // Eliminar mensaje de exito tras 5seg.
          setTimeout( () => {
               parrafo.remove();
               formularioEnviar.reset();
               email.classList.remove('border', 'border-green-500');   
               asunto.classList.remove('border', 'border-green-500'); 
               mensaje.classList.remove('border', 'border-green-500'); 
               inicioApp();
          }, 5000);

     }, 2000);
}

// funcion que resetea el formulario 
function resetForm(e){
     e.preventDefault();
     formularioEnviar.reset();
     inicioApp();
}