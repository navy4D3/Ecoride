import './bootstrap';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.scss';

const navbarMenuIcon = document.getElementById('navbar-menu-icon');
const navbarBtns = document.getElementById('navbar-btns');
const navbarCloseMobileMenuBtn = document.getElementById('navbar-close-mobile-menu');
const navbarLogo = document.querySelector('.navbar_logo');

if (navbarMenuIcon) {
    navbarMenuIcon.addEventListener('click', function() {
        navbarBtns.style.display = "flex";
        navbarCloseMobileMenuBtn.style.display = "block";
        navbarMenuIcon.style.display = "none";
        navbarLogo.style.display ="none";

        if (window.innerWidth < 768) {
            document.querySelector(".navbar_buttons").style.paddingTop = '30px';
        }
    })
}


if (navbarCloseMobileMenuBtn) {
    navbarCloseMobileMenuBtn.addEventListener('click', function() {
        navbarBtns.style.display ="none";
        navbarMenuIcon.style.display = "flex";
        navbarLogo.style.display ="flex";
    })
}


export function checkInputs(currentForm) {
    const submitBtn = currentForm.querySelector('.submit-btn');
    const fields = currentForm.querySelectorAll('input, select, textarea');

    let allFilled = true;
    fields.forEach(field => {
        //ignore les input hidden
        if (field.type === 'hidden' || !field.required) return;

        if (field.type === 'checkbox') {
            // Ne valider que les checkboxes marquées comme "required"
            if (field.required && !field.checked) {
                allFilled = false;
            }
        }

        if (field.value.trim() === '') {
            allFilled = false;

        }

    
    });

    

    if (allFilled) {
        submitBtn.classList.remove('inactive');
    } else {
        submitBtn.classList.add('inactive');
    }
}

export function treatFormAlert(form, successAlert, jsonData) {
        let errorsContainer = form.querySelector('.errors-container');

        if (jsonData.status == "success") {
            showSuccessAlert(successAlert);

            if (errorsContainer) {
                errorsContainer.remove();
            }
            
        } else {
            
            if (!errorsContainer) {
                errorsContainer = document.createElement("div");
                errorsContainer.classList.add('errors-container');

                form.insertAdjacentElement('afterBegin', errorsContainer);
            }

            let newHtml = '';
            jsonData.errors.forEach(error => {
                newHtml += `
                <div class="alert alert-danger">
                    ${error.message}
                </div>
                `
            });
            errorsContainer.innerHTML = newHtml;
        }
}

export function showSuccessAlert(message, duration = 3000) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show';
    alert.role = 'alert';
    alert.innerHTML = `
      ${message}
      
    `;
    // <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  
    // Ajoute l'alerte en haut du body (ou ailleurs selon ton design)
    document.body.prepend(alert);
  
    // Supprime l'alerte automatiquement après `duration` ms
    setTimeout(() => {
      alert.classList.remove('show'); // déclenche la transition
      alert.classList.add('hide'); // si besoin
      setTimeout(() => alert.remove(), 300); // laisse le temps à la transition de s'effectuer
    }, duration);
}

export function showErrors(alerts) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-error alert-dismissible fade show';
    alert.role = 'alert';
    

    let message = ""

    alerts.forEach((alert) => {
        message = message + "<br>" + alert.message
    });

    alert.innerHTML = message;

}

export function showPopup(divToShow, displayType) {
    const blurEffect = document.querySelector('.blur-effect');

    blurEffect.style.display = "block";
    divToShow.style.display = displayType;

    const hidePopupBtn = divToShow.querySelector('.hide-btn');

    if (hidePopupBtn) {
        hidePopupBtn.addEventListener('click', function() {
            hidePopup(divToShow);
        })
    }


}
export function hidePopup(divToHide) {
    const blurEffect = document.querySelector('.blur-effect');

    blurEffect.style.display = "none";
    divToHide.style.display = "none";
}

export function checkPasswordValidity(passwordInputId) {

    const lengthCriteria = document.getElementById('length');
    const lowercaseCriteria = document.getElementById('lowercase');
    const uppercaseCriteria = document.getElementById('uppercase');
    const numberCriteria = document.getElementById('number');
    const specialCriteria = document.getElementById('special');
  
    const passwordInput = document.getElementById(passwordInputId);
    // const confirmPasswordInput = document.getElementById(confirmPasswordInputIdd);
  
    const password = passwordInput.value;
  
    function toggleValidity(element, isValid) {
      if (isValid) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        
      } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
        
      }
    }

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

  // checkRegisterFormValidity();
}

export function checkRegisterFormValidity(form, passwordInput, confirmPasswordInput, emailInput, cguInput = null, currentPasswordInput = null) {
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    const submitBtn = form.querySelector('.submit-btn');
    

    const isPasswordMatch = password && confirm && password === confirm;
    const passwordInputValidity = document.querySelectorAll('.valid').length == document.getElementById('password-criteria').children.length;

    let cguCheck = true;
    if (cguInput) {
        cguCheck = cguInput.checked;
    }

    let currentPasswordCheck = true;
    if (currentPasswordInput) {
        currentPasswordCheck = currentPasswordInput.value;
    }

    if (isPasswordMatch && emailInput.value && cguCheck && passwordInputValidity && currentPasswordCheck) {
      submitBtn.classList.remove('inactive');
    } else {
      submitBtn.classList.add('inactive');
    }
  }


