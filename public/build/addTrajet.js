"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["addTrajet"],{

/***/ "./assets/js/addTrajet.js":
/*!********************************!*\
  !*** ./assets/js/addTrajet.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app */ "./assets/app.js");
/* harmony import */ var _styles_publier_trajet_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/publier-trajet.scss */ "./assets/styles/publier-trajet.scss");
/* harmony import */ var _styles_add_voiture_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/add-voiture.scss */ "./assets/styles/add-voiture.scss");
/* harmony import */ var _addVoiture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addVoiture */ "./assets/js/addVoiture.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var addTrajetForm = document.getElementById("add-trajet-form");
var fields = addTrajetForm.querySelectorAll('input, select, textarea');
fields.forEach(function (field) {
  field.addEventListener('input', function () {
    return (0,_app__WEBPACK_IMPORTED_MODULE_0__.checkInputs)(addTrajetForm);
  });
});
(0,_app__WEBPACK_IMPORTED_MODULE_0__.checkInputs)(addTrajetForm);
var hoursSelect = document.getElementById('hours');
var minutesSelect = document.getElementById('minutes');
var heureDepartInput = document.getElementById('add_trajet_heureDepart');
var dateDepartInput = document.getElementById('add_trajet_dateDepart');

// Remplir les heures
for (var h = 0; h < 24; h++) {
  var option = document.createElement('option');
  option.value = h.toString().padStart(2, '0');
  option.textContent = h.toString().padStart(2, '0');
  hoursSelect.appendChild(option);
}
for (var m = 0; m < 60; m += 5) {
  // Par pas de 5 min
  var _option = document.createElement('option');
  _option.value = m.toString().padStart(2, '0');
  _option.textContent = m.toString().padStart(2, '0');
  minutesSelect.appendChild(_option);
}
function updatePlaceholder(select) {
  if (select.value !== "") {
    select.classList.add('valid');
  } else {
    select.classList.remove('valid');
  }
}
function updateHeureDepart() {
  var heure = hoursSelect.value;
  var minute = minutesSelect.value;
  var dateInput = dateDepartInput.value;

  // Convertir "3 mai 2025" en jour, mois, année
  var moisFrancais = {
    "janvier": 0,
    "février": 1,
    "mars": 2,
    "avril": 3,
    "mai": 4,
    "juin": 5,
    "juillet": 6,
    "août": 7,
    "septembre": 8,
    "octobre": 9,
    "novembre": 10,
    "décembre": 11
  };
  var _dateInput$split = dateInput.split(' '),
    _dateInput$split2 = _slicedToArray(_dateInput$split, 3),
    jourStr = _dateInput$split2[0],
    moisStr = _dateInput$split2[1],
    anneeStr = _dateInput$split2[2];
  var jour = parseInt(jourStr, 10);
  var mois = moisFrancais[moisStr.toLowerCase()];
  var annee = parseInt(anneeStr, 10);
  if (mois === undefined || isNaN(jour) || isNaN(annee)) {
    console.error("Date invalide :", dateInput);
    return;
  }

  // Créer la date et appliquer l’heure
  var date = new Date(annee, mois, jour, heure, minute, 0);

  // Format ISO (YYYY-MM-DDTHH:mm:ss), UTC+00
  var formatted = date.toISOString().slice(0, 19);
  heureDepartInput.value = formatted;
}
hoursSelect.addEventListener('change', function () {
  updatePlaceholder(this);
  updateHeureDepart();
});
minutesSelect.addEventListener('change', function () {
  updatePlaceholder(this);
  updateHeureDepart();
});
dateDepartInput.addEventListener('change', function () {
  updateHeureDepart();
});
var prixInput = document.getElementById('add_trajet_prixPersonne');
var creditLabel = document.getElementById('credit-label');
prixInput.addEventListener('input', function () {
  var value = parseInt(this.value, 10);
  if (!isNaN(value) && value > 0) {
    creditLabel.textContent = value === 1 ? 'Crédit' : 'Crédits';
  } else {
    creditLabel.textContent = '';
  }
});
var itinerairesSection = document.getElementById('itineraires-choices');
var confirmItineraireBtn = document.getElementById('confirm-itineraire-btn');
function rechercherItineraire(origin, destination) {
  fetch("/publier-trajet/itineraires?origin=".concat(encodeURIComponent(origin), "&destination=").concat(encodeURIComponent(destination))).then(function (response) {
    return response.json();
  }).then(function (data) {
    // console.log(data);
    var itinerairesList = document.getElementById('itineraires-list');
    data.forEach(function (route) {
      var routeElement = document.createElement('div');
      routeElement.dataset.raw = JSON.stringify(route.rawData);
      routeElement.classList.add('itineraire');
      var summaryText = route.hasToll ? "".concat(route.summary, " - Avec p\xE9age ") : 'Sans péage';
      routeElement.innerHTML = "\n                <strong>".concat(summaryText, "</strong>\n                <span>").concat(route.distance, " - ").concat(route.duree, "</span>\n            ");
      itinerairesList.append(routeElement);
    });
    addTrajetForm.style.display = "none";
    itinerairesSection.style.display = "flex";
    document.querySelector('h1').innerHTML = "Choisis un itinéraire";
    document.querySelectorAll('.itineraire').forEach(function (itineraire) {
      itineraire.addEventListener('click', function () {
        document.querySelectorAll('.itineraire').forEach(function (itineraire) {
          return itineraire.classList.remove('selected');
        });
        this.classList.add('selected');
        var googleDataInput = document.getElementById('add_trajet_googleData');
        googleDataInput.value = this.dataset.raw;
        confirmItineraireBtn.classList.remove('inactive');
      });
    });
    continueBtn.classList.remove('inactive');
  })["catch"](function (error) {
    console.error('Erreur :', error);
  });
}
var continueBtn = document.getElementById('continue-btn');
var departInput = document.getElementById('add_trajet_lieuDepart');
var arriveeInput = document.getElementById('add_trajet_lieuArrivee');
var itinerairesBackBtn = itinerairesSection.querySelector('.back-btn');
continueBtn.addEventListener('click', function (e) {
  e.preventDefault();
  this.classList.add('inactive');
  rechercherItineraire(departInput.value, arriveeInput.value);
});
itinerairesBackBtn.addEventListener('click', function () {
  addTrajetForm.style.display = "flex";
  itinerairesSection.style.display = "none";
  document.querySelector('h1').innerHTML = "Ajouter un trajet";
  confirmItineraireBtn.classList.add('inactive');
  var currentItinerairesDiv = document.querySelectorAll('.itineraire');
  currentItinerairesDiv.forEach(function (div) {
    div.remove();
  });
});
var addVoitureBtn = document.getElementById("add-voiture-btn");
addVoitureBtn.addEventListener('click', function () {
  (0,_addVoiture__WEBPACK_IMPORTED_MODULE_3__.showAddVoitureForm)('trajet-details');
});
(0,_addVoiture__WEBPACK_IMPORTED_MODULE_3__.initUserVoitureBtns)();
var recapitulatifSection = document.getElementById('recapitulatif');
var recapitulatifBackBtn = recapitulatifSection.querySelector('.back-btn');
confirmItineraireBtn.addEventListener('click', function () {
  document.querySelector('h1').innerHTML = "Récapitulatif";
  recapitulatifSection.style.display = "flex";
  itinerairesSection.style.display = "none";
  var lieuDepartInput = document.getElementById('add_trajet_lieuDepart');
  var lieuArriveeInput = document.getElementById('add_trajet_lieuArrivee');
  var prixPassagerInput = document.getElementById('add_trajet_prixPersonne');
  var recapDateDepartLabel = recapitulatifSection.querySelector('.date-depart');
  var recaplieuDepartLabel = recapitulatifSection.querySelector('.lieu-depart');
  var recapHeureDepartLabel = recapitulatifSection.querySelector('.heure-depart');
  var recapDureeLabel = recapitulatifSection.querySelector('.duree');
  var recapDistanceLabel = recapitulatifSection.querySelector('.distance');
  var recapheureArriveeLabel = recapitulatifSection.querySelector('.heure-arrivee');
  var recaplieuArriveeLabel = recapitulatifSection.querySelector('.lieu-arrivee');
  var recapVoitureSurnomLabel = recapitulatifSection.querySelector('.voiture-surnom');
  var recapVoitureMarqueLabel = recapitulatifSection.querySelector('.voiture-marque');
  var recapVoitureModeleLabel = recapitulatifSection.querySelector('.voiture-modele');
  var recapVoitureIsElectricLabel = recapitulatifSection.querySelector('.voiture-is-electric');
  var recapVoiturePlacesLabel = recapitulatifSection.querySelector('.voiture-place');
  var recapVoitureCreditsLabel = recapitulatifSection.querySelector('.credits-passager');
  recapDateDepartLabel.innerHTML = "Départ le " + dateDepartInput.value;
  recaplieuDepartLabel.innerHTML = lieuDepartInput.value;
  recapHeureDepartLabel.innerHTML = hoursSelect.value + ":" + minutesSelect.value;
  recaplieuArriveeLabel.innerHTML = lieuArriveeInput.value;
  recapVoitureCreditsLabel.innerHTML = prixPassagerInput.value + " crédits / passager";
  var currentItineraireSelectedDiv = document.querySelector('.itineraire.selected');
  var currentItineraireSelectedDatas = JSON.parse(currentItineraireSelectedDiv.dataset.raw);
  var currentItineraireSelectedDureeSeconds = currentItineraireSelectedDatas['legs'][0]['duration']['value'];
  var currentItineraireSelectedDistanceText = currentItineraireSelectedDatas['legs'][0]['distance']['text'];
  var currentItineraireSelectedDureeText = formatSecondsToHoursMinutes(currentItineraireSelectedDureeSeconds);

  // recapheureArriveeLabel.innerHTML = 
  recapDureeLabel.innerHTML = currentItineraireSelectedDureeText;
  recapDistanceLabel.innerHTML = currentItineraireSelectedDistanceText;
  recapheureArriveeLabel.innerHTML = calculerHeureArrivee(heureDepartInput.value, currentItineraireSelectedDureeSeconds);
  var currentVoitureSelectedDiv = document.querySelector('.voiture-card.selected');
  var currentVoitureSelectedSurnom = currentVoitureSelectedDiv.querySelector('.surnom').innerHTML;
  var currentVoitureSelectedMarque = currentVoitureSelectedDiv.querySelector('.marque').innerHTML;
  var currentVoitureSelectedModele = currentVoitureSelectedDiv.querySelector('.modele').innerHTML;
  var currentVoitureSelectedIsElectric = currentVoitureSelectedDiv.querySelector('.is-electric').innerHTML;
  var currentVoitureSelectedPlaces = currentVoitureSelectedDiv.querySelector('.places').innerHTML;
  recapVoitureSurnomLabel.innerHTML = currentVoitureSelectedSurnom;
  recapVoitureMarqueLabel.innerHTML = currentVoitureSelectedMarque;
  recapVoitureModeleLabel.innerHTML = currentVoitureSelectedModele;
  recapVoitureIsElectricLabel.innerHTML = currentVoitureSelectedIsElectric;
  recapVoiturePlacesLabel.innerHTML = currentVoitureSelectedPlaces;
  function formatSecondsToHoursMinutes(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor(seconds % 3600 / 60);
    var h = hours.toString().padStart(2, '0');
    var m = minutes.toString().padStart(2, '0');
    return "".concat(h, ":").concat(m);
  }
  function calculerHeureArrivee(departIso, dureeSecondes) {
    var dateDepart = new Date(departIso);
    var dateArrivee = new Date(dateDepart.getTime() + dureeSecondes * 1000);
    var heures = dateArrivee.getHours().toString().padStart(2, '0');
    var minutes = dateArrivee.getMinutes().toString().padStart(2, '0');
    return "".concat(heures, "h").concat(minutes);
  }
});
recapitulatifBackBtn.addEventListener('click', function () {
  recapitulatifSection.style.display = "none";
  itinerairesSection.style.display = "flex";
});

/***/ }),

/***/ "./assets/styles/add-voiture.scss":
/*!****************************************!*\
  !*** ./assets/styles/add-voiture.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/styles/publier-trajet.scss":
/*!*******************************************!*\
  !*** ./assets/styles/publier-trajet.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["assets_styles_app_scss","assets_app_js","assets_js_addVoiture_js"], () => (__webpack_exec__("./assets/js/addTrajet.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFXO0VBQ3hEd0Ysb0JBQW9CLENBQUNkLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07RUFDM0M1QixrQkFBa0IsQ0FBQzJCLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07QUFDM0MsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQ3pTRjs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRkVHJhamV0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvYWRkLXZvaXR1cmUuc2Nzcz9kMDI5Iiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvcHVibGllci10cmFqZXQuc2Nzcz84M2Y1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y2hlY2tJbnB1dHN9IGZyb20gJy4uL2FwcCc7XG5pbXBvcnQgJy4uL3N0eWxlcy9wdWJsaWVyLXRyYWpldC5zY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2FkZC12b2l0dXJlLnNjc3MnO1xuaW1wb3J0IHtpbml0VXNlclZvaXR1cmVCdG5zLCBzaG93QWRkVm9pdHVyZUZvcm19IGZyb20gJy4vYWRkVm9pdHVyZSc7XG5cbmNvbnN0IGFkZFRyYWpldEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10cmFqZXQtZm9ybVwiKTtcbmNvbnN0IGZpZWxkcyA9IGFkZFRyYWpldEZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblxuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IGNoZWNrSW5wdXRzKGFkZFRyYWpldEZvcm0pKTtcblxufSk7XG5cblxuXG5jaGVja0lucHV0cyhhZGRUcmFqZXRGb3JtKTtcblxuY29uc3QgaG91cnNTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG91cnMnKTtcbmNvbnN0IG1pbnV0ZXNTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWludXRlcycpO1xuY29uc3QgaGV1cmVEZXBhcnRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfdHJhamV0X2hldXJlRGVwYXJ0Jyk7XG5jb25zdCBkYXRlRGVwYXJ0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX3RyYWpldF9kYXRlRGVwYXJ0Jyk7XG5cblxuICAvLyBSZW1wbGlyIGxlcyBoZXVyZXNcbmZvciAobGV0IGggPSAwOyBoIDwgMjQ7IGgrKykge1xuY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5vcHRpb24udmFsdWUgPSBoLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbm9wdGlvbi50ZXh0Q29udGVudCA9IGgudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xuaG91cnNTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblxufVxuXG5mb3IgKGxldCBtID0gMDsgbSA8IDYwOyBtICs9IDUpIHsgLy8gUGFyIHBhcyBkZSA1IG1pblxuY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5vcHRpb24udmFsdWUgPSBtLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbm9wdGlvbi50ZXh0Q29udGVudCA9IG0udG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xubWludXRlc1NlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xufVxuXG5cblxuZnVuY3Rpb24gdXBkYXRlUGxhY2Vob2xkZXIoc2VsZWN0KSB7XG4gICAgaWYgKHNlbGVjdC52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoJ3ZhbGlkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZCcpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlSGV1cmVEZXBhcnQoKSB7XG4gIGNvbnN0IGhldXJlID0gaG91cnNTZWxlY3QudmFsdWU7XG4gIGNvbnN0IG1pbnV0ZSA9IG1pbnV0ZXNTZWxlY3QudmFsdWU7XG4gIGNvbnN0IGRhdGVJbnB1dCA9IGRhdGVEZXBhcnRJbnB1dC52YWx1ZTsgXG5cbiAgLy8gQ29udmVydGlyIFwiMyBtYWkgMjAyNVwiIGVuIGpvdXIsIG1vaXMsIGFubsOpZVxuICBjb25zdCBtb2lzRnJhbmNhaXMgPSB7XG4gICAgXCJqYW52aWVyXCI6IDAsXG4gICAgXCJmw6l2cmllclwiOiAxLFxuICAgIFwibWFyc1wiOiAyLFxuICAgIFwiYXZyaWxcIjogMyxcbiAgICBcIm1haVwiOiA0LFxuICAgIFwianVpblwiOiA1LFxuICAgIFwianVpbGxldFwiOiA2LFxuICAgIFwiYW/Du3RcIjogNyxcbiAgICBcInNlcHRlbWJyZVwiOiA4LFxuICAgIFwib2N0b2JyZVwiOiA5LFxuICAgIFwibm92ZW1icmVcIjogMTAsXG4gICAgXCJkw6ljZW1icmVcIjogMTFcbiAgfTtcblxuICBjb25zdCBbam91clN0ciwgbW9pc1N0ciwgYW5uZWVTdHJdID0gZGF0ZUlucHV0LnNwbGl0KCcgJyk7XG4gIGNvbnN0IGpvdXIgPSBwYXJzZUludChqb3VyU3RyLCAxMCk7XG4gIGNvbnN0IG1vaXMgPSBtb2lzRnJhbmNhaXNbbW9pc1N0ci50b0xvd2VyQ2FzZSgpXTtcbiAgY29uc3QgYW5uZWUgPSBwYXJzZUludChhbm5lZVN0ciwgMTApO1xuXG4gIGlmIChtb2lzID09PSB1bmRlZmluZWQgfHwgaXNOYU4oam91cikgfHwgaXNOYU4oYW5uZWUpKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkRhdGUgaW52YWxpZGUgOlwiLCBkYXRlSW5wdXQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENyw6llciBsYSBkYXRlIGV0IGFwcGxpcXVlciBs4oCZaGV1cmVcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGFubmVlLCBtb2lzLCBqb3VyLCBoZXVyZSwgbWludXRlLCAwKTtcblxuICAvLyBGb3JtYXQgSVNPIChZWVlZLU1NLUREVEhIOm1tOnNzKSwgVVRDKzAwXG4gIGNvbnN0IGZvcm1hdHRlZCA9IGRhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxOSk7XG5cbiAgaGV1cmVEZXBhcnRJbnB1dC52YWx1ZSA9IGZvcm1hdHRlZDtcbn1cblxuaG91cnNTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgdXBkYXRlUGxhY2Vob2xkZXIodGhpcyk7XG4gICAgdXBkYXRlSGV1cmVEZXBhcnQoKTtcbiAgfSk7XG5cbm1pbnV0ZXNTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gIHVwZGF0ZVBsYWNlaG9sZGVyKHRoaXMpO1xuICB1cGRhdGVIZXVyZURlcGFydCgpO1xufSk7XG5cbmRhdGVEZXBhcnRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgdXBkYXRlSGV1cmVEZXBhcnQoKTtcbn0pO1xuXG5jb25zdCBwcml4SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX3RyYWpldF9wcml4UGVyc29ubmUnKTtcbmNvbnN0IGNyZWRpdExhYmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWRpdC1sYWJlbCcpO1xuXG5wcml4SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgY29uc3QgdmFsdWUgPSBwYXJzZUludCh0aGlzLnZhbHVlLCAxMCk7XG4gIFxuICBpZiAoIWlzTmFOKHZhbHVlKSAmJiB2YWx1ZSA+IDApIHtcbiAgICBjcmVkaXRMYWJlbC50ZXh0Q29udGVudCA9ICh2YWx1ZSA9PT0gMSA/ICdDcsOpZGl0JyA6ICdDcsOpZGl0cycpO1xuICB9IGVsc2Uge1xuICAgIGNyZWRpdExhYmVsLnRleHRDb250ZW50ID0gJyc7XG4gIH1cbn0pO1xuXG5jb25zdCBpdGluZXJhaXJlc1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRpbmVyYWlyZXMtY2hvaWNlcycpO1xuY29uc3QgY29uZmlybUl0aW5lcmFpcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZmlybS1pdGluZXJhaXJlLWJ0bicpO1xuXG5mdW5jdGlvbiByZWNoZXJjaGVySXRpbmVyYWlyZShvcmlnaW4sIGRlc3RpbmF0aW9uKSB7XG4gICAgZmV0Y2goYC9wdWJsaWVyLXRyYWpldC9pdGluZXJhaXJlcz9vcmlnaW49JHtlbmNvZGVVUklDb21wb25lbnQob3JpZ2luKX0mZGVzdGluYXRpb249JHtlbmNvZGVVUklDb21wb25lbnQoZGVzdGluYXRpb24pfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGNvbnN0IGl0aW5lcmFpcmVzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGluZXJhaXJlcy1saXN0Jyk7XG5cbiAgICAgICAgZGF0YS5mb3JFYWNoKHJvdXRlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcm91dGVFbGVtZW50LmRhdGFzZXQucmF3ID0gSlNPTi5zdHJpbmdpZnkocm91dGUucmF3RGF0YSk7XG5cbiAgICAgICAgICAgIHJvdXRlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpdGluZXJhaXJlJyk7XG4gICAgICAgICAgICBjb25zdCBzdW1tYXJ5VGV4dCA9IHJvdXRlLmhhc1RvbGwgPyBgJHtyb3V0ZS5zdW1tYXJ5fSAtIEF2ZWMgcMOpYWdlIGAgOiAnU2FucyBww6lhZ2UnO1xuXG4gICAgICAgICAgICByb3V0ZUVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxzdHJvbmc+JHtzdW1tYXJ5VGV4dH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8c3Bhbj4ke3JvdXRlLmRpc3RhbmNlfSAtICR7cm91dGUuZHVyZWV9PC9zcGFuPlxuICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgaXRpbmVyYWlyZXNMaXN0LmFwcGVuZChyb3V0ZUVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBhZGRUcmFqZXRGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgaXRpbmVyYWlyZXNTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKS5pbm5lckhUTUwgPSBcIkNob2lzaXMgdW4gaXRpbsOpcmFpcmVcIjtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaXRpbmVyYWlyZScpLmZvckVhY2goZnVuY3Rpb24oaXRpbmVyYWlyZSkge1xuICAgICAgICAgICAgaXRpbmVyYWlyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pdGluZXJhaXJlJykuZm9yRWFjaChpdGluZXJhaXJlID0+IGl0aW5lcmFpcmUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGdvb2dsZURhdGFJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfdHJhamV0X2dvb2dsZURhdGEnKTtcblxuICAgICAgICAgICAgICAgIGdvb2dsZURhdGFJbnB1dC52YWx1ZSA9IHRoaXMuZGF0YXNldC5yYXc7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uZmlybUl0aW5lcmFpcmVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29udGludWVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciA6JywgZXJyb3IpO1xuICAgIH0pO1xufVxuXG5jb25zdCBjb250aW51ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250aW51ZS1idG4nKTtcbmNvbnN0IGRlcGFydElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF90cmFqZXRfbGlldURlcGFydCcpO1xuY29uc3QgYXJyaXZlZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF90cmFqZXRfbGlldUFycml2ZWUnKTtcblxuY29uc3QgaXRpbmVyYWlyZXNCYWNrQnRuID0gaXRpbmVyYWlyZXNTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLWJ0bicpO1xuXG5jb250aW51ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgcmVjaGVyY2hlckl0aW5lcmFpcmUoZGVwYXJ0SW5wdXQudmFsdWUsIGFycml2ZWVJbnB1dC52YWx1ZSk7XG5cbiAgICBcblxuXG59KVxuXG5pdGluZXJhaXJlc0JhY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBhZGRUcmFqZXRGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBpdGluZXJhaXJlc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJykuaW5uZXJIVE1MID0gXCJBam91dGVyIHVuIHRyYWpldFwiO1xuXG4gICAgY29uZmlybUl0aW5lcmFpcmVCdG4uY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICBjb25zdCBjdXJyZW50SXRpbmVyYWlyZXNEaXYgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLml0aW5lcmFpcmUnKTtcblxuICAgIGN1cnJlbnRJdGluZXJhaXJlc0Rpdi5mb3JFYWNoKChkaXYpID0+IHtcbiAgICAgIGRpdi5yZW1vdmUoKTtcbiAgICB9KTtcblxufSlcblxuY29uc3QgYWRkVm9pdHVyZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXZvaXR1cmUtYnRuXCIpO1xuXG5hZGRWb2l0dXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIHNob3dBZGRWb2l0dXJlRm9ybSgndHJhamV0LWRldGFpbHMnKTtcblxufSk7XG5cbmluaXRVc2VyVm9pdHVyZUJ0bnMoKTtcblxuY29uc3QgcmVjYXBpdHVsYXRpZlNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjYXBpdHVsYXRpZicpO1xuY29uc3QgcmVjYXBpdHVsYXRpZkJhY2tCdG4gPSByZWNhcGl0dWxhdGlmU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuYmFjay1idG4nKTtcblxuY29uZmlybUl0aW5lcmFpcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKS5pbm5lckhUTUwgPSBcIlLDqWNhcGl0dWxhdGlmXCI7XG4gIHJlY2FwaXR1bGF0aWZTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgaXRpbmVyYWlyZXNTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBjb25zdCBsaWV1RGVwYXJ0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX3RyYWpldF9saWV1RGVwYXJ0Jyk7XG4gIGNvbnN0IGxpZXVBcnJpdmVlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX3RyYWpldF9saWV1QXJyaXZlZScpO1xuICBjb25zdCBwcml4UGFzc2FnZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfdHJhamV0X3ByaXhQZXJzb25uZScpO1xuXG4gIGNvbnN0IHJlY2FwRGF0ZURlcGFydExhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmRhdGUtZGVwYXJ0Jyk7XG4gIGNvbnN0IHJlY2FwbGlldURlcGFydExhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmxpZXUtZGVwYXJ0Jyk7XG4gIGNvbnN0IHJlY2FwSGV1cmVEZXBhcnRMYWJlbCA9IHJlY2FwaXR1bGF0aWZTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5oZXVyZS1kZXBhcnQnKTtcbiAgY29uc3QgcmVjYXBEdXJlZUxhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmR1cmVlJyk7XG4gIGNvbnN0IHJlY2FwRGlzdGFuY2VMYWJlbCA9IHJlY2FwaXR1bGF0aWZTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5kaXN0YW5jZScpO1xuICBjb25zdCByZWNhcGhldXJlQXJyaXZlZUxhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmhldXJlLWFycml2ZWUnKTtcbiAgY29uc3QgcmVjYXBsaWV1QXJyaXZlZUxhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmxpZXUtYXJyaXZlZScpO1xuXG4gIGNvbnN0IHJlY2FwVm9pdHVyZVN1cm5vbUxhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnZvaXR1cmUtc3Vybm9tJyk7XG4gIGNvbnN0IHJlY2FwVm9pdHVyZU1hcnF1ZUxhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnZvaXR1cmUtbWFycXVlJyk7XG4gIGNvbnN0IHJlY2FwVm9pdHVyZU1vZGVsZUxhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnZvaXR1cmUtbW9kZWxlJyk7XG4gIGNvbnN0IHJlY2FwVm9pdHVyZUlzRWxlY3RyaWNMYWJlbCA9IHJlY2FwaXR1bGF0aWZTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy52b2l0dXJlLWlzLWVsZWN0cmljJyk7XG4gIGNvbnN0IHJlY2FwVm9pdHVyZVBsYWNlc0xhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnZvaXR1cmUtcGxhY2UnKTtcbiAgY29uc3QgcmVjYXBWb2l0dXJlQ3JlZGl0c0xhYmVsID0gcmVjYXBpdHVsYXRpZlNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmNyZWRpdHMtcGFzc2FnZXInKTtcblxuICByZWNhcERhdGVEZXBhcnRMYWJlbC5pbm5lckhUTUwgPSBcIkTDqXBhcnQgbGUgXCIgKyBkYXRlRGVwYXJ0SW5wdXQudmFsdWU7XG4gIHJlY2FwbGlldURlcGFydExhYmVsLmlubmVySFRNTCA9IGxpZXVEZXBhcnRJbnB1dC52YWx1ZTtcbiAgcmVjYXBIZXVyZURlcGFydExhYmVsLmlubmVySFRNTCA9IGhvdXJzU2VsZWN0LnZhbHVlICsgXCI6XCIgKyBtaW51dGVzU2VsZWN0LnZhbHVlO1xuICByZWNhcGxpZXVBcnJpdmVlTGFiZWwuaW5uZXJIVE1MID0gbGlldUFycml2ZWVJbnB1dC52YWx1ZTtcbiAgcmVjYXBWb2l0dXJlQ3JlZGl0c0xhYmVsLmlubmVySFRNTCA9IHByaXhQYXNzYWdlcklucHV0LnZhbHVlICsgXCIgY3LDqWRpdHMgLyBwYXNzYWdlclwiO1xuXG4gIGNvbnN0IGN1cnJlbnRJdGluZXJhaXJlU2VsZWN0ZWREaXYgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGluZXJhaXJlLnNlbGVjdGVkJyk7XG5cbiAgY29uc3QgY3VycmVudEl0aW5lcmFpcmVTZWxlY3RlZERhdGFzID0gSlNPTi5wYXJzZShjdXJyZW50SXRpbmVyYWlyZVNlbGVjdGVkRGl2LmRhdGFzZXQucmF3KTtcbiAgXG4gIGNvbnN0IGN1cnJlbnRJdGluZXJhaXJlU2VsZWN0ZWREdXJlZVNlY29uZHMgPSBjdXJyZW50SXRpbmVyYWlyZVNlbGVjdGVkRGF0YXNbJ2xlZ3MnXVswXVsnZHVyYXRpb24nXVsndmFsdWUnXTtcbiAgY29uc3QgY3VycmVudEl0aW5lcmFpcmVTZWxlY3RlZERpc3RhbmNlVGV4dCA9IGN1cnJlbnRJdGluZXJhaXJlU2VsZWN0ZWREYXRhc1snbGVncyddWzBdWydkaXN0YW5jZSddWyd0ZXh0J107XG5cbiAgY29uc3QgY3VycmVudEl0aW5lcmFpcmVTZWxlY3RlZER1cmVlVGV4dCA9IGZvcm1hdFNlY29uZHNUb0hvdXJzTWludXRlcyhjdXJyZW50SXRpbmVyYWlyZVNlbGVjdGVkRHVyZWVTZWNvbmRzKTtcblxuICAvLyByZWNhcGhldXJlQXJyaXZlZUxhYmVsLmlubmVySFRNTCA9IFxuICByZWNhcER1cmVlTGFiZWwuaW5uZXJIVE1MID0gY3VycmVudEl0aW5lcmFpcmVTZWxlY3RlZER1cmVlVGV4dDtcbiAgcmVjYXBEaXN0YW5jZUxhYmVsLmlubmVySFRNTCA9IGN1cnJlbnRJdGluZXJhaXJlU2VsZWN0ZWREaXN0YW5jZVRleHQ7XG4gIHJlY2FwaGV1cmVBcnJpdmVlTGFiZWwuaW5uZXJIVE1MID0gY2FsY3VsZXJIZXVyZUFycml2ZWUoaGV1cmVEZXBhcnRJbnB1dC52YWx1ZSwgY3VycmVudEl0aW5lcmFpcmVTZWxlY3RlZER1cmVlU2Vjb25kcyk7XG5cbiAgXG5cbiAgY29uc3QgY3VycmVudFZvaXR1cmVTZWxlY3RlZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52b2l0dXJlLWNhcmQuc2VsZWN0ZWQnKTtcbiAgY29uc3QgY3VycmVudFZvaXR1cmVTZWxlY3RlZFN1cm5vbSA9IGN1cnJlbnRWb2l0dXJlU2VsZWN0ZWREaXYucXVlcnlTZWxlY3RvcignLnN1cm5vbScpLmlubmVySFRNTDtcbiAgY29uc3QgY3VycmVudFZvaXR1cmVTZWxlY3RlZE1hcnF1ZSA9IGN1cnJlbnRWb2l0dXJlU2VsZWN0ZWREaXYucXVlcnlTZWxlY3RvcignLm1hcnF1ZScpLmlubmVySFRNTDtcbiAgY29uc3QgY3VycmVudFZvaXR1cmVTZWxlY3RlZE1vZGVsZSA9IGN1cnJlbnRWb2l0dXJlU2VsZWN0ZWREaXYucXVlcnlTZWxlY3RvcignLm1vZGVsZScpLmlubmVySFRNTDtcbiAgY29uc3QgY3VycmVudFZvaXR1cmVTZWxlY3RlZElzRWxlY3RyaWMgPSBjdXJyZW50Vm9pdHVyZVNlbGVjdGVkRGl2LnF1ZXJ5U2VsZWN0b3IoJy5pcy1lbGVjdHJpYycpLmlubmVySFRNTDtcbiAgY29uc3QgY3VycmVudFZvaXR1cmVTZWxlY3RlZFBsYWNlcyA9IGN1cnJlbnRWb2l0dXJlU2VsZWN0ZWREaXYucXVlcnlTZWxlY3RvcignLnBsYWNlcycpLmlubmVySFRNTDtcblxuICByZWNhcFZvaXR1cmVTdXJub21MYWJlbC5pbm5lckhUTUwgPSBjdXJyZW50Vm9pdHVyZVNlbGVjdGVkU3Vybm9tO1xuICByZWNhcFZvaXR1cmVNYXJxdWVMYWJlbC5pbm5lckhUTUwgPSBjdXJyZW50Vm9pdHVyZVNlbGVjdGVkTWFycXVlO1xuICByZWNhcFZvaXR1cmVNb2RlbGVMYWJlbC5pbm5lckhUTUwgPSBjdXJyZW50Vm9pdHVyZVNlbGVjdGVkTW9kZWxlO1xuICByZWNhcFZvaXR1cmVJc0VsZWN0cmljTGFiZWwuaW5uZXJIVE1MID0gY3VycmVudFZvaXR1cmVTZWxlY3RlZElzRWxlY3RyaWM7XG4gIHJlY2FwVm9pdHVyZVBsYWNlc0xhYmVsLmlubmVySFRNTCA9IGN1cnJlbnRWb2l0dXJlU2VsZWN0ZWRQbGFjZXM7XG5cbiAgZnVuY3Rpb24gZm9ybWF0U2Vjb25kc1RvSG91cnNNaW51dGVzKHNlY29uZHMpIHtcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgLyA2MCk7XG5cbiAgICBjb25zdCBoID0gaG91cnMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIGNvbnN0IG0gPSBtaW51dGVzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcblxuICAgIHJldHVybiBgJHtofToke219YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGVySGV1cmVBcnJpdmVlKGRlcGFydElzbywgZHVyZWVTZWNvbmRlcykge1xuICAgIGNvbnN0IGRhdGVEZXBhcnQgPSBuZXcgRGF0ZShkZXBhcnRJc28pO1xuICAgIGNvbnN0IGRhdGVBcnJpdmVlID0gbmV3IERhdGUoZGF0ZURlcGFydC5nZXRUaW1lKCkgKyBkdXJlZVNlY29uZGVzICogMTAwMCk7XG5cbiAgICBjb25zdCBoZXVyZXMgPSBkYXRlQXJyaXZlZS5nZXRIb3VycygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICBjb25zdCBtaW51dGVzID0gZGF0ZUFycml2ZWUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcblxuICAgIHJldHVybiBgJHtoZXVyZXN9aCR7bWludXRlc31gO1xufVxuXG5cbn0pXG5cbnJlY2FwaXR1bGF0aWZCYWNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIHJlY2FwaXR1bGF0aWZTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgaXRpbmVyYWlyZXNTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn0pXG5cblxuXG5cblxuXG5cblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImNoZWNrSW5wdXRzIiwiaW5pdFVzZXJWb2l0dXJlQnRucyIsInNob3dBZGRWb2l0dXJlRm9ybSIsImFkZFRyYWpldEZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZmllbGRzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJmaWVsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJob3Vyc1NlbGVjdCIsIm1pbnV0ZXNTZWxlY3QiLCJoZXVyZURlcGFydElucHV0IiwiZGF0ZURlcGFydElucHV0IiwiaCIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsInRvU3RyaW5nIiwicGFkU3RhcnQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwibSIsInVwZGF0ZVBsYWNlaG9sZGVyIiwic2VsZWN0IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwidXBkYXRlSGV1cmVEZXBhcnQiLCJoZXVyZSIsIm1pbnV0ZSIsImRhdGVJbnB1dCIsIm1vaXNGcmFuY2FpcyIsIl9kYXRlSW5wdXQkc3BsaXQiLCJzcGxpdCIsIl9kYXRlSW5wdXQkc3BsaXQyIiwiX3NsaWNlZFRvQXJyYXkiLCJqb3VyU3RyIiwibW9pc1N0ciIsImFubmVlU3RyIiwiam91ciIsInBhcnNlSW50IiwibW9pcyIsInRvTG93ZXJDYXNlIiwiYW5uZWUiLCJ1bmRlZmluZWQiLCJpc05hTiIsImNvbnNvbGUiLCJlcnJvciIsImRhdGUiLCJEYXRlIiwiZm9ybWF0dGVkIiwidG9JU09TdHJpbmciLCJzbGljZSIsInByaXhJbnB1dCIsImNyZWRpdExhYmVsIiwiaXRpbmVyYWlyZXNTZWN0aW9uIiwiY29uZmlybUl0aW5lcmFpcmVCdG4iLCJyZWNoZXJjaGVySXRpbmVyYWlyZSIsIm9yaWdpbiIsImRlc3RpbmF0aW9uIiwiZmV0Y2giLCJjb25jYXQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsIml0aW5lcmFpcmVzTGlzdCIsInJvdXRlIiwicm91dGVFbGVtZW50IiwiZGF0YXNldCIsInJhdyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyYXdEYXRhIiwic3VtbWFyeVRleHQiLCJoYXNUb2xsIiwic3VtbWFyeSIsImlubmVySFRNTCIsImRpc3RhbmNlIiwiZHVyZWUiLCJhcHBlbmQiLCJzdHlsZSIsImRpc3BsYXkiLCJxdWVyeVNlbGVjdG9yIiwiaXRpbmVyYWlyZSIsImdvb2dsZURhdGFJbnB1dCIsImNvbnRpbnVlQnRuIiwiZGVwYXJ0SW5wdXQiLCJhcnJpdmVlSW5wdXQiLCJpdGluZXJhaXJlc0JhY2tCdG4iLCJlIiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50SXRpbmVyYWlyZXNEaXYiLCJkaXYiLCJhZGRWb2l0dXJlQnRuIiwicmVjYXBpdHVsYXRpZlNlY3Rpb24iLCJyZWNhcGl0dWxhdGlmQmFja0J0biIsImxpZXVEZXBhcnRJbnB1dCIsImxpZXVBcnJpdmVlSW5wdXQiLCJwcml4UGFzc2FnZXJJbnB1dCIsInJlY2FwRGF0ZURlcGFydExhYmVsIiwicmVjYXBsaWV1RGVwYXJ0TGFiZWwiLCJyZWNhcEhldXJlRGVwYXJ0TGFiZWwiLCJyZWNhcER1cmVlTGFiZWwiLCJyZWNhcERpc3RhbmNlTGFiZWwiLCJyZWNhcGhldXJlQXJyaXZlZUxhYmVsIiwicmVjYXBsaWV1QXJyaXZlZUxhYmVsIiwicmVjYXBWb2l0dXJlU3Vybm9tTGFiZWwiLCJyZWNhcFZvaXR1cmVNYXJxdWVMYWJlbCIsInJlY2FwVm9pdHVyZU1vZGVsZUxhYmVsIiwicmVjYXBWb2l0dXJlSXNFbGVjdHJpY0xhYmVsIiwicmVjYXBWb2l0dXJlUGxhY2VzTGFiZWwiLCJyZWNhcFZvaXR1cmVDcmVkaXRzTGFiZWwiLCJjdXJyZW50SXRpbmVyYWlyZVNlbGVjdGVkRGl2IiwiY3VycmVudEl0aW5lcmFpcmVTZWxlY3RlZERhdGFzIiwicGFyc2UiLCJjdXJyZW50SXRpbmVyYWlyZVNlbGVjdGVkRHVyZWVTZWNvbmRzIiwiY3VycmVudEl0aW5lcmFpcmVTZWxlY3RlZERpc3RhbmNlVGV4dCIsImN1cnJlbnRJdGluZXJhaXJlU2VsZWN0ZWREdXJlZVRleHQiLCJmb3JtYXRTZWNvbmRzVG9Ib3Vyc01pbnV0ZXMiLCJjYWxjdWxlckhldXJlQXJyaXZlZSIsImN1cnJlbnRWb2l0dXJlU2VsZWN0ZWREaXYiLCJjdXJyZW50Vm9pdHVyZVNlbGVjdGVkU3Vybm9tIiwiY3VycmVudFZvaXR1cmVTZWxlY3RlZE1hcnF1ZSIsImN1cnJlbnRWb2l0dXJlU2VsZWN0ZWRNb2RlbGUiLCJjdXJyZW50Vm9pdHVyZVNlbGVjdGVkSXNFbGVjdHJpYyIsImN1cnJlbnRWb2l0dXJlU2VsZWN0ZWRQbGFjZXMiLCJzZWNvbmRzIiwiaG91cnMiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzIiwiZGVwYXJ0SXNvIiwiZHVyZWVTZWNvbmRlcyIsImRhdGVEZXBhcnQiLCJkYXRlQXJyaXZlZSIsImdldFRpbWUiLCJoZXVyZXMiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiXSwic291cmNlUm9vdCI6IiJ9