"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["profil"],{

/***/ "./assets/js/initPreferencesBtnsEvents.js":
/*!************************************************!*\
  !*** ./assets/js/initPreferencesBtnsEvents.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initPreferencesBtnsEvents: () => (/* binding */ initPreferencesBtnsEvents)
/* harmony export */ });
function initPreferencesBtnsEvents() {
  var selectedPreferences = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var preferencesBtns = document.querySelectorAll('.preference');
  var preferencesInput = document.getElementById('devenir_chauffeur_preferences');
  if (selectedPreferences.length) {
    selectedPreferences.forEach(function (preference) {
      document.getElementById(preference).classList.add('active');
    });
  }
  preferencesInput.value = selectedPreferences.length ? JSON.stringify(selectedPreferences) : "";
  preferencesBtns.forEach(function (preference) {
    preference.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('active');
      var index = selectedPreferences.indexOf(preference.id);
      if (index === -1) {
        // Ajout si pas encore sélectionné
        selectedPreferences.push(preference.id);
      } else {
        // Retrait si déjà présent
        selectedPreferences.splice(index, 1);
      }
      preferencesInput.value = selectedPreferences.length ? JSON.stringify(selectedPreferences) : "";
      preferencesInput.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    });
  });
}
;

/***/ }),

/***/ "./assets/js/profil.js":
/*!*****************************!*\
  !*** ./assets/js/profil.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var heic2any__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! heic2any */ "./node_modules/heic2any/dist/heic2any.js");
/* harmony import */ var heic2any__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(heic2any__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _addVoiture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addVoiture */ "./assets/js/addVoiture.js");
/* harmony import */ var _initPreferencesBtnsEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initPreferencesBtnsEvents */ "./assets/js/initPreferencesBtnsEvents.js");
var _require = __webpack_require__(/*! ../app */ "./assets/app.js"),
  checkInputs = _require.checkInputs,
  showErrors = _require.showErrors,
  showSuccessAlert = _require.showSuccessAlert,
  treatFormAlert = _require.treatFormAlert,
  checkPasswordValidity = _require.checkPasswordValidity,
  checkRegisterFormValidity = _require.checkRegisterFormValidity;



var trajetsBtn = document.getElementById('trajets');
var myDataBtn = document.getElementById('mes-informations');
var parametresBtn = document.getElementById('parametres');
var trajetsSection = document.querySelector('.trajet-section');
var myDataSection = document.querySelector('.my-data-section');
var espaceChauffeurSection = document.querySelector('.espace-chauffeur-section');
var profilNavbar = document.querySelector('.profil-navbar');
var profilNavbarBtns = profilNavbar.querySelectorAll('div');
profilNavbarBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.id == "espace-chauffeur" && btn.dataset.isChauffeur == "") {
      window.location.href = "/devenir-chauffeur";
      return;
    }
    profilNavbarBtns.forEach(function (btn) {
      btn.classList.remove('selected');
    });
    var currentSection = document.querySelector('.current-section');
    currentSection.style.display = "none";
    currentSection.classList.toggle('current-section');

    //gere la redirection de l'espace chauffeur en fonction de si user deja chauffeur ou non

    // cache la sectionr ajouté add-voiture liée a espace chauffeur
    var addvoitureSection = document.getElementById('add-voiture-section');
    if (addvoitureSection && addvoitureSection.style.display == "flex") {
      addvoitureSection.style.display = "none";
    }
    var nextSection = document.querySelector(".".concat(this.id, "-section"));
    nextSection.style.display = "flex";
    nextSection.classList.toggle('current-section');
    this.classList.add('selected');
  });
});
var editProfilPictureBtn = document.getElementById('edit-profil-icon');
var profilPictureInput = document.getElementById('registration_step_two_photo_profil');
var myDataForm = document.getElementById('my-data-form');
initFormInputsValidation(myDataForm);
function initFormInputsValidation(form) {
  var inputs = form.querySelectorAll('input, select, textarea');
  var submitBtn = form.querySelector('.submit-btn');
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      submitBtn.classList.remove('inactive');
    });
  });
}
editProfilPictureBtn.addEventListener('click', function () {
  profilPictureInput.click();
});
profilPictureInput.addEventListener('change', function () {
  var profilPictureImg = document.getElementById('profil-picture-img');
  profilPictureImg.style.opacity = "75%";
  editProfilPictureBtn.style.display = "none";
  submitMyDataFormBtn.classList.add('inactive');
  var file = this.files[0];
  if (!file) return;
  var maxWidth = 1024;
  var quality = 0.5;
  var mimeType = file.type.toLowerCase();

  // Si HEIC/HEIF, on convertit en JPEG d'abord
  if (mimeType === 'image/heic' || mimeType === 'image/heif') {
    heic2any__WEBPACK_IMPORTED_MODULE_0___default()({
      blob: file,
      toType: "image/jpeg",
      quality: quality
    }).then(function (blob) {
      return compressAndResizeImage(blob, maxWidth, quality);
    }).then(processCompressedBlob).then(function () {
      profilPictureImg.style.opacity = "100%";
      editProfilPictureBtn.style.display = "block";
      submitMyDataFormBtn.classList.remove('inactive');
    })["catch"](console.error);
  } else {
    compressAndResizeImage(file, maxWidth, quality).then(processCompressedBlob).then(function () {
      profilPictureImg.style.opacity = "100%";
      editProfilPictureBtn.style.display = "block";
      submitMyDataFormBtn.classList.remove('inactive');
    })["catch"](console.error);
  }
  function processCompressedBlob(blob) {
    var imageUrl = URL.createObjectURL(blob);
    var profilPictureImg = document.getElementById('profil-picture-img');
    profilPictureImg.src = imageUrl;

    // Remplace le fichier dans l'input par le blob compressé
    var compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
      type: 'image/jpeg'
    });
    var dataTransfer = new DataTransfer();
    dataTransfer.items.add(compressedFile);
    profilPictureInput.files = dataTransfer.files;
  }
});
function compressAndResizeImage(file, maxWidth) {
  var quality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.8;
  return new Promise(function (resolve, reject) {
    var img = new Image();
    var reader = new FileReader();
    reader.onload = function (event) {
      img.src = event.target.result;
    };
    img.onload = function () {
      var ratio = maxWidth / img.width;
      var width = Math.min(img.width, maxWidth);
      var height = img.height * ratio;
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(function (blob) {
        if (blob) resolve(blob);else reject(new Error("Compression de l'image a échoué"));
      }, 'image/jpeg', quality);
    };
    reader.onerror = function (e) {
      return reject(e);
    };
    reader.readAsDataURL(file);
  });
}
var submitMyDataFormBtn = document.getElementById('submit-my-data-form-btn');
submitMyDataFormBtn.addEventListener('click', function (e) {
  submitMyDataFormBtn.classList.add('inactive');
  var formData = new FormData(myDataForm);
  e.preventDefault();
  fetch('/user/update-data', {
    method: 'POST',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    // data.html contient ton formulaire rendu

    treatFormAlert(myDataForm, 'Données mises à jour avec succès', data);

    // if (data.status == "success") {
    //     showSuccessAlert('Informations mises à jour avec succès');

    // } else {
    //     alert(data.errors);
    //     data.errors.forEach((error) => {
    //         alert(error.message)
    //     })

    //     //completer pour bien maitriser les erreurs
    //     showErrors(data.errors);
    // }
  })["catch"](function (error) {
    return console.error('Erreur:', error);
  });
});
var espaceChauffeurBtn = document.getElementById('espace-chauffeur');
// const preferencesInput = document.getElementById('devenir_chauffeur_preferences');
var espaceChauffeurForm = document.getElementById('devenir-chauffeur-form');
var submitEspaceChauffeurFormBtn = espaceChauffeurForm.querySelector('.submit-btn');
initFormInputsValidation(espaceChauffeurForm);
var isPreferencesBtnsEventsInit = false;
espaceChauffeurBtn.addEventListener('click', function () {
  var preferencesContainer = document.querySelector('.preferences-list');
  var userPreferencesDataset = preferencesContainer.dataset.userPreferences;
  var userPreferences = userPreferencesDataset !== "" ? userPreferencesDataset.split(',') : [];
  if (!isPreferencesBtnsEventsInit) {
    (0,_initPreferencesBtnsEvents__WEBPACK_IMPORTED_MODULE_2__.initPreferencesBtnsEvents)(userPreferences);
    isPreferencesBtnsEventsInit = true;
  }
});
submitEspaceChauffeurFormBtn.addEventListener('click', function (e) {
  submitEspaceChauffeurFormBtn.classList.add('inactive');
  var formData = new FormData(espaceChauffeurForm);
  e.preventDefault();
  fetch('/user/update-chauffeur-data', {
    method: 'POST',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    treatFormAlert(espaceChauffeurForm, 'Informations modifiés avec succès', data);
  })["catch"](function (error) {
    return console.error('Erreur:', error);
  });
});
var voituresBtns = document.querySelectorAll('.voiture-card');
var addVoitureBtn = document.getElementById('add-voiture-btn');
voituresBtns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    (0,_addVoiture__WEBPACK_IMPORTED_MODULE_1__.showAddVoitureForm)(espaceChauffeurSection.id, btn.id);
  });
  btn.dataset.listenerAttached = 'true';
});
addVoitureBtn.addEventListener('click', function (e) {
  e.preventDefault();
  (0,_addVoiture__WEBPACK_IMPORTED_MODULE_1__.showAddVoitureForm)(espaceChauffeurSection.id);
});
var parametresSection = document.querySelector(".parametres-section");
var avisSection = document.querySelector('.parametres-section-avis');
var mailAndPasswordSection = document.querySelector('.parametres-section-mail-password');
var parametresSectionBtns = document.querySelector('.parametres-section-btns');
var avisBtn = document.getElementById('avis-btn');
var mailAndPasswordBtn = document.getElementById('mail-and-password-btn');
avisBtn.addEventListener('click', function () {
  avisSection.style.display = "flex";
  parametresSectionBtns.style.display = "none";
});
mailAndPasswordBtn.addEventListener('click', function () {
  mailAndPasswordSection.style.display = "flex";
  parametresSectionBtns.style.display = "none";
});
var parametresSectionBackBtns = parametresSection.querySelectorAll(".back-btn");
parametresSectionBackBtns.forEach(function (backBtn) {
  backBtn.addEventListener('click', function () {
    var currentSubSection = backBtn.parentElement.parentElement;
    currentSubSection.style.display = "none";
    parametresSectionBtns.style.display = "flex";
  });
});
var avisRecusBtn = document.getElementById('avis-recus-btn');
var avisPubliesBtn = document.getElementById('avis-publies-btn');
var avisRecusSection = avisSection.querySelector('.avis-recus-section');
var avisPubliesSection = avisSection.querySelector('.avis-publies-section');
avisRecusBtn.addEventListener('click', function () {
  avisPubliesSection.style.display = "none";
  avisRecusSection.style.display = "flex";
  avisRecusBtn.classList.add('selected');
  avisPubliesBtn.classList.remove('selected');
});
avisPubliesBtn.addEventListener('click', function () {
  avisRecusSection.style.display = "none";
  avisPubliesSection.style.display = "flex";
  avisRecusBtn.classList.remove('selected');
  avisPubliesBtn.classList.add('selected');
});
var showEditMailSectionBtn = document.getElementById('show-edit-mail-form-btn');
var editMailSection = document.querySelector('.parametres-section-mail');
showEditMailSectionBtn.addEventListener('click', function () {
  editMailSection.style.display = "flex";
  mailAndPasswordSection.style.display = "none";
});
var editMailForm = document.querySelector('.edit-mail-form');
var submitEditMailFormBtn = editMailForm.querySelector('.submit-btn');
var editMailFormInputs = editMailForm.querySelectorAll('input, select, textarea');
// const editMailFormEmailInput = document.getElementById('edit_mail_email');

editMailFormInputs.forEach(function (input) {
  input.addEventListener('input', function () {
    checkInputs(editMailForm);
  });
});
submitEditMailFormBtn.addEventListener('click', function (e) {
  e.preventDefault();
  submitEditMailFormBtn.classList.add('inactive');
  var formData = new FormData(editMailForm);
  fetch('/edit-mail', {
    method: 'POST',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
    }
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('Erreur réseau');
    }
    return response.json();
  }).then(function (data) {
    // data.html contient ton formulaire rendu

    treatFormAlert(editMailForm, 'Informations mises à jour avec succès', data);
    editMailForm.reset();
    var event = new Event('input', {
      bubbles: true
    });
  })["catch"](function (error) {
    return console.error('Erreur:', error);
  });
});
var showEditPasswordSectionBtn = document.getElementById('show-edit-password-form-btn');
var editPasswordSection = document.querySelector('.parametres-section-password');
showEditPasswordSectionBtn.addEventListener('click', function () {
  editPasswordSection.style.display = "flex";
  mailAndPasswordSection.style.display = "none";
});
var editPasswordForm = document.querySelector('.edit-password-form');
var passwordInput = document.getElementById('edit_password_password_first');
var confirmPasswordInput = document.getElementById('edit_password_password_second');
var currentPasswordInput = document.getElementById('edit_password_currentPassword');
var submitEditPasswordFormBtn = editPasswordForm.querySelector('.submit-btn');
currentPasswordInput.addEventListener('input', function () {
  checkRegisterFormValidity(editPasswordForm, passwordInput, confirmPasswordInput, null, currentPasswordInput);
});
passwordInput.addEventListener('input', function () {
  checkPasswordValidity('edit_password_password_first');
  checkRegisterFormValidity(editPasswordForm, passwordInput, confirmPasswordInput, null, null, currentPasswordInput);
});
confirmPasswordInput.addEventListener('input', function () {
  checkPasswordValidity('edit_password_password_first');
  checkRegisterFormValidity(editPasswordForm, passwordInput, confirmPasswordInput, null, null, currentPasswordInput);
});
submitEditPasswordFormBtn.addEventListener('click', function (e) {
  e.preventDefault();
  submitEditPasswordFormBtn.classList.add('inactive');
  var formData = new FormData(editPasswordForm);
  fetch('/edit-password', {
    method: 'POST',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
    }
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('Erreur réseau');
    }
    return response.json();
  }).then(function (data) {
    // data.html contient ton formulaire rendu

    treatFormAlert(editPasswordForm, 'Informations mises à jour avec succès', data);
    editPasswordForm.reset();
    var event = new Event('input', {
      bubbles: true
    });
    passwordInput.dispatchEvent(event);
  })["catch"](function (error) {
    return console.error('Erreur:', error);
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_heic2any_dist_heic2any_js","assets_styles_app_scss","assets_app_js","assets_js_addVoiture_js"], () => (__webpack_exec__("./assets/js/profil.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO0VBRW5ELElBQU04RyxRQUFRLEdBQUcsSUFBSUMsUUFBUSxDQUFDMEMsZ0JBQWdCLENBQUM7RUFFL0N6QyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7SUFDcEJDLE1BQU0sRUFBRSxNQUFNO0lBQ2RDLElBQUksRUFBRUosUUFBUTtJQUNkSyxPQUFPLEVBQUU7TUFDTCxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQztJQUN6QztFQUNKLENBQUMsQ0FBQyxDQUNEOUMsSUFBSSxDQUFDLFVBQUErQyxRQUFRLEVBQUk7SUFDZCxJQUFJLENBQUNBLFFBQVEsQ0FBQ2lDLEVBQUUsRUFBRTtNQUNkLE1BQU0sSUFBSTFDLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDcEM7SUFDQSxPQUFPUyxRQUFRLENBQUNDLElBQUksQ0FBQyxDQUFDO0VBQzFCLENBQUMsQ0FBQyxDQUNEaEQsSUFBSSxDQUFDLFVBQUFpRCxJQUFJLEVBQUk7SUFDVjs7SUFFQWpHLGNBQWMsQ0FBQ29JLGdCQUFnQixFQUFFLHVDQUF1QyxFQUFFbkMsSUFBSSxDQUFDO0lBQy9FbUMsZ0JBQWdCLENBQUNILEtBQUssQ0FBQyxDQUFDO0lBQ3hCLElBQU16RCxLQUFLLEdBQUcsSUFBSS9FLEtBQUssQ0FBQyxPQUFPLEVBQUU7TUFDN0JDLE9BQU8sRUFBRTtJQUNiLENBQUMsQ0FBQztJQUVGMkksYUFBYSxDQUFDN0ksYUFBYSxDQUFDZ0YsS0FBSyxDQUFDO0VBRXRDLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQXBCLEtBQUs7SUFBQSxPQUFJRCxPQUFPLENBQUNDLEtBQUssQ0FBQyxTQUFTLEVBQUVBLEtBQUssQ0FBQztFQUFBLEVBQUM7QUFDcEQsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2luaXRQcmVmZXJlbmNlc0J0bnNFdmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3Byb2ZpbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaW5pdFByZWZlcmVuY2VzQnRuc0V2ZW50cyhzZWxlY3RlZFByZWZlcmVuY2VzID0gW10pIHtcbiAgICBjb25zdCBwcmVmZXJlbmNlc0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZmVyZW5jZScpO1xuICAgIGNvbnN0IHByZWZlcmVuY2VzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGV2ZW5pcl9jaGF1ZmZldXJfcHJlZmVyZW5jZXMnKTtcblxuICAgIGlmIChzZWxlY3RlZFByZWZlcmVuY2VzLmxlbmd0aCkge1xuICAgICAgICBzZWxlY3RlZFByZWZlcmVuY2VzLmZvckVhY2goKHByZWZlcmVuY2UpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZlcmVuY2UpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9KVxuICAgIH0gIFxuICAgIHByZWZlcmVuY2VzSW5wdXQudmFsdWUgPSBzZWxlY3RlZFByZWZlcmVuY2VzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkUHJlZmVyZW5jZXMpIDogXCJcIjsgIFxuXG4gICAgcHJlZmVyZW5jZXNCdG5zLmZvckVhY2goKHByZWZlcmVuY2UpID0+IHtcbiAgICAgICAgcHJlZmVyZW5jZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2VsZWN0ZWRQcmVmZXJlbmNlcy5pbmRleE9mKHByZWZlcmVuY2UuaWQpO1xuICAgIFxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIEFqb3V0IHNpIHBhcyBlbmNvcmUgc8OpbGVjdGlvbm7DqVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJlZmVyZW5jZXMucHVzaChwcmVmZXJlbmNlLmlkKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0cmFpdCBzaSBkw6lqw6AgcHLDqXNlbnRcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFByZWZlcmVuY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmVmZXJlbmNlc0lucHV0LnZhbHVlID0gc2VsZWN0ZWRQcmVmZXJlbmNlcy5sZW5ndGggPyBKU09OLnN0cmluZ2lmeShzZWxlY3RlZFByZWZlcmVuY2VzKSA6IFwiXCI7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgcHJlZmVyZW5jZXNJbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBcblxufTsiLCJjb25zdCB7IGNoZWNrSW5wdXRzLCBzaG93RXJyb3JzLCBzaG93U3VjY2Vzc0FsZXJ0LCB0cmVhdEZvcm1BbGVydCwgY2hlY2tQYXNzd29yZFZhbGlkaXR5LCBjaGVja1JlZ2lzdGVyRm9ybVZhbGlkaXR5IH0gPSByZXF1aXJlKFwiLi4vYXBwXCIpO1xuaW1wb3J0IGhlaWMyYW55IGZyb20gJ2hlaWMyYW55JztcbmltcG9ydCB7IHNob3dBZGRWb2l0dXJlRm9ybSB9IGZyb20gJy4vYWRkVm9pdHVyZSc7XG5pbXBvcnQgeyBpbml0UHJlZmVyZW5jZXNCdG5zRXZlbnRzIH0gZnJvbSAnLi9pbml0UHJlZmVyZW5jZXNCdG5zRXZlbnRzJztcblxuY29uc3QgdHJhamV0c0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFqZXRzJyk7XG5jb25zdCBteURhdGFCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzLWluZm9ybWF0aW9ucycpO1xuXG5jb25zdCBwYXJhbWV0cmVzQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFtZXRyZXMnKTtcblxuY29uc3QgdHJhamV0c1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHJhamV0LXNlY3Rpb24nKTtcbmNvbnN0IG15RGF0YVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktZGF0YS1zZWN0aW9uJyk7XG5jb25zdCBlc3BhY2VDaGF1ZmZldXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVzcGFjZS1jaGF1ZmZldXItc2VjdGlvbicpO1xuXG5jb25zdCBwcm9maWxOYXZiYXIgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbC1uYXZiYXInKTtcbmNvbnN0IHByb2ZpbE5hdmJhckJ0bnMgPSBwcm9maWxOYXZiYXIucXVlcnlTZWxlY3RvckFsbCgnZGl2Jyk7XG5cbnByb2ZpbE5hdmJhckJ0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChidG4uaWQgPT0gXCJlc3BhY2UtY2hhdWZmZXVyXCIgJiYgYnRuLmRhdGFzZXQuaXNDaGF1ZmZldXIgPT0gXCJcIikge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9kZXZlbmlyLWNoYXVmZmV1clwiO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwcm9maWxOYXZiYXJCdG5zLmZvckVhY2goKGJ0bikgPT4ge1xuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2VjdGlvbicpO1xuICAgICAgICBjdXJyZW50U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGN1cnJlbnRTZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2N1cnJlbnQtc2VjdGlvbicpO1xuXG4gICAgICAgIC8vZ2VyZSBsYSByZWRpcmVjdGlvbiBkZSBsJ2VzcGFjZSBjaGF1ZmZldXIgZW4gZm9uY3Rpb24gZGUgc2kgdXNlciBkZWphIGNoYXVmZmV1ciBvdSBub25cblxuXG4gICAgICAgIC8vIGNhY2hlIGxhIHNlY3Rpb25yIGFqb3V0w6kgYWRkLXZvaXR1cmUgbGnDqWUgYSBlc3BhY2UgY2hhdWZmZXVyXG4gICAgICAgIGNvbnN0IGFkZHZvaXR1cmVTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC12b2l0dXJlLXNlY3Rpb24nKTtcbiAgICAgICAgaWYgKGFkZHZvaXR1cmVTZWN0aW9uICYmIGFkZHZvaXR1cmVTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPT1cImZsZXhcIikge1xuICAgICAgICAgICAgYWRkdm9pdHVyZVNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLmlkfS1zZWN0aW9uYCk7XG4gICAgICAgIG5leHRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgbmV4dFNlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZSgnY3VycmVudC1zZWN0aW9uJyk7XG5cbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIH0pXG59KVxuXG5jb25zdCBlZGl0UHJvZmlsUGljdHVyZUJ0biA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC1wcm9maWwtaWNvbicpO1xuY29uc3QgcHJvZmlsUGljdHVyZUlucHV0ID0gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdpc3RyYXRpb25fc3RlcF90d29fcGhvdG9fcHJvZmlsJyk7XG5cbmNvbnN0IG15RGF0YUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXktZGF0YS1mb3JtJyk7XG5cbmluaXRGb3JtSW5wdXRzVmFsaWRhdGlvbihteURhdGFGb3JtKTtcblxuZnVuY3Rpb24gaW5pdEZvcm1JbnB1dHNWYWxpZGF0aW9uKGZvcm0pIHtcbiAgICBjb25zdCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJyk7XG4gICAgY29uc3Qgc3VibWl0QnRuID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN1Ym1pdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZScpO1xuICAgICAgICB9KTsgIFxuICAgICAgfSk7XG59XG5cbmVkaXRQcm9maWxQaWN0dXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHByb2ZpbFBpY3R1cmVJbnB1dC5jbGljaygpO1xufSk7XG5cbnByb2ZpbFBpY3R1cmVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcHJvZmlsUGljdHVyZUltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWwtcGljdHVyZS1pbWcnKTtcbiAgICBwcm9maWxQaWN0dXJlSW1nLnN0eWxlLm9wYWNpdHkgPSBcIjc1JVwiO1xuICAgIGVkaXRQcm9maWxQaWN0dXJlQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBzdWJtaXRNeURhdGFGb3JtQnRuLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgXG4gICAgY29uc3QgZmlsZSA9IHRoaXMuZmlsZXNbMF07XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG5cbiAgICBjb25zdCBtYXhXaWR0aCA9IDEwMjQ7XG4gICAgY29uc3QgcXVhbGl0eSA9IDAuNTtcblxuICAgIGNvbnN0IG1pbWVUeXBlID0gZmlsZS50eXBlLnRvTG93ZXJDYXNlKCk7XG5cblxuXG4gICAgLy8gU2kgSEVJQy9IRUlGLCBvbiBjb252ZXJ0aXQgZW4gSlBFRyBkJ2Fib3JkXG4gICAgaWYgKG1pbWVUeXBlID09PSAnaW1hZ2UvaGVpYycgfHwgbWltZVR5cGUgPT09ICdpbWFnZS9oZWlmJykge1xuICAgICAgICBoZWljMmFueSh7IGJsb2I6IGZpbGUsIHRvVHlwZTogXCJpbWFnZS9qcGVnXCIsIHF1YWxpdHk6IHF1YWxpdHkgfSlcbiAgICAgICAgICAgIC50aGVuKGJsb2IgPT4gY29tcHJlc3NBbmRSZXNpemVJbWFnZShibG9iLCBtYXhXaWR0aCwgcXVhbGl0eSkpXG4gICAgICAgICAgICAudGhlbihwcm9jZXNzQ29tcHJlc3NlZEJsb2IpXG4gICAgICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb2ZpbFBpY3R1cmVJbWcuc3R5bGUub3BhY2l0eSA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgICAgIGVkaXRQcm9maWxQaWN0dXJlQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgc3VibWl0TXlEYXRhRm9ybUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb21wcmVzc0FuZFJlc2l6ZUltYWdlKGZpbGUsIG1heFdpZHRoLCBxdWFsaXR5KVxuICAgICAgICAgICAgLnRoZW4ocHJvY2Vzc0NvbXByZXNzZWRCbG9iKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9maWxQaWN0dXJlSW1nLnN0eWxlLm9wYWNpdHkgPSBcIjEwMCVcIjtcbiAgICAgICAgICAgICAgICBlZGl0UHJvZmlsUGljdHVyZUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIHN1Ym1pdE15RGF0YUZvcm1CdG4uY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0NvbXByZXNzZWRCbG9iKGJsb2IpIHtcbiAgICAgICAgY29uc3QgaW1hZ2VVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICBjb25zdCBwcm9maWxQaWN0dXJlSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbC1waWN0dXJlLWltZycpO1xuXG4gICAgICAgIHByb2ZpbFBpY3R1cmVJbWcuc3JjID0gaW1hZ2VVcmw7XG5cbiAgICAgICAgLy8gUmVtcGxhY2UgbGUgZmljaGllciBkYW5zIGwnaW5wdXQgcGFyIGxlIGJsb2IgY29tcHJlc3PDqVxuICAgICAgICBjb25zdCBjb21wcmVzc2VkRmlsZSA9IG5ldyBGaWxlKFtibG9iXSwgZmlsZS5uYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCBcIlwiKSArIFwiLmpwZ1wiLCB7IHR5cGU6ICdpbWFnZS9qcGVnJyB9KTtcblxuICAgICAgICBjb25zdCBkYXRhVHJhbnNmZXIgPSBuZXcgRGF0YVRyYW5zZmVyKCk7XG4gICAgICAgIGRhdGFUcmFuc2Zlci5pdGVtcy5hZGQoY29tcHJlc3NlZEZpbGUpO1xuICAgICAgICBwcm9maWxQaWN0dXJlSW5wdXQuZmlsZXMgPSBkYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgfVxufSk7XG5cblxuZnVuY3Rpb24gY29tcHJlc3NBbmRSZXNpemVJbWFnZShmaWxlLCBtYXhXaWR0aCwgcXVhbGl0eSA9IDAuOCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGltZy5zcmMgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICB9O1xuXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByYXRpbyA9IG1heFdpZHRoIC8gaW1nLndpZHRoO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLm1pbihpbWcud2lkdGgsIG1heFdpZHRoKTtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGltZy5oZWlnaHQgKiByYXRpbztcblxuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgICAgICBjYW52YXMudG9CbG9iKChibG9iKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2IpIHJlc29sdmUoYmxvYik7XG4gICAgICAgICAgICAgICAgZWxzZSByZWplY3QobmV3IEVycm9yKFwiQ29tcHJlc3Npb24gZGUgbCdpbWFnZSBhIMOpY2hvdcOpXCIpKTtcbiAgICAgICAgICAgIH0sICdpbWFnZS9qcGVnJywgcXVhbGl0eSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoZSkgPT4gcmVqZWN0KGUpO1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9KTtcbn1cblxuXG5cbmNvbnN0IHN1Ym1pdE15RGF0YUZvcm1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LW15LWRhdGEtZm9ybS1idG4nKTtcblxuc3VibWl0TXlEYXRhRm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBzdWJtaXRNeURhdGFGb3JtQnRuLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShteURhdGFGb3JtKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBmZXRjaCgnL3VzZXIvdXBkYXRlLWRhdGEnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIC8vIGltcG9ydGFudCBwb3VyIGluZGlxdWVyIHVuZSByZXF1w6p0ZSBBSkFYXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgLy8gZGF0YS5odG1sIGNvbnRpZW50IHRvbiBmb3JtdWxhaXJlIHJlbmR1XG5cbiAgICAgICAgdHJlYXRGb3JtQWxlcnQobXlEYXRhRm9ybSwgJ0Rvbm7DqWVzIG1pc2VzIMOgIGpvdXIgYXZlYyBzdWNjw6hzJywgZGF0YSk7XG4gICAgICAgIFxuICAgICAgICAvLyBpZiAoZGF0YS5zdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgLy8gICAgIHNob3dTdWNjZXNzQWxlcnQoJ0luZm9ybWF0aW9ucyBtaXNlcyDDoCBqb3VyIGF2ZWMgc3VjY8OocycpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBhbGVydChkYXRhLmVycm9ycyk7XG4gICAgICAgIC8vICAgICBkYXRhLmVycm9ycy5mb3JFYWNoKChlcnJvcikgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGFsZXJ0KGVycm9yLm1lc3NhZ2UpXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAvL2NvbXBsZXRlciBwb3VyIGJpZW4gbWFpdHJpc2VyIGxlcyBlcnJldXJzXG4gICAgICAgIC8vICAgICBzaG93RXJyb3JzKGRhdGEuZXJyb3JzKTtcbiAgICAgICAgLy8gfVxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1cjonLCBlcnJvcikpO1xufSlcblxuXG5jb25zdCBlc3BhY2VDaGF1ZmZldXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXNwYWNlLWNoYXVmZmV1cicpO1xuLy8gY29uc3QgcHJlZmVyZW5jZXNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXZlbmlyX2NoYXVmZmV1cl9wcmVmZXJlbmNlcycpO1xuY29uc3QgZXNwYWNlQ2hhdWZmZXVyRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXZlbmlyLWNoYXVmZmV1ci1mb3JtJyk7XG5jb25zdCBzdWJtaXRFc3BhY2VDaGF1ZmZldXJGb3JtQnRuID0gZXNwYWNlQ2hhdWZmZXVyRm9ybS5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuXG5cbmluaXRGb3JtSW5wdXRzVmFsaWRhdGlvbihlc3BhY2VDaGF1ZmZldXJGb3JtKTtcblxubGV0IGlzUHJlZmVyZW5jZXNCdG5zRXZlbnRzSW5pdCA9IGZhbHNlO1xuZXNwYWNlQ2hhdWZmZXVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcHJlZmVyZW5jZXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZmVyZW5jZXMtbGlzdCcpO1xuXG4gICAgY29uc3QgdXNlclByZWZlcmVuY2VzRGF0YXNldCA9IHByZWZlcmVuY2VzQ29udGFpbmVyLmRhdGFzZXQudXNlclByZWZlcmVuY2VzO1xuICAgIGNvbnN0IHVzZXJQcmVmZXJlbmNlcyA9IHVzZXJQcmVmZXJlbmNlc0RhdGFzZXQgIT09IFwiXCIgPyB1c2VyUHJlZmVyZW5jZXNEYXRhc2V0LnNwbGl0KCcsJykgOiBbXTtcblxuICAgIGlmICghaXNQcmVmZXJlbmNlc0J0bnNFdmVudHNJbml0KSB7XG4gICAgICAgIGluaXRQcmVmZXJlbmNlc0J0bnNFdmVudHModXNlclByZWZlcmVuY2VzKTtcbiAgICAgICAgaXNQcmVmZXJlbmNlc0J0bnNFdmVudHNJbml0ID0gdHJ1ZTtcbiAgICB9XG4gICAgXG59KVxuXG5zdWJtaXRFc3BhY2VDaGF1ZmZldXJGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIHN1Ym1pdEVzcGFjZUNoYXVmZmV1ckZvcm1CdG4uY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcblxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGVzcGFjZUNoYXVmZmV1ckZvcm0pO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGZldGNoKCcvdXNlci91cGRhdGUtY2hhdWZmZXVyLWRhdGEnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIC8vIGltcG9ydGFudCBwb3VyIGluZGlxdWVyIHVuZSByZXF1w6p0ZSBBSkFYXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgXG4gICAgICAgIHRyZWF0Rm9ybUFsZXJ0KGVzcGFjZUNoYXVmZmV1ckZvcm0sICdJbmZvcm1hdGlvbnMgbW9kaWZpw6lzIGF2ZWMgc3VjY8OocycsIGRhdGEpXG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyZXVyOicsIGVycm9yKSk7XG59KVxuXG5jb25zdCB2b2l0dXJlc0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudm9pdHVyZS1jYXJkJyk7XG5jb25zdCBhZGRWb2l0dXJlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC12b2l0dXJlLWJ0bicpO1xuXG52b2l0dXJlc0J0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgc2hvd0FkZFZvaXR1cmVGb3JtKGVzcGFjZUNoYXVmZmV1clNlY3Rpb24uaWQsIGJ0bi5pZCk7XG5cbiAgICAgICAgXG4gICAgfSlcblxuICAgIGJ0bi5kYXRhc2V0Lmxpc3RlbmVyQXR0YWNoZWQgPSAndHJ1ZSc7XG4gICAgXG59KVxuXG5hZGRWb2l0dXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHNob3dBZGRWb2l0dXJlRm9ybShlc3BhY2VDaGF1ZmZldXJTZWN0aW9uLmlkKTtcbn0pXG5cbmNvbnN0IHBhcmFtZXRyZXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXJhbWV0cmVzLXNlY3Rpb25cIik7XG5jb25zdCBhdmlzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJhbWV0cmVzLXNlY3Rpb24tYXZpcycpO1xuY29uc3QgbWFpbEFuZFBhc3N3b3JkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJhbWV0cmVzLXNlY3Rpb24tbWFpbC1wYXNzd29yZCcpO1xuY29uc3QgcGFyYW1ldHJlc1NlY3Rpb25CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmFtZXRyZXMtc2VjdGlvbi1idG5zJyk7XG5jb25zdCBhdmlzQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F2aXMtYnRuJyk7XG5jb25zdCBtYWlsQW5kUGFzc3dvcmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbC1hbmQtcGFzc3dvcmQtYnRuJyk7XG5cbmF2aXNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBhdmlzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgcGFyYW1ldHJlc1NlY3Rpb25CdG5zLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pXG5cbm1haWxBbmRQYXNzd29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIG1haWxBbmRQYXNzd29yZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIHBhcmFtZXRyZXNTZWN0aW9uQnRucy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KVxuXG5jb25zdCBwYXJhbWV0cmVzU2VjdGlvbkJhY2tCdG5zID0gcGFyYW1ldHJlc1NlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5iYWNrLWJ0blwiKTtcblxucGFyYW1ldHJlc1NlY3Rpb25CYWNrQnRucy5mb3JFYWNoKChiYWNrQnRuKSA9PiB7XG4gICAgYmFja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3ViU2VjdGlvbiA9IGJhY2tCdG4ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIGN1cnJlbnRTdWJTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgcGFyYW1ldHJlc1NlY3Rpb25CdG5zLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICB9KVxufSlcblxuY29uc3QgYXZpc1JlY3VzQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F2aXMtcmVjdXMtYnRuJyk7XG5jb25zdCBhdmlzUHVibGllc0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdmlzLXB1YmxpZXMtYnRuJyk7XG5jb25zdCBhdmlzUmVjdXNTZWN0aW9uID0gYXZpc1NlY3Rpb24ucXVlcnlTZWxlY3RvcignLmF2aXMtcmVjdXMtc2VjdGlvbicpO1xuY29uc3QgYXZpc1B1YmxpZXNTZWN0aW9uID0gYXZpc1NlY3Rpb24ucXVlcnlTZWxlY3RvcignLmF2aXMtcHVibGllcy1zZWN0aW9uJyk7XG5cbmF2aXNSZWN1c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGF2aXNQdWJsaWVzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gIFwibm9uZVwiO1xuICAgIGF2aXNSZWN1c1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICBcImZsZXhcIjtcblxuICAgIGF2aXNSZWN1c0J0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIGF2aXNQdWJsaWVzQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG59KVxuXG5hdmlzUHVibGllc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGF2aXNSZWN1c1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICBcIm5vbmVcIjtcbiAgICBhdmlzUHVibGllc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICBcImZsZXhcIjtcbiAgICBcbiAgICBhdmlzUmVjdXNCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICBhdmlzUHVibGllc0J0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xufSlcblxuY29uc3Qgc2hvd0VkaXRNYWlsU2VjdGlvbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWVkaXQtbWFpbC1mb3JtLWJ0bicpO1xuY29uc3QgZWRpdE1haWxTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmFtZXRyZXMtc2VjdGlvbi1tYWlsJyk7XG5cbnNob3dFZGl0TWFpbFNlY3Rpb25CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBlZGl0TWFpbFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIG1haWxBbmRQYXNzd29yZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICBcIm5vbmVcIjtcbn0pXG5jb25zdCBlZGl0TWFpbEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdC1tYWlsLWZvcm0nKTtcbmNvbnN0IHN1Ym1pdEVkaXRNYWlsRm9ybUJ0biA9IGVkaXRNYWlsRm9ybS5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuY29uc3QgZWRpdE1haWxGb3JtSW5wdXRzID0gZWRpdE1haWxGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJyk7XG4vLyBjb25zdCBlZGl0TWFpbEZvcm1FbWFpbElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRfbWFpbF9lbWFpbCcpO1xuXG5lZGl0TWFpbEZvcm1JbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjaGVja0lucHV0cyhlZGl0TWFpbEZvcm0pO1xuICAgIH0pXG59KVxuXG5zdWJtaXRFZGl0TWFpbEZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgc3VibWl0RWRpdE1haWxGb3JtQnRuLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShlZGl0TWFpbEZvcm0pO1xuXG4gICAgZmV0Y2goJy9lZGl0LW1haWwnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIC8vIGltcG9ydGFudCBwb3VyIGluZGlxdWVyIHVuZSByZXF1w6p0ZSBBSkFYXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJldXIgcsOpc2VhdScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgLy8gZGF0YS5odG1sIGNvbnRpZW50IHRvbiBmb3JtdWxhaXJlIHJlbmR1XG5cbiAgICAgICAgdHJlYXRGb3JtQWxlcnQoZWRpdE1haWxGb3JtLCAnSW5mb3JtYXRpb25zIG1pc2VzIMOgIGpvdXIgYXZlYyBzdWNjw6hzJywgZGF0YSk7XG4gICAgICAgIGVkaXRNYWlsRm9ybS5yZXNldCgpO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1cjonLCBlcnJvcikpO1xufSlcblxuXG5jb25zdCBzaG93RWRpdFBhc3N3b3JkU2VjdGlvbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWVkaXQtcGFzc3dvcmQtZm9ybS1idG4nKTtcbmNvbnN0IGVkaXRQYXNzd29yZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFyYW1ldHJlcy1zZWN0aW9uLXBhc3N3b3JkJyk7XG5cbnNob3dFZGl0UGFzc3dvcmRTZWN0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgZWRpdFBhc3N3b3JkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgbWFpbEFuZFBhc3N3b3JkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gIFwibm9uZVwiO1xufSlcblxuY29uc3QgZWRpdFBhc3N3b3JkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LXBhc3N3b3JkLWZvcm0nKTtcbmNvbnN0IHBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdF9wYXNzd29yZF9wYXNzd29yZF9maXJzdCcpO1xuY29uc3QgY29uZmlybVBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdF9wYXNzd29yZF9wYXNzd29yZF9zZWNvbmQnKTtcbmNvbnN0IGN1cnJlbnRQYXNzd29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRfcGFzc3dvcmRfY3VycmVudFBhc3N3b3JkJyk7XG5jb25zdCBzdWJtaXRFZGl0UGFzc3dvcmRGb3JtQnRuID0gZWRpdFBhc3N3b3JkRm9ybS5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuXG5jdXJyZW50UGFzc3dvcmRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCl7XG4gICAgY2hlY2tSZWdpc3RlckZvcm1WYWxpZGl0eShlZGl0UGFzc3dvcmRGb3JtLHBhc3N3b3JkSW5wdXQsIGNvbmZpcm1QYXNzd29yZElucHV0LCBudWxsLCBjdXJyZW50UGFzc3dvcmRJbnB1dCk7XG59KVxuXG5wYXNzd29yZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgY2hlY2tQYXNzd29yZFZhbGlkaXR5KCdlZGl0X3Bhc3N3b3JkX3Bhc3N3b3JkX2ZpcnN0Jyk7XG4gICAgY2hlY2tSZWdpc3RlckZvcm1WYWxpZGl0eShlZGl0UGFzc3dvcmRGb3JtLHBhc3N3b3JkSW5wdXQsIGNvbmZpcm1QYXNzd29yZElucHV0LCBudWxsLCBudWxsLCBjdXJyZW50UGFzc3dvcmRJbnB1dCk7XG59KVxuXG5jb25maXJtUGFzc3dvcmRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgIGNoZWNrUGFzc3dvcmRWYWxpZGl0eSgnZWRpdF9wYXNzd29yZF9wYXNzd29yZF9maXJzdCcpO1xuICAgIGNoZWNrUmVnaXN0ZXJGb3JtVmFsaWRpdHkoZWRpdFBhc3N3b3JkRm9ybSxwYXNzd29yZElucHV0LCBjb25maXJtUGFzc3dvcmRJbnB1dCwgbnVsbCwgbnVsbCwgY3VycmVudFBhc3N3b3JkSW5wdXQpO1xufSlcblxuXG5cblxuXG5zdWJtaXRFZGl0UGFzc3dvcmRGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHN1Ym1pdEVkaXRQYXNzd29yZEZvcm1CdG4uY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcblxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGVkaXRQYXNzd29yZEZvcm0pO1xuXG4gICAgZmV0Y2goJy9lZGl0LXBhc3N3b3JkJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyAvLyBpbXBvcnRhbnQgcG91ciBpbmRpcXVlciB1bmUgcmVxdcOqdGUgQUpBWFxuICAgICAgICB9XG4gICAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyZXVyIHLDqXNlYXUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIC8vIGRhdGEuaHRtbCBjb250aWVudCB0b24gZm9ybXVsYWlyZSByZW5kdVxuXG4gICAgICAgIHRyZWF0Rm9ybUFsZXJ0KGVkaXRQYXNzd29yZEZvcm0sICdJbmZvcm1hdGlvbnMgbWlzZXMgw6Agam91ciBhdmVjIHN1Y2PDqHMnLCBkYXRhKTtcbiAgICAgICAgZWRpdFBhc3N3b3JkRm9ybS5yZXNldCgpO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgcGFzc3dvcmRJbnB1dC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1cjonLCBlcnJvcikpO1xufSkiXSwibmFtZXMiOlsiaW5pdFByZWZlcmVuY2VzQnRuc0V2ZW50cyIsInNlbGVjdGVkUHJlZmVyZW5jZXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJwcmVmZXJlbmNlc0J0bnMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcmVmZXJlbmNlc0lucHV0IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb3JFYWNoIiwicHJlZmVyZW5jZSIsImNsYXNzTGlzdCIsImFkZCIsInZhbHVlIiwiSlNPTiIsInN0cmluZ2lmeSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGUiLCJpbmRleCIsImluZGV4T2YiLCJpZCIsInB1c2giLCJzcGxpY2UiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJidWJibGVzIiwiX3JlcXVpcmUiLCJyZXF1aXJlIiwiY2hlY2tJbnB1dHMiLCJzaG93RXJyb3JzIiwic2hvd1N1Y2Nlc3NBbGVydCIsInRyZWF0Rm9ybUFsZXJ0IiwiY2hlY2tQYXNzd29yZFZhbGlkaXR5IiwiY2hlY2tSZWdpc3RlckZvcm1WYWxpZGl0eSIsImhlaWMyYW55Iiwic2hvd0FkZFZvaXR1cmVGb3JtIiwidHJhamV0c0J0biIsIm15RGF0YUJ0biIsInBhcmFtZXRyZXNCdG4iLCJ0cmFqZXRzU2VjdGlvbiIsInF1ZXJ5U2VsZWN0b3IiLCJteURhdGFTZWN0aW9uIiwiZXNwYWNlQ2hhdWZmZXVyU2VjdGlvbiIsInByb2ZpbE5hdmJhciIsInByb2ZpbE5hdmJhckJ0bnMiLCJidG4iLCJkYXRhc2V0IiwiaXNDaGF1ZmZldXIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJyZW1vdmUiLCJjdXJyZW50U2VjdGlvbiIsInN0eWxlIiwiZGlzcGxheSIsImFkZHZvaXR1cmVTZWN0aW9uIiwibmV4dFNlY3Rpb24iLCJjb25jYXQiLCJlZGl0UHJvZmlsUGljdHVyZUJ0biIsInByb2ZpbFBpY3R1cmVJbnB1dCIsIm15RGF0YUZvcm0iLCJpbml0Rm9ybUlucHV0c1ZhbGlkYXRpb24iLCJmb3JtIiwiaW5wdXRzIiwic3VibWl0QnRuIiwiaW5wdXQiLCJjbGljayIsInByb2ZpbFBpY3R1cmVJbWciLCJvcGFjaXR5Iiwic3VibWl0TXlEYXRhRm9ybUJ0biIsImZpbGUiLCJmaWxlcyIsIm1heFdpZHRoIiwicXVhbGl0eSIsIm1pbWVUeXBlIiwidHlwZSIsInRvTG93ZXJDYXNlIiwiYmxvYiIsInRvVHlwZSIsInRoZW4iLCJjb21wcmVzc0FuZFJlc2l6ZUltYWdlIiwicHJvY2Vzc0NvbXByZXNzZWRCbG9iIiwiY29uc29sZSIsImVycm9yIiwiaW1hZ2VVcmwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJzcmMiLCJjb21wcmVzc2VkRmlsZSIsIkZpbGUiLCJuYW1lIiwicmVwbGFjZSIsImRhdGFUcmFuc2ZlciIsIkRhdGFUcmFuc2ZlciIsIml0ZW1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbWciLCJJbWFnZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJldmVudCIsInRhcmdldCIsInJlc3VsdCIsInJhdGlvIiwid2lkdGgiLCJNYXRoIiwibWluIiwiaGVpZ2h0IiwiY2FudmFzIiwiY3JlYXRlRWxlbWVudCIsImN0eCIsImdldENvbnRleHQiLCJkcmF3SW1hZ2UiLCJ0b0Jsb2IiLCJFcnJvciIsIm9uZXJyb3IiLCJyZWFkQXNEYXRhVVJMIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsImhlYWRlcnMiLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwiZXNwYWNlQ2hhdWZmZXVyQnRuIiwiZXNwYWNlQ2hhdWZmZXVyRm9ybSIsInN1Ym1pdEVzcGFjZUNoYXVmZmV1ckZvcm1CdG4iLCJpc1ByZWZlcmVuY2VzQnRuc0V2ZW50c0luaXQiLCJwcmVmZXJlbmNlc0NvbnRhaW5lciIsInVzZXJQcmVmZXJlbmNlc0RhdGFzZXQiLCJ1c2VyUHJlZmVyZW5jZXMiLCJzcGxpdCIsInZvaXR1cmVzQnRucyIsImFkZFZvaXR1cmVCdG4iLCJsaXN0ZW5lckF0dGFjaGVkIiwicGFyYW1ldHJlc1NlY3Rpb24iLCJhdmlzU2VjdGlvbiIsIm1haWxBbmRQYXNzd29yZFNlY3Rpb24iLCJwYXJhbWV0cmVzU2VjdGlvbkJ0bnMiLCJhdmlzQnRuIiwibWFpbEFuZFBhc3N3b3JkQnRuIiwicGFyYW1ldHJlc1NlY3Rpb25CYWNrQnRucyIsImJhY2tCdG4iLCJjdXJyZW50U3ViU2VjdGlvbiIsInBhcmVudEVsZW1lbnQiLCJhdmlzUmVjdXNCdG4iLCJhdmlzUHVibGllc0J0biIsImF2aXNSZWN1c1NlY3Rpb24iLCJhdmlzUHVibGllc1NlY3Rpb24iLCJzaG93RWRpdE1haWxTZWN0aW9uQnRuIiwiZWRpdE1haWxTZWN0aW9uIiwiZWRpdE1haWxGb3JtIiwic3VibWl0RWRpdE1haWxGb3JtQnRuIiwiZWRpdE1haWxGb3JtSW5wdXRzIiwib2siLCJyZXNldCIsInNob3dFZGl0UGFzc3dvcmRTZWN0aW9uQnRuIiwiZWRpdFBhc3N3b3JkU2VjdGlvbiIsImVkaXRQYXNzd29yZEZvcm0iLCJwYXNzd29yZElucHV0IiwiY29uZmlybVBhc3N3b3JkSW5wdXQiLCJjdXJyZW50UGFzc3dvcmRJbnB1dCIsInN1Ym1pdEVkaXRQYXNzd29yZEZvcm1CdG4iXSwic291cmNlUm9vdCI6IiJ9