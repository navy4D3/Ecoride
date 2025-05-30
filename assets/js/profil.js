const { checkInputs, showErrors, showSuccessAlert, treatFormAlert } = require("../app");
import { showAddVoitureForm } from './addVoiture';
// const { initPreferencesBtnsEvent } = require("./devenirChauffeur");
// import {initPreferencesBtnsEvent} from './devenirChauffeur';
import { initPreferencesBtnsEvents } from './initPreferencesBtnsEvents';

const trajetsBtn = document.getElementById('trajets');
const myDataBtn = document.getElementById('mes-informations');

const parametresBtn = document.getElementById('parametres');

const trajetsSection = document.querySelector('.trajet-section');
const myDataSection = document.querySelector('.my-data-section');
const espaceChauffeurSection = document.querySelector('.espace-chauffeur-section');

const profilNavbar =  document.querySelector('.profil-navbar');
const profilNavbarBtns = profilNavbar.querySelectorAll('div');

profilNavbarBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
        profilNavbarBtns.forEach((btn) => {
            btn.classList.remove('selected');
        })
    
        const currentSection = document.querySelector('.current-section');
        currentSection.style.display = "none";
        currentSection.classList.toggle('current-section');

        const addvoitureSection = document.getElementById('add-voiture-section');
        if (addvoitureSection && addvoitureSection.style.display =="flex") {
            addvoitureSection.style.display = "none";
        }

        const nextSection = document.querySelector(`.${this.id}-section`);
        nextSection.style.display = "flex";
        nextSection.classList.toggle('current-section');

        this.classList.add('selected');
    })
})

const editProfilPictureBtn =  document.getElementById('edit-profil-icon');
const profilPictureInput =  document.getElementById('registration_step_two_photo_profil');

const myDataForm = document.getElementById('my-data-form');
// const myDataFormInputs = myDataForm.querySelectorAll('input, select, textarea');
// const myDataFormSubmitBtn = myDataForm.querySelector('.submit-btn');

// myDataFormInputs.forEach(input => {
//   input.addEventListener('input', function() {
//     myDataFormSubmitBtn.classList.remove('inactive');
//   });  
// });

initFormInputsValidation(myDataForm);

function initFormInputsValidation(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    const submitBtn = form.querySelector('.submit-btn');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
          submitBtn.classList.remove('inactive');
        });  
      });
}

editProfilPictureBtn.addEventListener('click', function () {
    profilPictureInput.click();
});

profilPictureInput.addEventListener('change', function () {
    const imageUrl = URL.createObjectURL(this.files[0]);
    const profilPictureImg = document.getElementById('profil-picture-img');

    profilPictureImg.src = imageUrl;
    
    // profilPictureBtn.style.backgroundImage = `url(${imageUrl})`;
    // profilPictureBtn.style.backgroundSize = 'cover'; // optionnel
    // profilPictureBtn.style.backgroundPosition = 'center'; // optionnel
    // profilePicturePlusIcon.style.opacity = "0";

})

const submitMyDataFormBtn = document.getElementById('submit-my-data-form-btn');

submitMyDataFormBtn.addEventListener('click', function(e) {
    submitMyDataFormBtn.classList.add('inactive');

    const formData = new FormData(myDataForm);
    e.preventDefault();

    fetch('/user/update-data', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
        }
    })
    .then(response => response.json())
    .then(data => {
        // data.html contient ton formulaire rendu
        
        if (data.status == "success") {
            showSuccessAlert('Informations mises à jour avec succès');
            
        } else {
            alert(data.errors);
            data.errors.forEach((error) => {
                alert(error.message)
            })
            
            //completer pour bien maitriser les erreurs
            showErrors(data.errors);
        }
    })
    .catch(error => console.error('Erreur:', error));
})


const espaceChauffeurBtn = document.getElementById('espace-chauffeur');
// const preferencesInput = document.getElementById('devenir_chauffeur_preferences');
const espaceChauffeurForm = document.getElementById('devenir-chauffeur-form');
const submitEspaceChauffeurFormBtn = espaceChauffeurForm.querySelector('.submit-btn');


initFormInputsValidation(espaceChauffeurForm);

let isPreferencesBtnsEventsInit = false;
espaceChauffeurBtn.addEventListener('click', function() {
    const preferencesContainer = document.querySelector('.preferences-list');

    const userPreferencesDataset = preferencesContainer.dataset.userPreferences;
    const userPreferences = userPreferencesDataset !== "" ? userPreferencesDataset.split(',') : [];

    if (!isPreferencesBtnsEventsInit) {
        initPreferencesBtnsEvents(userPreferences);
        isPreferencesBtnsEventsInit = true;
    }
    
})

submitEspaceChauffeurFormBtn.addEventListener('click', function(e) {
    submitEspaceChauffeurFormBtn.classList.add('inactive');

    const formData = new FormData(espaceChauffeurForm);
    e.preventDefault();

    fetch('/user/update-chauffeur-data', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
        }
    })
    .then(response => response.json())
    .then(data => {
        // data.html contient ton formulaire rendu
        
        if (data.status == "success") {
            showSuccessAlert('Informations mises à jour avec succès');
            
        } else {
            data.errors.forEach((error) => {
                alert(error.message)
            })
            
            showErrors(data.errors);
        }
    })
    .catch(error => console.error('Erreur:', error));
})

const voituresBtns = document.querySelectorAll('.voiture-card');
const addVoitureBtn = document.getElementById('add-voiture-btn');

voituresBtns.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        showAddVoitureForm(espaceChauffeurSection.id, btn.id);

        
    })

    btn.dataset.listenerAttached = 'true';
    
})

addVoitureBtn.addEventListener('click', function(e) {
    e.preventDefault();

    showAddVoitureForm(espaceChauffeurSection.id);
})

const parametresSection = document.querySelector(".parametres-section");
const avisSection = document.querySelector('.parametres-section-avis');
const mailAndPasswordSection = document.querySelector('.parametres-section-mail-password');
const parametresSectionBtns = document.querySelector('.parametres-section-btns');
const avisBtn = document.getElementById('avis-btn');
const mailAndPasswordBtn = document.getElementById('mail-and-password-btn');

avisBtn.addEventListener('click', function() {
    avisSection.style.display = "flex";
    parametresSectionBtns.style.display = "none";
})

mailAndPasswordBtn.addEventListener('click', function() {
    mailAndPasswordSection.style.display = "flex";
    parametresSectionBtns.style.display = "none";
})

const parametresSectionBackBtns = parametresSection.querySelectorAll(".back-btn");

parametresSectionBackBtns.forEach((backBtn) => {
    backBtn.addEventListener('click', function() {
        const currentSubSection = backBtn.parentElement.parentElement;

        currentSubSection.style.display = "none";
        parametresSectionBtns.style.display = "flex";
    })
})

const avisRecusBtn = document.getElementById('avis-recus-btn');
const avisPubliesBtn = document.getElementById('avis-publies-btn');
const avisRecusSection = avisSection.querySelector('.avis-recus-section');
const avisPubliesSection = avisSection.querySelector('.avis-publies-section');

avisRecusBtn.addEventListener('click', function() {
    avisPubliesSection.style.display =  "none";
    avisRecusSection.style.display =  "flex";

    avisRecusBtn.classList.add('selected');
    avisPubliesBtn.classList.remove('selected');
})

avisPubliesBtn.addEventListener('click', function() {
    avisRecusSection.style.display =  "none";
    avisPubliesSection.style.display =  "flex";
    
    avisRecusBtn.classList.remove('selected');
    avisPubliesBtn.classList.add('selected');
})

const editMailPasswordForm = document.querySelector('.register-form');
const submitEditMailPasswordFormBtn = editMailPasswordForm.querySelector('.submit-btn');
const editMailPasswordFormInputs = editMailPasswordForm.querySelectorAll('input, select, textarea');

editMailPasswordFormInputs.forEach((input) => [
    input.addEventListener('input', function(e){
        checkInputs(editMailPasswordForm);
    })
])

submitEditMailPasswordFormBtn.addEventListener('click', function(e) {
    e.preventDefault();

    submitEditMailPasswordFormBtn.classList.add('inactive');

    const formData = new FormData(editMailPasswordForm);

    fetch('/edit-mail-password', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        // data.html contient ton formulaire rendu

        treatFormAlert(editMailPasswordForm, 'Informations mises à jour avec succès', data);
        // let errorsContainer = editMailPasswordForm.querySelector('.errors-container');

        // if (data.status == "success") {
        //     showSuccessAlert('Informations mises à jour avec succès');

        //     if (errorsContainer) {
        //         errorsContainer.remove();
        //     }
            
        // } else {
            
        //     if (!errorsContainer) {
        //         errorsContainer = document.createElement("div");
        //         errorsContainer.classList.add('errors-container');

        //         editMailPasswordForm.insertAdjacentElement('afterBegin', errorsContainer);
        //     }

        //     let newHtml = '';
        //     data.errors.forEach(error => {
        //         newHtml += `
        //         <div class="alert alert-danger">
        //             ${error.message}
        //         </div>
        //         `
        //     });
        //     errorsContainer.innerHTML = newHtml;

        //     // const parser = new DOMParser();
        //     // const doc = parser.parseFromString(data.html, 'text/html');
        //     // const newForm = doc.querySelector('form');

        //     // editMailPasswordForm.replaceWith(newForm);

        //     // data.errors.forEach((error) => {
        //     //     alert(error.message)
        //     // })
            
        //     // showErrors(data.errors);
        // }
    })
    .catch(error => console.error('Erreur:', error));
})