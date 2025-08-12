export function initPreferencesBtnsEvents(selectedPreferences = []) {
    const preferencesBtns = document.querySelectorAll('.preference');
    const preferencesInput = document.getElementById('devenir_chauffeur_preferences');

    if (selectedPreferences.length) {
        selectedPreferences.forEach((preference) => {
            document.getElementById(preference).classList.add('active');
        })
    }  
    preferencesInput.value = selectedPreferences.length ? JSON.stringify(selectedPreferences) : "";  

    preferencesBtns.forEach((preference) => {
        preference.addEventListener('click', function(e) {
            e.preventDefault();

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

    

};