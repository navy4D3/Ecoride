const { showPopup, hidePopup } = require("../app");

const treatPositiveAvisBtns = document.querySelectorAll(".edit-avis-statut-btn");
const avisList = document.querySelector('.avis-section');

if (treatPositiveAvisBtns) {
    treatPositiveAvisBtns.forEach((btn) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault;
            const avisId = btn.dataset.avisId;
            let queryParameter = "";
    
            if (btn.classList.contains('visible')) {
                queryParameter = '?visible=true';
            }
    
            fetch('/avis/update-statut/' + avisId + queryParameter, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.statut == 'success') {
                    const avisToHide = document.getElementById(avisId);
    
                    avisToHide.remove();
    
                    if (avisList.childElementCount < 1 ) {
                        const element = document.createElement('p');
                        element.innerHTML = "Aucun avis à traiter.";
                        avisList.insertAdjacentElement('afterbegin', element);
                    }
    
    
                }
            })
            .catch(error => console.error('Erreur:', error));
        })
    })
}

const treatNegativeAvisBtns = document.querySelector('.btns-section').querySelectorAll('button');
const treatPaiementPopup = document.getElementById('treat-paiement-popup');
const closeTreatPaiementPopupBtn = treatPaiementPopup.querySelector('.close-popup-btn');
const validerTraitementBtn = treatPaiementPopup.querySelector('.valider-traitement');

const avisVisibilityPopup = document.getElementById('avis-visibility-popup');


if (treatNegativeAvisBtns) {
    treatNegativeAvisBtns.forEach((btn) => {
        btn.addEventListener('click', function() {
            const traitementTypeLabel = treatPaiementPopup.querySelector('.traitement-type');
            
            const paiementChauffeurLabel = treatPaiementPopup.querySelector('.chauffeur-paiement');
            const paiementPassagerLabel = treatPaiementPopup.querySelector('.passager-paiement');
            const finaliserTraitementBtns = document.querySelectorAll('.finaliser-traitement-btn');

            let coutTotalReservation = document.getElementById('cout-total-reservation').innerHTML;
            coutTotalReservation = coutTotalReservation.match(/(\d+)/)[0];

            if (btn.id =="valider") {
                traitementTypeLabel.innerHTML = "de valider";
                paiementChauffeurLabel.innerHTML = coutTotalReservation;
                paiementPassagerLabel.innerHTML = 0;
                finaliserTraitementBtns.forEach((btn) => btn.href += "&type=valider");
            } else if (btn.id =="equilibrer") {
                traitementTypeLabel.innerHTML = "d'equilibrer";
                paiementChauffeurLabel.innerHTML = Math.ceil(coutTotalReservation/2);
                paiementPassagerLabel.innerHTML = Math.ceil(coutTotalReservation/2);
                finaliserTraitementBtns.forEach((btn) => btn.href += "&type=equilibrer");
            } else {
                traitementTypeLabel.innerHTML = "de rembourser";
                paiementChauffeurLabel.innerHTML = 0;
                paiementPassagerLabel.innerHTML = coutTotalReservation;
                finaliserTraitementBtns.forEach((btn) => btn.href += "&type=rembourser");
            }

            paiementChauffeurLabel.innerHTML += " crédits";
            paiementPassagerLabel.innerHTML += " crédits";

            showPopup(treatPaiementPopup, 'flex');
        })
    })
}

if (closeTreatPaiementPopupBtn) {
    closeTreatPaiementPopupBtn.addEventListener('click', function() {
        hidePopup(treatPaiementPopup);
    })
}


if (validerTraitementBtn) {
    validerTraitementBtn.addEventListener('click', function() {
        hidePopup(treatPaiementPopup);
        showPopup(avisVisibilityPopup, 'flex');
    })
}



