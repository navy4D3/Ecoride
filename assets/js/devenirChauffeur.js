import {checkInputs} from '../app';
import {showAddVoitureForm} from './addVoiture';

const preferencesBtns = document.querySelectorAll('.preference');
const selectedPreferences = [];
const preferencesInput = document.getElementById('devenir_chauffeur_preferences');

preferencesInput.value = "";

const devenirChauffeurForm = document.getElementById("devenir-chauffeur-form");
const fields = devenirChauffeurForm.querySelectorAll('input, select, textarea');

fields.forEach(field => {
  field.addEventListener('input', () => checkInputs(devenirChauffeurForm));

});

preferencesBtns.forEach((preference) => {
    preference.addEventListener('click', function() {
        this.classList.toggle('active');

        const index = selectedPreferences.indexOf(preference.id);

        if (index === -1) {
            // Ajout si pas encore sélectionné
            selectedPreferences.push(preference.id);
        } else {
            // Retrait si déjà présent
            selectedPreferences.splice(index, 1);
        }
        
        preferencesInput.value = selectedPreferences.length ? JSON.stringify(selectedPreferences) : "";

        
        preferencesInput.dispatchEvent(new Event('input', { bubbles: true }));
    })
})

const hasVoitureInput = document.getElementById('devenir_chauffeur_hasVoiture');

const voitureCards = document.querySelectorAll('.voiture-card');

if (voitureCards.length > 0) {
    hasVoitureInput.checked = true;
    hasVoitureInput.dispatchEvent(new Event('input', { bubbles: true }));
}

// completer pour mettre à jour l'input au début et à chaque ajout de voiture.
// Il faudra probablement inclure une mise à jour optionnel dans addVoiture.js


const addVoitureBtn = document.getElementById("add-voiture-btn");

addVoitureBtn.addEventListener('click', function() {
  showAddVoitureForm('devenir-chauffeur-base');

});