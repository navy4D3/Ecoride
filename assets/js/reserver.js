const { showPopup, hidePopup } = require("../app");


document.addEventListener('DOMContentLoaded', () => {
    const showPopupBtn = document.getElementById('show-add-credits-section-btn');
    const addCreditsSection = document.querySelector('.add-credits');
    const addCreditsBtn = document.getElementById('add-credits-btn');
    const creditsSelect = document.getElementById('credits-select');

    // Afficher le popup
    if (showPopupBtn) {
        showPopupBtn.addEventListener('click', () => {
            showPopup(addCreditsSection, "flex");
        });
    }
    

    // Appel AJAX/FETCH au clic sur "Valider"
    addCreditsBtn.addEventListener('click', () => {
        const selectedCredits = creditsSelect.value;

        fetch(`/ajouter-credits?credits=${selectedCredits}`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("Erreur lors de l'ajout des crédits.");
            return response.json(); // ou .text() selon ce que retourne ton endpoint
        })
        .then(data => {
            alert(`Succès : ${selectedCredits} crédits ajoutés !`);

            hidePopup(addCreditsSection);
            const userCreditsLabel = document.getElementById('user-credits')
            userCreditsLabel.innerText = data.credits + "¢";

            const creditsNeeded = parseInt(document.getElementById('credits-needed').innerText.replace(/\D/g, ''), 10);

            if (parseInt(data.credits, 10) >= creditsNeeded) {
                userCreditsLabel.style.color = "#386150";
            }
            // Tu peux mettre à jour le solde ici si tu veux
        })
        .catch(error => {
            alert("Une erreur s'est produite : " + error.message);
        });
    });
});

function initContinueBtnEvent() {
    const continueBtn = document.getElementById('continue-btn');

    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const recap1Section = document.getElementById('recap-1');
            const recap2Section = document.getElementById('recap-2');

            recap1Section.style.display =  "none";
            recap2Section.style.display =  "flex";
            

        })
    }
}
initContinueBtnEvent();