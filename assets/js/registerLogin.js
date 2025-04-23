
let params = new URLSearchParams(document.location.search);
const connectTypeParamUrl = params.get("type");
const currentForm = document.querySelector('form');

const inscriptionLabel = document.getElementById('register-label')
const connexionLabel = document.getElementById('login-label');

if (connectTypeParamUrl == "register" || currentForm.classList.contains('register-form')) {
  inscriptionLabel.classList.add('active');
  
} else {
  connexionLabel.classList.add('active');
  
}

inscriptionLabel.addEventListener('click', () => {
  
  toggleForm('register');
})
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


  })
  .catch(error => {
      console.error('Erreur :', error);
  });

}




function initFormEvents() {
  const cguCheckIcon =  document.getElementById('cgu-check-icon');
  const cguUncheckIcon =  document.getElementById('cgu-uncheck-icon');
  const cguCheckboxInput = document.getElementById('registration_form_agreeTerms');

  if (cguUncheckIcon) {
    cguUncheckIcon.addEventListener('click', function() {
      
      cguUncheckIcon.style.display="none";
      cguCheckIcon.style.display="block";
      cguCheckboxInput.checked =  true;
      checkFormValidity();
      
    })
    cguCheckIcon.addEventListener('click', function() {
        
        cguCheckIcon.style.display="none";
        cguUncheckIcon.style.display="block";
        cguCheckboxInput.checked =  false;
        checkFormValidity();
        
    })
  }

  const emailInputRegister = document.getElementById('registration_form_email');
  const passwordInputRegister = document.getElementById('registration_form_password_first');
  const confirmPasswordInput = document.getElementById('registration_form_password_second');
  const submitBtn = document.getElementById('submit-btn');

  const lengthCriteria = document.getElementById('length');
  const lowercaseCriteria = document.getElementById('lowercase');
  const uppercaseCriteria = document.getElementById('uppercase');
  const numberCriteria = document.getElementById('number');
  const specialCriteria = document.getElementById('special');



  function toggleValidity(element, isValid) {
    if (isValid) {
      element.classList.remove('invalid');
      element.classList.add('valid');
      
    } else {
      element.classList.remove('valid');
      element.classList.add('invalid');
      
    }
  }

  function checkFormValidity() {
    const password = passwordInputRegister.value;
    const confirm = confirmPasswordInput.value;
    

    const isPasswordMatch = password && confirm && password === confirm;
    const passwordInputValidity = document.querySelectorAll('.valid').length == document.getElementById('password-criteria').children.length;
    

    


    if (isPasswordMatch && emailInputRegister.value && cguCheckboxInput.checked && passwordInputValidity) {
      submitBtn.classList.remove('inactive');
    } else {
      submitBtn.classList.add('inactive');
    }
  }

  if (passwordInputRegister) {
    passwordInputRegister.addEventListener('input', function () {
      const password = passwordInputRegister.value;
      
      // Longueur >= 8
      toggleValidity(lengthCriteria, password.length >= 8);
    
      // Contient une minuscule
      toggleValidity(lowercaseCriteria, /[a-z]/.test(password));
    
      // Contient une majuscule
      toggleValidity(uppercaseCriteria, /[A-Z]/.test(password));
    
      // Contient un chiffre
      toggleValidity(numberCriteria, /\d/.test(password));
    
      // Contient un caractère spécial
      toggleValidity(specialCriteria, /[^A-Za-z0-9]/.test(password));
    
      checkFormValidity();
      
    });
    
    confirmPasswordInput.addEventListener('input', checkFormValidity);

  }

}

initFormEvents();










