import { checkInputs, treatFormAlert } from "../app";

const contactForm = document.querySelector('form');

const contactFormInputs = contactForm.querySelectorAll('input, textarea');
const contactFormSubmitBtn = contactForm.querySelector('.submit-btn');

contactFormInputs.forEach((input) => {
    
    input.addEventListener("input", function() {
        checkInputs(contactForm);
    })
    
})

contactFormSubmitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    contactFormSubmitBtn.classList.add('inactive');

    fetch('/contact', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        // data.html contient ton formulaire rendu

        treatFormAlert(contactForm, 'Message envoyé', data);
        contactForm.reset();

        contactFormSubmitBtn.classList.add('inactive');

    })
    .catch(error => console.error('Erreur:', error));
})