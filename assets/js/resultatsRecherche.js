
document.addEventListener("DOMContentLoaded", function () {
    const mobileToggleFilter = document.getElementById('toggle-filter-mobile');
    const filtersSection = document.getElementById('filters-section');
    const blurEffectDiv = document.querySelector('.blur-effect')

    mobileToggleFilter.addEventListener("click", function () {
        filtersSection.classList.toggle("visible");
        blurEffectDiv.classList.toggle('visible');
    });

    const mobileShowSearchForm = document.getElementById("show-form-mobile");
    const mobileHideSearchForm = document.getElementById('hide-form-btn-mobile');
    const searchFormDiv = document.querySelector('.form-div');

    mobileShowSearchForm.addEventListener('click', function() {
        searchFormDiv.classList.add("visible");
        blurEffectDiv.classList.add('visible');
    })
    mobileHideSearchForm.addEventListener('click', function() {
        searchFormDiv.classList.remove("visible");
        blurEffectDiv.classList.remove('visible');
    })

    const inputsLabels = document.querySelectorAll('label');
    const radioInputsLabels = document.querySelectorAll('.radio-label');

    inputsLabels.forEach((label) => {
        label.addEventListener('click', function() {
            //definir la logique sur pc
            label.classList.toggle('active');
        })
    })

    radioInputsLabels.forEach((label) => {
        label.addEventListener('click', function(e) {
            radioInputsLabels.forEach((label) => {
                    label.classList.remove('active');
                }
            );
            //definir la logique sur pc
            this.classList.toggle('active');


        })
    })

    const seeResultsFilterBtn = document.getElementById('see-results-filter-btn');
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    const emptyMessage = document.getElementById('empty-message');
    const alternativeMessage = document.getElementById('alternative-message');

    seeResultsFilterBtn.addEventListener('click', function() {
        filtersSection.classList.remove('visible');
        blurEffectDiv.classList.remove('visible');
    })

    resetFiltersBtn.addEventListener('click', function() {
        document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
            input.checked = false;
        });

        filtersSection.classList.remove('visible');
        blurEffectDiv.classList.remove('visible');

        inputsLabels.forEach((label) => {
            label.classList.remove('active');
        })

        document.querySelectorAll('.trajet-div').forEach(trajet => {
            trajet.style.display = "block";
        })

        if (document.querySelectorAll('.trajet').length > 0) {
            emptyMessage.classList.remove('visible');
        }
        //gerer le cas ou des le premier chargement pas de résultat. Il faudrait dans ce cas cacher la rubrique filtre
        if (alternativeMessage) {
            alternativeMessage.style.display = 'block';
        }

        resetFiltersBtn.style.display = "none";

        

    })

    function appliquerFiltres() {
        const notes = Array.from(document.querySelectorAll('input[name="note"]:checked')).map(el => el.value);
        const electrique = document.querySelector('input[name="electric"]:checked')?.value;
        const heures = Array.from(document.querySelectorAll('input[name="date_depart"]:checked')).map(el => el.value);
        resetFiltersBtn.style.display = 'block';
        

        let isAllTrajetsHidden = true;
        
        document.querySelectorAll('.trajet-div').forEach(trajet => {
            const note = parseFloat(trajet.dataset.note || 0);
            const isElectrique = trajet.dataset.electrique === '1';
            const heureDepart = trajet.dataset.heureDepart || "00:00";
    
            let visible = true;
    
            // Note
            if (notes.length) {
                visible = notes.some(val => {
                    if (val === 'plus_4') return note >= 4;
                    if (val === 'plus_3') return note >= 3;
                    return true;
                });
            }
    
            // Électrique
            if (visible && electrique) {
                visible = (electrique === '1') === isElectrique;
            }

            // Filtre Heure de départ
            if (visible && heures.length) {
                const [h, m] = heureDepart.split(':').map(Number);
                const totalMinutes = h * 60 + m;
    
                visible = heures.some(val => {
                    if (val === 'avant_6h') return totalMinutes < 360;
                    if (val === '6h_12h') return totalMinutes >= 360 && totalMinutes < 720;
                    if (val === '12h_18h') return totalMinutes >= 720 && totalMinutes < 1080;
                    if (val === 'apres_18h') return totalMinutes >= 1080;
                    return true;
                });
            }


            // Filtre Durée. Adapter pour trier
            // if (visible && duree) {
            //     visible = (
            //         (duree === 'moins_1h' && dureeTrajet < 3600) ||
            //         (duree === '1h_2h' && dureeTrajet >= 3600 && dureeTrajet <= 7200) ||
            //         (duree === 'plus_2h' && dureeTrajet > 7200)
            //     );
            // }

            if (visible) {
                isAllTrajetsHidden = false;
            }
    
            // Affichage
            trajet.style.display = visible ? '' : 'none';
        });

        if (isAllTrajetsHidden) {
            emptyMessage.classList.add('visible');

            if (alternativeMessage) {
                alternativeMessage.style.display = "none";
            }
        } else {
            emptyMessage.classList.remove('visible');

            if (alternativeMessage) {
                alternativeMessage.style.display = "block";
            }
        }
    }

    function trier() {
        const critere = document.querySelector('input[name="sort"]:checked')?.value;
        const trajetsContainer = document.querySelector('.trajets'); // adapte le sélecteur si besoin
        const trajets = Array.from(trajetsContainer.querySelectorAll('.trajet-div'));

        resetFiltersBtn.style.display = "flex";
    
        // Fonction de comparaison selon le critère sélectionné
        const compare = {
            'prix': (a, b) => parseFloat(a.dataset.prix) - parseFloat(b.dataset.prix),
            'duree': (a, b) => parseInt(a.dataset.duree) - parseInt(b.dataset.duree),
            'note_chauffeur': (a, b) => parseFloat(b.dataset.note || 0) - parseFloat(a.dataset.note || 0),
        };
    
        if (critere && compare[critere]) {
            trajets
                .sort(compare[critere])
                .forEach(trajet => trajetsContainer.appendChild(trajet)); // réinsère dans l'ordre trié
        }
    }
    



    document.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', appliquerFiltres);
    });

    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', trier);
    });
    
});