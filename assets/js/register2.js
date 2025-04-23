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



