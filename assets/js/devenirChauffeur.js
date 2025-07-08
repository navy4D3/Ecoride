import {checkInputs} from '../app';
import {showAddVoitureForm} from './addVoiture';
import { initPreferencesBtnsEvents } from './initPreferencesBtnsEvents';





// preferencesInput.value = "";

const devenirChauffeurForm = document.getElementById("devenir-chauffeur-form");
const fields = devenirChauffeurForm.querySelectorAll('input, select, textarea');

fields.forEach(field => {
  field.addEventListener('input', () => checkInputs(devenirChauffeurForm));

});



const selectedPreferences = [];
initPreferencesBtnsEvents(selectedPreferences);


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