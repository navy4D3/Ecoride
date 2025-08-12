function initAutocomplete() {
    const inputs = document.querySelectorAll('.adresse-autocomplete');
    inputs.forEach((input) => {
        new google.maps.places.Autocomplete(input, {
            types: ['establishment'],
            componentRestrictions: { country: 'fr' } // optionnel : limite à la France
        });
    });
}

// window.initAutocomplete = initAutocomplete;

// document.addEventListener('DOMContentLoaded', initAutocomplete);