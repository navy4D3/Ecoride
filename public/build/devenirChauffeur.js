"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["devenirChauffeur"],{

/***/ "./assets/js/devenirChauffeur.js":
/*!***************************************!*\
  !*** ./assets/js/devenirChauffeur.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app */ "./assets/app.js");
/* harmony import */ var _addVoiture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addVoiture */ "./assets/js/addVoiture.js");
/* harmony import */ var _initPreferencesBtnsEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initPreferencesBtnsEvents */ "./assets/js/initPreferencesBtnsEvents.js");




// preferencesInput.value = "";

var devenirChauffeurForm = document.getElementById("devenir-chauffeur-form");
var fields = devenirChauffeurForm.querySelectorAll('input, select, textarea');
fields.forEach(function (field) {
  field.addEventListener('input', function () {
    return (0,_app__WEBPACK_IMPORTED_MODULE_0__.checkInputs)(devenirChauffeurForm);
  });
});
var selectedPreferences = [];
(0,_initPreferencesBtnsEvents__WEBPACK_IMPORTED_MODULE_2__.initPreferencesBtnsEvents)(selectedPreferences);
var hasVoitureInput = document.getElementById('devenir_chauffeur_hasVoiture');
var voitureCards = document.querySelectorAll('.voiture-card');
if (voitureCards.length > 0) {
  hasVoitureInput.checked = true;
  hasVoitureInput.dispatchEvent(new Event('input', {
    bubbles: true
  }));
}

// completer pour mettre à jour l'input au début et à chaque ajout de voiture.
// Il faudra probablement inclure une mise à jour optionnel dans addVoiture.js

var addVoitureBtn = document.getElementById("add-voiture-btn");
addVoitureBtn.addEventListener('click', function () {
  (0,_addVoiture__WEBPACK_IMPORTED_MODULE_1__.showAddVoitureForm)('devenir-chauffeur-base');
});

/***/ }),

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["assets_styles_app_scss","assets_app_js","assets_js_addVoiture_js"], () => (__webpack_exec__("./assets/js/devenirChauffeur.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO01BQ3hDO01BQ0FWLGdCQUFnQixDQUFDSSxLQUFLLEdBQUdoQixtQkFBbUIsQ0FBQ0csTUFBTSxHQUFHYyxJQUFJLENBQUNDLFNBQVMsQ0FBQ2xCLG1CQUFtQixDQUFDLEdBQUcsRUFBRTtNQUc5RlksZ0JBQWdCLENBQUNQLGFBQWEsQ0FBQyxJQUFJQyxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQUVDLE9BQU8sRUFBRTtNQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztBQUlOO0FBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGV2ZW5pckNoYXVmZmV1ci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvaW5pdFByZWZlcmVuY2VzQnRuc0V2ZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NoZWNrSW5wdXRzfSBmcm9tICcuLi9hcHAnO1xuaW1wb3J0IHtzaG93QWRkVm9pdHVyZUZvcm19IGZyb20gJy4vYWRkVm9pdHVyZSc7XG5pbXBvcnQgeyBpbml0UHJlZmVyZW5jZXNCdG5zRXZlbnRzIH0gZnJvbSAnLi9pbml0UHJlZmVyZW5jZXNCdG5zRXZlbnRzJztcblxuXG5cblxuXG4vLyBwcmVmZXJlbmNlc0lucHV0LnZhbHVlID0gXCJcIjtcblxuY29uc3QgZGV2ZW5pckNoYXVmZmV1ckZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldmVuaXItY2hhdWZmZXVyLWZvcm1cIik7XG5jb25zdCBmaWVsZHMgPSBkZXZlbmlyQ2hhdWZmZXVyRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuXG5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4gY2hlY2tJbnB1dHMoZGV2ZW5pckNoYXVmZmV1ckZvcm0pKTtcblxufSk7XG5cblxuXG5jb25zdCBzZWxlY3RlZFByZWZlcmVuY2VzID0gW107XG5pbml0UHJlZmVyZW5jZXNCdG5zRXZlbnRzKHNlbGVjdGVkUHJlZmVyZW5jZXMpO1xuXG5cbmNvbnN0IGhhc1ZvaXR1cmVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXZlbmlyX2NoYXVmZmV1cl9oYXNWb2l0dXJlJyk7XG5cbmNvbnN0IHZvaXR1cmVDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52b2l0dXJlLWNhcmQnKTtcblxuaWYgKHZvaXR1cmVDYXJkcy5sZW5ndGggPiAwKSB7XG4gICAgaGFzVm9pdHVyZUlucHV0LmNoZWNrZWQgPSB0cnVlO1xuICAgIGhhc1ZvaXR1cmVJbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xufVxuXG4vLyBjb21wbGV0ZXIgcG91ciBtZXR0cmUgw6Agam91ciBsJ2lucHV0IGF1IGTDqWJ1dCBldCDDoCBjaGFxdWUgYWpvdXQgZGUgdm9pdHVyZS5cbi8vIElsIGZhdWRyYSBwcm9iYWJsZW1lbnQgaW5jbHVyZSB1bmUgbWlzZSDDoCBqb3VyIG9wdGlvbm5lbCBkYW5zIGFkZFZvaXR1cmUuanNcblxuXG5jb25zdCBhZGRWb2l0dXJlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdm9pdHVyZS1idG5cIik7XG5cbmFkZFZvaXR1cmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgc2hvd0FkZFZvaXR1cmVGb3JtKCdkZXZlbmlyLWNoYXVmZmV1ci1iYXNlJyk7XG5cbn0pOyIsImV4cG9ydCBmdW5jdGlvbiBpbml0UHJlZmVyZW5jZXNCdG5zRXZlbnRzKHNlbGVjdGVkUHJlZmVyZW5jZXMgPSBbXSkge1xuICAgIGNvbnN0IHByZWZlcmVuY2VzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVmZXJlbmNlJyk7XG4gICAgY29uc3QgcHJlZmVyZW5jZXNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXZlbmlyX2NoYXVmZmV1cl9wcmVmZXJlbmNlcycpO1xuXG4gICAgaWYgKHNlbGVjdGVkUHJlZmVyZW5jZXMubGVuZ3RoKSB7XG4gICAgICAgIHNlbGVjdGVkUHJlZmVyZW5jZXMuZm9yRWFjaCgocHJlZmVyZW5jZSkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZmVyZW5jZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0pXG4gICAgfSAgXG4gICAgcHJlZmVyZW5jZXNJbnB1dC52YWx1ZSA9IHNlbGVjdGVkUHJlZmVyZW5jZXMubGVuZ3RoID8gSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRQcmVmZXJlbmNlcykgOiBcIlwiOyAgXG5cbiAgICBwcmVmZXJlbmNlc0J0bnMuZm9yRWFjaCgocHJlZmVyZW5jZSkgPT4ge1xuICAgICAgICBwcmVmZXJlbmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzZWxlY3RlZFByZWZlcmVuY2VzLmluZGV4T2YocHJlZmVyZW5jZS5pZCk7XG4gICAgXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gQWpvdXQgc2kgcGFzIGVuY29yZSBzw6lsZWN0aW9ubsOpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcmVmZXJlbmNlcy5wdXNoKHByZWZlcmVuY2UuaWQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXRyYWl0IHNpIGTDqWrDoCBwcsOpc2VudFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJlZmVyZW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZWZlcmVuY2VzSW5wdXQudmFsdWUgPSBzZWxlY3RlZFByZWZlcmVuY2VzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkUHJlZmVyZW5jZXMpIDogXCJcIjtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBwcmVmZXJlbmNlc0lucHV0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIFxuXG59OyJdLCJuYW1lcyI6WyJjaGVja0lucHV0cyIsInNob3dBZGRWb2l0dXJlRm9ybSIsImluaXRQcmVmZXJlbmNlc0J0bnNFdmVudHMiLCJkZXZlbmlyQ2hhdWZmZXVyRm9ybSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmaWVsZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImZpZWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbGVjdGVkUHJlZmVyZW5jZXMiLCJoYXNWb2l0dXJlSW5wdXQiLCJ2b2l0dXJlQ2FyZHMiLCJsZW5ndGgiLCJjaGVja2VkIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYnViYmxlcyIsImFkZFZvaXR1cmVCdG4iLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJwcmVmZXJlbmNlc0J0bnMiLCJwcmVmZXJlbmNlc0lucHV0IiwicHJlZmVyZW5jZSIsImNsYXNzTGlzdCIsImFkZCIsInZhbHVlIiwiSlNPTiIsInN0cmluZ2lmeSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZSIsImluZGV4IiwiaW5kZXhPZiIsImlkIiwicHVzaCIsInNwbGljZSJdLCJzb3VyY2VSb290IjoiIn0=