const profilPictureBtn =  document.getElementById('profile-picture-btn');
const profilPictureInput =  document.getElementById('registration_step_two_photo_profil');
const profilPictureImg = document.getElementById("profile-picture-img");
const profilePicturePlusIcon = document.getElementById("plus-icon");

profilPictureBtn.addEventListener('click', function () {
    profilPictureInput.click();
});

profilPictureInput.addEventListener('change', function () {
    const imageUrl = URL.createObjectURL(this.files[0]);
    
    // profilPictureBtn.style.backgroundImage = imageUrl;
    // profilPictureBtn.style.backgroundColor = 'red';
    profilPictureBtn.style.backgroundImage = `url(${imageUrl})`;
    profilPictureBtn.style.backgroundSize = 'cover'; // optionnel
    profilPictureBtn.style.backgroundPosition = 'center'; // optionnel
    profilePicturePlusIcon.style.opacity = "0";

})

const dateNaissanceInput = document.getElementById('registration_step_two_date_naissance');

dateNaissanceInput.addEventListener('change', function () {
    const input = this.value;
    const messageEl = document.getElementById('message-majorite');
    
    if (!input) return;

    const birthDate = new Date(input);
    const today = new Date();
    const ageDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (birthDate > ageDate) {
        messageEl.textContent = "Il semble que tu aies moins de 18 ans. Tu pourras participer à des trajets uniquement en tant que passager.";
        messageEl.style.display = 'block';
    } else {
        messageEl.style.display = 'none';
    }
});


//rajouter boucle pour checkInputs


