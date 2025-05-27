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

if (navbarMenuIcon) {
    navbarMenuIcon.addEventListener('click', function() {
        navbarBtns.style.display = "flex";
        navbarCloseMobileMenuBtn.style.display = "block";
    })
}


if (navbarCloseMobileMenuBtn) {
    navbarCloseMobileMenuBtn.addEventListener('click', function() {
        navbarBtns.style.display ="none";
    })
}


export function checkInputs(currentForm) {
    const submitBtn = currentForm.querySelector('.submit-btn');
    const fields = currentForm.querySelectorAll('input, select, textarea');

    let allFilled = true;
    fields.forEach(field => {
        //ignore les input hidden
        if (field.type === 'hidden') return;

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


}
export function hidePopup(divToHide) {
    const blurEffect = document.querySelector('.blur-effect');

    blurEffect.style.display = "none";
    divToHide.style.display = "none";
}


