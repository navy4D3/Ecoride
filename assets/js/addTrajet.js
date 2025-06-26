import {checkInputs} from '../app';
import '../styles/publier-trajet.scss';
import '../styles/add-voiture.scss';
import {initUserVoitureBtns, showAddVoitureForm} from './addVoiture';

const addTrajetForm = document.getElementById("add-trajet-form");
const fields = addTrajetForm.querySelectorAll('input, select, textarea');

fields.forEach(field => {
  field.addEventListener('input', () => checkInputs(addTrajetForm));

});



checkInputs(addTrajetForm);

const hoursSelect = document.getElementById('hours');
const minutesSelect = document.getElementById('minutes');
const heureDepartInput = document.getElementById('add_trajet_heureDepart');
const dateDepartInput = document.getElementById('add_trajet_dateDepart');


  // Remplir les heures
for (let h = 0; h < 24; h++) {
const option = document.createElement('option');
option.value = h.toString().padStart(2, '0');
option.textContent = h.toString().padStart(2, '0');
hoursSelect.appendChild(option);

}

for (let m = 0; m < 60; m += 5) { // Par pas de 5 min
const option = document.createElement('option');
option.value = m.toString().padStart(2, '0');
option.textContent = m.toString().padStart(2, '0');
minutesSelect.appendChild(option);
}



function updatePlaceholder(select) {
    if (select.value !== "") {
      select.classList.add('valid');
    } else {
      select.classList.remove('valid');
    }
}

function updateHeureDepart() {
  const heure = hoursSelect.value;
  const minute = minutesSelect.value;
  const dateInput = dateDepartInput.value; 

  // Convertir "3 mai 2025" en jour, mois, année
  const moisFrancais = {
    "janvier": 0,
    "février": 1,
    "mars": 2,
    "avril": 3,
    "mai": 4,
    "juin": 5,
    "juillet": 6,
    "août": 7,
    "septembre": 8,
    "octobre": 9,
    "novembre": 10,
    "décembre": 11
  };

  const [jourStr, moisStr, anneeStr] = dateInput.split(' ');
  const jour = parseInt(jourStr, 10);
  const mois = moisFrancais[moisStr.toLowerCase()];
  const annee = parseInt(anneeStr, 10);

  if (mois === undefined || isNaN(jour) || isNaN(annee)) {
    console.error("Date invalide :", dateInput);
    return;
  }

  // Créer la date et appliquer l’heure
  const date = new Date(annee, mois, jour, heure, minute, 0);

  // Format ISO (YYYY-MM-DDTHH:mm:ss), UTC+00
  const formatted = date.toISOString().slice(0, 19);

  heureDepartInput.value = formatted;
}

hoursSelect.addEventListener('change', function() {
    updatePlaceholder(this);
    updateHeureDepart();
  });

minutesSelect.addEventListener('change', function() {
  updatePlaceholder(this);
  updateHeureDepart();
});

dateDepartInput.addEventListener('change', function() {
  updateHeureDepart();
});

const prixInput = document.getElementById('add_trajet_prixPersonne');
const creditLabel = document.getElementById('credit-label');

prixInput.addEventListener('input', function() {
  const value = parseInt(this.value, 10);
  
  if (!isNaN(value) && value > 0) {
    creditLabel.textContent = (value === 1 ? 'Crédit' : 'Crédits');
  } else {
    creditLabel.textContent = '';
  }
});

const itinerairesSection = document.getElementById('itineraires-choices');
const confirmItineraireBtn = document.getElementById('confirm-itineraire-btn');

function rechercherItineraire(origin, destination) {
    fetch(`/publier-trajet/itineraires?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`)
        .then(response => response.json())
        .then(data => {

        // console.log(data);
        const itinerairesList = document.getElementById('itineraires-list');

        data.forEach(route => {
            const routeElement = document.createElement('div');
            routeElement.dataset.raw = JSON.stringify(route.rawData);

            routeElement.classList.add('itineraire');
            const summaryText = route.hasToll ? `${route.summary} - Avec péage ` : 'Sans péage';

            routeElement.innerHTML = `
                <strong>${summaryText}</strong>
                <span>${route.distance} - ${route.duree}</span>
            `;

            itinerairesList.append(routeElement);
        });
        
        
        addTrajetForm.style.display = "none";
        itinerairesSection.style.display = "flex";
        document.querySelector('h1').innerHTML = "Choisis un itinéraire";

        document.querySelectorAll('.itineraire').forEach(function(itineraire) {
            itineraire.addEventListener('click', function() {
                document.querySelectorAll('.itineraire').forEach(itineraire => itineraire.classList.remove('selected'));
                this.classList.add('selected');
                const googleDataInput = document.getElementById('add_trajet_googleData');

                googleDataInput.value = this.dataset.raw;
                
                
                confirmItineraireBtn.classList.remove('inactive');
                
            })
        })

        continueBtn.classList.remove('inactive');
        
        })
        .catch(error => {
        console.error('Erreur :', error);
    });
}

const continueBtn = document.getElementById('continue-btn');
const departInput = document.getElementById('add_trajet_lieuDepart');
const arriveeInput = document.getElementById('add_trajet_lieuArrivee');

const itinerairesBackBtn = itinerairesSection.querySelector('.back-btn');

continueBtn.addEventListener('click', function(e) {
    e.preventDefault();

    this.classList.add('inactive');
    rechercherItineraire(departInput.value, arriveeInput.value);
    


})

itinerairesBackBtn.addEventListener('click', function() {
    addTrajetForm.style.display = "flex";
    itinerairesSection.style.display = "none";
    document.querySelector('h1').innerHTML = "Ajouter un trajet";

    confirmItineraireBtn.classList.add('inactive');
    const currentItinerairesDiv =  document.querySelectorAll('.itineraire');

    currentItinerairesDiv.forEach((div) => {
      div.remove();
    });

})

const addVoitureBtn = document.getElementById("add-voiture-btn");

addVoitureBtn.addEventListener('click', function() {
  showAddVoitureForm('trajet-details');

});

initUserVoitureBtns();

const recapitulatifSection = document.getElementById('recapitulatif');
const recapitulatifBackBtn = recapitulatifSection.querySelector('.back-btn');

confirmItineraireBtn.addEventListener('click', function() {
  document.querySelector('h1').innerHTML = "Récapitulatif";
  recapitulatifSection.style.display = "flex";
  itinerairesSection.style.display = "none";

  const lieuDepartInput = document.getElementById('add_trajet_lieuDepart');
  const lieuArriveeInput = document.getElementById('add_trajet_lieuArrivee');
  const prixPassagerInput = document.getElementById('add_trajet_prixPersonne');

  const recapDateDepartLabel = recapitulatifSection.querySelector('.date-depart');
  const recaplieuDepartLabel = recapitulatifSection.querySelector('.lieu-depart');
  const recapHeureDepartLabel = recapitulatifSection.querySelector('.heure-depart');
  const recapDureeLabel = recapitulatifSection.querySelector('.duree');
  const recapDistanceLabel = recapitulatifSection.querySelector('.distance');
  const recapheureArriveeLabel = recapitulatifSection.querySelector('.heure-arrivee');
  const recaplieuArriveeLabel = recapitulatifSection.querySelector('.lieu-arrivee');

  const recapVoitureSurnomLabel = recapitulatifSection.querySelector('.voiture-surnom');
  const recapVoitureMarqueLabel = recapitulatifSection.querySelector('.voiture-marque');
  const recapVoitureModeleLabel = recapitulatifSection.querySelector('.voiture-modele');
  const recapVoitureIsElectricLabel = recapitulatifSection.querySelector('.voiture-is-electric');
  const recapVoiturePlacesLabel = recapitulatifSection.querySelector('.voiture-place');
  const recapVoitureCreditsLabel = recapitulatifSection.querySelector('.credits-passager');

  recapDateDepartLabel.innerHTML = "Départ le " + dateDepartInput.value;
  recaplieuDepartLabel.innerHTML = lieuDepartInput.value;
  recapHeureDepartLabel.innerHTML = hoursSelect.value + ":" + minutesSelect.value;
  recaplieuArriveeLabel.innerHTML = lieuArriveeInput.value;
  recapVoitureCreditsLabel.innerHTML = prixPassagerInput.value + " crédits / passager";

  const currentItineraireSelectedDiv =document.querySelector('.itineraire.selected');

  const currentItineraireSelectedDatas = JSON.parse(currentItineraireSelectedDiv.dataset.raw);
  
  const currentItineraireSelectedDureeSeconds = currentItineraireSelectedDatas['legs'][0]['duration']['value'];
  const currentItineraireSelectedDistanceText = currentItineraireSelectedDatas['legs'][0]['distance']['text'];

  const currentItineraireSelectedDureeText = formatSecondsToHoursMinutes(currentItineraireSelectedDureeSeconds);

  // recapheureArriveeLabel.innerHTML = 
  recapDureeLabel.innerHTML = currentItineraireSelectedDureeText;
  recapDistanceLabel.innerHTML = currentItineraireSelectedDistanceText;
  recapheureArriveeLabel.innerHTML = calculerHeureArrivee(heureDepartInput.value, currentItineraireSelectedDureeSeconds);

  

  const currentVoitureSelectedDiv = document.querySelector('.voiture-card.selected');
  const currentVoitureSelectedSurnom = currentVoitureSelectedDiv.querySelector('.surnom').innerHTML;
  const currentVoitureSelectedMarque = currentVoitureSelectedDiv.querySelector('.marque').innerHTML;
  const currentVoitureSelectedModele = currentVoitureSelectedDiv.querySelector('.modele').innerHTML;
  const currentVoitureSelectedIsElectric = currentVoitureSelectedDiv.querySelector('.is-electric').innerHTML;
  const currentVoitureSelectedPlaces = currentVoitureSelectedDiv.querySelector('.places').innerHTML;

  recapVoitureSurnomLabel.innerHTML = currentVoitureSelectedSurnom;
  recapVoitureMarqueLabel.innerHTML = currentVoitureSelectedMarque;
  recapVoitureModeleLabel.innerHTML = currentVoitureSelectedModele;
  recapVoitureIsElectricLabel.innerHTML = currentVoitureSelectedIsElectric;
  recapVoiturePlacesLabel.innerHTML = currentVoitureSelectedPlaces;

  function formatSecondsToHoursMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');

    return `${h}:${m}`;
  }

  function calculerHeureArrivee(departIso, dureeSecondes) {
    const dateDepart = new Date(departIso);
    const dateArrivee = new Date(dateDepart.getTime() + dureeSecondes * 1000);

    const heures = dateArrivee.getHours().toString().padStart(2, '0');
    const minutes = dateArrivee.getMinutes().toString().padStart(2, '0');

    return `${heures}h${minutes}`;
}


})

recapitulatifBackBtn.addEventListener('click', function() {
  recapitulatifSection.style.display = "none";
  itinerairesSection.style.display = "flex";
})








