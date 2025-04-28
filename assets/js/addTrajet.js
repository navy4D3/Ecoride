const hoursSelect = document.getElementById('hours');
const minutesSelect = document.getElementById('minutes');

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

hoursSelect.addEventListener('change', function() {
    updatePlaceholder(this);
  });

minutesSelect.addEventListener('change', function() {
updatePlaceholder(this);
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

const firstSection = document.getElementById('trajet-details');
const secondSection = document.getElementById('itineraires-choices');

function rechercherItineraire(origin, destination) {
    fetch(`/publier-trajet/itineraires?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`)
        .then(response => response.json())
        .then(data => {
        // console.log('Trajet trouvé :', data['routes']['legs']['duration'] + " " + data['routes']['legs']['distance'] );
        // console.log('Trajet trouvé :', data['routes'][0]['legs'][0]['distance']['text'] + " " + data['routes'][0]['legs'][0]['duration']['text']);
        console.log('Trajet trouvé :', data);

        const itinerairesList = document.getElementById('itineraires-list');

        data.forEach(route => {
            const routeElement = document.createElement('div');
            routeElement.classList.add('itineraire');
            const summaryText = route.hasToll ? `${route.summary} - Avec péage ` : 'Sans péage';

            routeElement.innerHTML = `
                <strong>${summaryText}</strong>
                <span>${route.distance} - ${route.duree}</span>
            `;

            itinerairesList.append(routeElement);
        });
        
        firstSection.style.display = "none";
        secondSection.style.display = "flex";

        document.querySelectorAll('.itineraire').forEach(function(itineraire) {
            itineraire.addEventListener('click', function() {
                document.querySelectorAll('.itineraire').forEach(itineraire => itineraire.classList.remove('selected'));
                this.classList.add('selected');
                
            })
        })
        
        })
        .catch(error => {
        console.error('Erreur :', error);
    });
}

const continueBtn = document.getElementById('continue-btn');
const departInput = document.getElementById('add_trajet_lieuDepart');
const arriveeInput = document.getElementById('add_trajet_lieuArrivee');

const backBtn = document.getElementById('back-btn');

continueBtn.addEventListener('click', function(e) {
    e.preventDefault();

    rechercherItineraire(departInput.value, arriveeInput.value);


})

backBtn.addEventListener('click', function() {
    firstSection.style.display = "flex";
    secondSection.style.display = "none";
})



