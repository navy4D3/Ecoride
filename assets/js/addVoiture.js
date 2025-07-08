import {checkInputs, hidePopup, showErrors, showPopup, treatFormAlert} from '../app';
import {showSuccessAlert} from '../app';

export function addVoiture(previousElementId, currentCarId = null) {
    const fetchPath = currentCarId
        ? `/add-voiture?id=${encodeURIComponent(currentCarId)}`
        : "/add-voiture";
    
    fetch(fetchPath, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
        }
    })
    .then(response => response.json())
    .then(data => {
        // data.html contient ton formulaire rendu
        if (previousElementId) {
            document.getElementById(previousElementId).style.display = "none";
            const container = document.getElementById('body-content');

            if (container) {
                container.insertAdjacentHTML('beforeend',data.html);

                initMarqueInputInteraction();
                initAddVoitureFormBtns(previousElementId, currentCarId);

                if (currentCarId) {
                    const currentVoiture = document.getElementById(currentCarId);

                    document.getElementById('add_voiture_marque').value = currentVoiture.querySelector('.marque').innerHTML;
                }

                

            } else {
                console.error('Le container cible n\'existe pas : body-content');
            }
        }
    })
    .catch(error => console.error('Erreur:', error));
}

function initMarqueInputInteraction() {
  
    const marqueInput = document.getElementById('add_voiture_marque');
    const suggestionsBox = document.getElementById('suggestions-marque-box');
    const brands = JSON.parse(marqueInput.dataset.marqueList);
    let selected = false;
  
    marqueInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filtered = brands.filter(brand => brand.toLowerCase().includes(query)).slice(0, 10);
  
        suggestionsBox.innerHTML = '';
        selected = false;
        
        if (query !== "") {
            filtered.forEach(brand => {
                const li = document.createElement('li');
                li.textContent = brand;
                li.style.cursor = 'pointer';
                li.onclick = () => {
                    marqueInput.value = brand;
                    selected = true;
                    suggestionsBox.innerHTML = '';
                };
                suggestionsBox.appendChild(li);
            });
        }
        
    });
  
    // marqueInput.form.addEventListener('submit', function (e) {
    //     if (!brands.includes(marqueInput.value)) {
    //         e.preventDefault();
    //         alert("Veuillez sélectionner une marque valide dans la liste.");
    //     }
    // });
}

export function initAddVoitureFormBtns(divToShowId, currentCarId) {
    const currentDiv = document.getElementById('add-voiture-section');
    const addVoitureForm = document.getElementById("add-voiture-form");
    const addVoitureFormInputs = addVoitureForm.querySelectorAll('input, select, textarea');

    checkInputs(addVoitureForm);
    addVoitureFormInputs.forEach(input => {
        input.addEventListener('input', () => checkInputs(addVoitureForm))
    });

    const backBtn = document.getElementById('add-voiture-back-btn');

    backBtn.addEventListener('click', (e) => {
        document.getElementById('add-voiture-section').style.display = "none";
        document.getElementById(divToShowId).style.display = "flex";
    })

    const immatriculationInput = document.getElementById('add_voiture_immatriculation')
    immatriculationInput.addEventListener('keydown', function (e) {
        if (e.key === ' ') {
            e.preventDefault();
        }
    });

    const selectColorInput = document.getElementById('add_voiture_couleur');
    const colorIndicator = document.getElementById('color-view');

    const colorMap = {
        'Blanc': '#ffffff',
        'Noir': '#000000',
        'Gris foncé': '#555555',
        'Gris clair': '#d3d3d3',
        'Rouge': '#ff0000',
        'Bleu': '#0000ff',
        'Vert': '#008000',
        'Jaune': '#ffff00',
        'Orange': '#ffa500',
        'Marron': '#8b4513',
        'Violet': '#800080',
        'Beige': '#f5f5dc',
        'Rose': '#ffc0cb',
    };

    function updateColor() {
        const selected = selectColorInput.value;

        if (selected === '') { //style placeholder
            selectColorInput.classList.add('select-color-placeholder'); 
          } else {
            selectColorInput.classList.remove('select-color-placeholder');
          }
        
        //style color indicator
        colorIndicator.style.backgroundColor = colorMap[selected] || 'transparent';
    }

    selectColorInput.addEventListener('change', updateColor);
    updateColor(); // initialise au chargement

    const placesInput = document.getElementById('add_voiture_places')
    placesInput.addEventListener('input', function() {
        const maxSeats = 9;
        const value = parseInt(this.value, 10);
        
        if (isNaN(value)) return;

        if (value < 2) {
        placesInput.value = 2;
        } else if (value > maxSeats) {
        placesInput.value = maxSeats;
        }
    });

    
    const showDeleteVoiturePopupBtn = document.getElementById('show-delete-voiture-popup');



    if (showDeleteVoiturePopupBtn) {
        const deleteVoiturePopup = document.getElementById('delete-voiture-popup');
        const deleteVoitureBtn = document.getElementById('delete-voiture');
        const addVoitureForm = document.getElementById("add-voiture-form");

        showDeleteVoiturePopupBtn.addEventListener('click', function() {
            showPopup(deleteVoiturePopup, 'flex');
        })

        deleteVoitureBtn.addEventListener('click', function(e) {
            e.preventDefault();
    
            fetch('delete-voiture/' + currentCarId, {
                method: 'POST',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur HTTP : ' + response.status);
        
                }
                return response.json();
            })
            .then(data => {
                if (data.status && data.status == "success") {
                    document.getElementById(divToShowId).style.display="flex";
    
                    document.getElementById(currentCarId).remove();
                    currentDiv.style.display="none";
        
                    showSuccessAlert('Voiture supprimé avec succès');
        
                    initUserVoitureBtns(divToShowId,currentCarId);
                } else {
                    treatFormAlert(addVoitureForm, '', data);
                    hidePopup(deleteVoiturePopup);
                }
        
            })
    
        })
    }
    

    const submitAddVoitureFormBtn = document.getElementById('add-voiture-submit');

    submitAddVoitureFormBtn.addEventListener('click', function(e) {
        e.preventDefault();
        treatAddVoitureForm(divToShowId, currentCarId);
    })
}

function treatAddVoitureForm(divToShowId, currentCarId = null) {
    const form = document.getElementById("add-voiture-form");
    const formData = new FormData(form);
    const currentDiv = document.getElementById('add-voiture-section');

    const fetchPath = currentCarId
        ? `/add-voiture?id=${encodeURIComponent(currentCarId)}`
        : "/add-voiture";
    
    
    fetch(fetchPath, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);

        }
        return response.json();
    })
    .then(data => {
        if (data.status && data.status == "success") {
            document.getElementById(divToShowId).style.display="flex";
            currentDiv.style.display="none";

            const voituresListDiv = document.getElementById('user-voitures');

            if (!currentCarId) {
                const newVoitureDiv = document.createElement('div');
                newVoitureDiv.classList.add("voiture-card");
                newVoitureDiv.id = data.voiture.id;

                newVoitureDiv.innerHTML = `
                    <span class="surnom">${data.voiture.surnom}</span>
                    <div>
                        <span class="marque">${data.voiture.marque}</span>
                        <span class="modele">${data.voiture.modele}</span>
                        <span class="is-electric">${data.voiture.isElectric ? 'Electrique' : 'Thermique'}</span>
                        <span class="places fw-bold">${data.voiture.places} place${data.voiture.places > 1 ? 's' : ''}</span>
                    </div>
                `

                voituresListDiv.insertAdjacentElement('afterbegin',newVoitureDiv);
                showSuccessAlert('Voiture ajouté avec succès');

            } else {
                const currentVoitureDiv = document.getElementById(currentCarId);

                currentVoitureDiv.innerHTML = `
                    <span class="surnom">${data.voiture.surnom}</span>
                    <div>
                        <span class="marque">${data.voiture.marque}</span>
                        <span class="modele">${data.voiture.modele}</span>
                        <span class="is-electric">${data.voiture.isElectric ? 'Electrique' : 'Thermique'}</span>
                        <span class="places fw-bold">${data.voiture.places} place${data.voiture.places > 1 ? 's' : ''}</span>
                    </div>
                `;

                showSuccessAlert('Voiture modifié avec succès');
            }

            initUserVoitureBtns(divToShowId, currentCarId);


            //lignes de code applicable a la page devenir chauffeur
            const hasVoitureInput = document.getElementById('devenir_chauffeur_hasVoiture');
            const voitureCards = document.querySelectorAll('.voiture-card');

            if (hasVoitureInput) {
                if (voitureCards.length > 0) {
                    hasVoitureInput.checked = true;
                    hasVoitureInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
            
            //appliquer fonction JS pour selection
        } else {
            const currentParentDiv = document.getElementById('body-content');

            currentDiv.remove();
            currentParentDiv.insertAdjacentHTML('beforeend',data.html);
            initAddVoitureFormBtns(divToShowId, currentCarId);
            initMarqueInputInteraction();
        }
    })
}

export function initUserVoitureBtns(divToShowId, currentCarId = null) {
    const userVoituresBtns = document.querySelectorAll(".voiture-card");
    const voitureInput =  document.querySelector('.voiture-input');

    if (!currentCarId) {
        userVoituresBtns.forEach(voitureBtn => {
            if (voitureBtn.dataset.listenerAttached === 'true') {
                return; // Ne rien faire si déjà attaché
            }

            voitureBtn.addEventListener('click', function(e) {
                e.preventDefault();
              const currentVoitureId = voitureBtn.id;
              userVoituresBtns.forEach(voitureBtn => voitureBtn.classList.remove('selected'));


              this.classList.add('selected');
              voitureInput.value = currentVoitureId;
              //declenche event sur voiture manuellement
              const event = new Event("input", { bubbles: true });
              voitureInput.dispatchEvent(event);
              
              if (!window.location.href.includes('publier-trajet')) {
                showAddVoitureForm(divToShowId, voitureBtn.id);
            }
              

              voitureBtn.dataset.listenerAttached = 'true';
        
            })
          })
    } 
  
    
}

export function showAddVoitureForm(divToHideId, currentCarId = null) {
    const addVoitureDiv = document.getElementById('add-voiture-section');

    if (addVoitureDiv) {
        addVoitureDiv.remove();
    }
    
    addVoiture(divToHideId, currentCarId);
        
    


}