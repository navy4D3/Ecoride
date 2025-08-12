const { checkPasswordValidity, checkRegisterFormValidity } = require("../app");
  

let params = new URLSearchParams(document.location.search);
const connectTypeParamUrl = params.get("type");
const currentForm = document.querySelector('form');

const inscriptionLabel = document.getElementById('register-label')
const connexionLabel = document.getElementById('login-label');

if (inscriptionLabel && connexionLabel) {
  if (connectTypeParamUrl == "register" || currentForm.classList.contains('register-form')) {
    inscriptionLabel.classList.add('active');
    
  } else {
    connexionLabel.classList.add('active');
    
  }
}



connexionLabel.addEventListener('click', () => {
  
  toggleForm('login');
})

function toggleForm(formType) {
  inscriptionLabel.classList.toggle('active');
  connexionLabel.classList.toggle('active');

  fetch(`/${formType}`)
  .then(response => {
      if (!response.ok) {
          throw new Error('Erreur lors du chargement du formulaire');
      }
      return response.text();
  })
  .then(html => {
      document.getElementById('form-container').innerHTML = html;
      
      document.querySelectorAll('.errors-container').innerHTML = '';
      initFormEvents();

      function waitForReCaptchaReadyAndInit() {
        if (typeof grecaptcha !== 'undefined' && typeof window.onGoogleReCaptchaApiLoad === 'function') {
            window.onGoogleReCaptchaApiLoad();
        } else {
            setTimeout(waitForReCaptchaReadyAndInit, 200);
        }
      }
    
      // Ensuite, après chargement AJAX du formulaire :
      waitForReCaptchaReadyAndInit();


  })
  .catch(error => {
      console.error('Erreur :', error);
  });

}




function initFormEvents() {
  const cguCheckIcon =  document.getElementById('cgu-check-icon');
  const cguUncheckIcon =  document.getElementById('cgu-uncheck-icon');
  const cguCheckboxInput = document.getElementById('registration_form_agreeTerms');
  const emailInputRegister = document.getElementById('registration_form_email');
  const passwordInputRegister = document.getElementById('registration_form_password_first');
  const confirmPasswordInput = document.getElementById('registration_form_password_second');
  const submitBtn = document.getElementById('submit-btn');
  const registerForm = document.querySelector('.register-form');


  if (cguUncheckIcon) {
    cguUncheckIcon.addEventListener('click', function() {
      
      cguUncheckIcon.style.display="none";
      cguCheckIcon.style.display="block";
      cguCheckboxInput.checked =  true;
      checkRegisterFormValidity(registerForm,passwordInputRegister, confirmPasswordInput, emailInputRegister, cguCheckboxInput);
      
    })
    cguCheckIcon.addEventListener('click', function() {
        
        cguCheckIcon.style.display="none";
        cguUncheckIcon.style.display="block";
        cguCheckboxInput.checked =  false;
        checkRegisterFormValidity(registerForm,passwordInputRegister, confirmPasswordInput, emailInputRegister, cguCheckboxInput);
        
    })
  }

  if (passwordInputRegister) {
    passwordInputRegister.addEventListener('input', function () {

      checkPasswordValidity('registration_form_password_first');
    
      checkRegisterFormValidity(registerForm,passwordInputRegister, confirmPasswordInput, emailInputRegister, cguCheckboxInput);
      
    });
    
    confirmPasswordInput.addEventListener('input', function() {
      checkRegisterFormValidity(registerForm,passwordInputRegister, confirmPasswordInput, emailInputRegister, cguCheckboxInput);
    })

  }

}



initFormEvents();










