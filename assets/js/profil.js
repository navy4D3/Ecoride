const { checkInputs, showErrors, showSuccessAlert, treatFormAlert, checkPasswordValidity, checkRegisterFormValidity } = require("../app");
import heic2any from 'heic2any';
import { showAddVoitureForm } from './addVoiture';
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
        if (btn.id == "espace-chauffeur" && btn.dataset.isChauffeur == "") {
            window.location.href = "/devenir-chauffeur";
            return;
        }
        
        profilNavbarBtns.forEach((btn) => {
            btn.classList.remove('selected');
        })
    
        const currentSection = document.querySelector('.current-section');
        currentSection.style.display = "none";
        currentSection.classList.toggle('current-section');

        //gere la redirection de l'espace chauffeur en fonction de si user deja chauffeur ou non


        // cache la sectionr ajouté add-voiture liée a espace chauffeur
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
    const profilPictureImg = document.getElementById('profil-picture-img');
    profilPictureImg.style.opacity = "75%";
    editProfilPictureBtn.style.display = "none";
    submitMyDataFormBtn.classList.add('inactive');
    
    const file = this.files[0];
    if (!file) return;

    const maxWidth = 1024;
    const quality = 0.5;

    const mimeType = file.type.toLowerCase();



    // Si HEIC/HEIF, on convertit en JPEG d'abord
    if (mimeType === 'image/heic' || mimeType === 'image/heif') {
        heic2any({ blob: file, toType: "image/jpeg", quality: quality })
            .then(blob => compressAndResizeImage(blob, maxWidth, quality))
            .then(processCompressedBlob)
            .then( () => {
                profilPictureImg.style.opacity = "100%";
                editProfilPictureBtn.style.display = "block";
                submitMyDataFormBtn.classList.remove('inactive');
            })
            .catch(console.error);
    } else {
        compressAndResizeImage(file, maxWidth, quality)
            .then(processCompressedBlob)
            .then( () => {
                profilPictureImg.style.opacity = "100%";
                editProfilPictureBtn.style.display = "block";
                submitMyDataFormBtn.classList.remove('inactive');
            })
            .catch(console.error);
    }

    function processCompressedBlob(blob) {
        const imageUrl = URL.createObjectURL(blob);
        const profilPictureImg = document.getElementById('profil-picture-img');

        profilPictureImg.src = imageUrl;

        // Remplace le fichier dans l'input par le blob compressé
        const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: 'image/jpeg' });

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(compressedFile);
        profilPictureInput.files = dataTransfer.files;
    }
});


function compressAndResizeImage(file, maxWidth, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {
            img.src = event.target.result;
        };

        img.onload = () => {
            const ratio = maxWidth / img.width;
            const width = Math.min(img.width, maxWidth);
            const height = img.height * ratio;

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Compression de l'image a échoué"));
            }, 'image/jpeg', quality);
        };

        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}



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

        treatFormAlert(myDataForm, 'Données mises à jour avec succès', data);
        
        // if (data.status == "success") {
        //     showSuccessAlert('Informations mises à jour avec succès');
            
        // } else {
        //     alert(data.errors);
        //     data.errors.forEach((error) => {
        //         alert(error.message)
        //     })
            
        //     //completer pour bien maitriser les erreurs
        //     showErrors(data.errors);
        // }
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
        
        treatFormAlert(espaceChauffeurForm, 'Informations modifiés avec succès', data)
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

const showEditMailSectionBtn = document.getElementById('show-edit-mail-form-btn');
const editMailSection = document.querySelector('.parametres-section-mail');

showEditMailSectionBtn.addEventListener('click', function() {
    editMailSection.style.display = "flex";
    mailAndPasswordSection.style.display =  "none";
})
const editMailForm = document.querySelector('.edit-mail-form');
const submitEditMailFormBtn = editMailForm.querySelector('.submit-btn');
const editMailFormInputs = editMailForm.querySelectorAll('input, select, textarea');
// const editMailFormEmailInput = document.getElementById('edit_mail_email');

editMailFormInputs.forEach((input) => {
    input.addEventListener('input', function() {
        checkInputs(editMailForm);
    })
})

submitEditMailFormBtn.addEventListener('click', function(e) {
    e.preventDefault();

    submitEditMailFormBtn.classList.add('inactive');

    const formData = new FormData(editMailForm);

    fetch('/edit-mail', {
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

        treatFormAlert(editMailForm, 'Informations mises à jour avec succès', data);
        editMailForm.reset();
        const event = new Event('input', {
            bubbles: true,
        });

    })
    .catch(error => console.error('Erreur:', error));
})


const showEditPasswordSectionBtn = document.getElementById('show-edit-password-form-btn');
const editPasswordSection = document.querySelector('.parametres-section-password');

showEditPasswordSectionBtn.addEventListener('click', function() {
    editPasswordSection.style.display = "flex";
    mailAndPasswordSection.style.display =  "none";
})

const editPasswordForm = document.querySelector('.edit-password-form');
const passwordInput = document.getElementById('edit_password_password_first');
const confirmPasswordInput = document.getElementById('edit_password_password_second');
const currentPasswordInput = document.getElementById('edit_password_currentPassword');
const submitEditPasswordFormBtn = editPasswordForm.querySelector('.submit-btn');

currentPasswordInput.addEventListener('input', function(){
    checkRegisterFormValidity(editPasswordForm,passwordInput, confirmPasswordInput, null, currentPasswordInput);
})

passwordInput.addEventListener('input', function() {
    checkPasswordValidity('edit_password_password_first');
    checkRegisterFormValidity(editPasswordForm,passwordInput, confirmPasswordInput, null, null, currentPasswordInput);
})

confirmPasswordInput.addEventListener('input', function() {
    checkPasswordValidity('edit_password_password_first');
    checkRegisterFormValidity(editPasswordForm,passwordInput, confirmPasswordInput, null, null, currentPasswordInput);
})





submitEditPasswordFormBtn.addEventListener('click', function(e) {
    e.preventDefault();

    submitEditPasswordFormBtn.classList.add('inactive');

    const formData = new FormData(editPasswordForm);

    fetch('/edit-password', {
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

        treatFormAlert(editPasswordForm, 'Informations mises à jour avec succès', data);
        editPasswordForm.reset();
        const event = new Event('input', {
            bubbles: true,
        });
          
        passwordInput.dispatchEvent(event);

    })
    .catch(error => console.error('Erreur:', error));
})