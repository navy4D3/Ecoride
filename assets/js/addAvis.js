import { checkInputs } from "../app";

const isPositiveTrueBtn = document.getElementById('is-positive-true-btn');
const isPositiveFalseBtn = document.getElementById('is-positive-false-btn');
const isPositiveInput = document.getElementById('avis_isPositive');

isPositiveTrueBtn.addEventListener('click', function() {
    isPositiveInput.value = 1;
    this.classList.add('btn-green');
    this.classList.remove('btn-outline');

    isPositiveFalseBtn.classList.add('btn-outline');
    isPositiveFalseBtn.classList.remove('btn-green');

    const event = new Event("input", { bubbles: true });
    isPositiveInput.dispatchEvent(event);
})
isPositiveFalseBtn.addEventListener('click', function() {
    isPositiveInput.value = 0;
    this.classList.add('btn-green');
    this.classList.remove('btn-outline');

    isPositiveTrueBtn.classList.add('btn-outline');
    isPositiveTrueBtn.classList.remove('btn-green');

    const event = new Event("input", { bubbles: true });
    isPositiveInput.dispatchEvent(event);


})

const starBtns = document.querySelectorAll(".star");
const noteInput = document.getElementById('avis_note');

starBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
        noteInput.value = btn.id;
        let noteIndex = btn.id;

        const event = new Event("input", { bubbles: true });
        noteInput.dispatchEvent(event);

        for (let i = (parseInt(noteIndex)+1); i<6; i++) {
            document.getElementById(i).querySelector('.outline').style.display = "block";
            document.getElementById(i).querySelector('.fill').style.display = "none";

        }

        while (noteIndex > 0) {
            document.getElementById(noteIndex).querySelector('.outline').style.display = "none";
            document.getElementById(noteIndex).querySelector('.fill').style.display = "block";
            // toggleDisplay(document.getElementById(noteIndex).querySelector('.fill'));
            noteIndex -= 1;
        }
        
    })
})

const addAvisForm = document.querySelector('form');
const addAvisFormInputs = addAvisForm.querySelectorAll('input, textarea, select');

addAvisFormInputs.forEach((input) => {
    input.addEventListener('input', function() {
        checkInputs(addAvisForm);
    })
})


