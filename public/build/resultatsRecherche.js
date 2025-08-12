"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resultatsRecherche"],{

/***/ "./assets/js/resultatsRecherche.js":
/*!*****************************************!*\
  !*** ./assets/js/resultatsRecherche.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app */ "./assets/app.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

document.addEventListener("DOMContentLoaded", function () {
  var mobileToggleFilter = document.getElementById('toggle-filter-mobile');
  var filtersSection = document.getElementById('filters-section');
  var blurEffectDiv = document.querySelector('.blur-effect');
  mobileToggleFilter.addEventListener("click", function () {
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.showPopup)(filtersSection, 'flex');
  });
  var mobileShowSearchForm = document.getElementById("show-form-mobile");
  var mobileHideSearchForm = document.getElementById('hide-form-btn-mobile');
  var searchFormDiv = document.querySelector('.form-div');
  mobileShowSearchForm.addEventListener('click', function () {
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.showPopup)(searchFormDiv, 'flex');
  });
  mobileHideSearchForm.addEventListener('click', function () {
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.hidePopup)(searchFormDiv);
  });
  var inputsLabels = document.querySelectorAll('label');
  var radioInputsLabels = document.querySelectorAll('.radio-label');
  inputsLabels.forEach(function (label) {
    label.addEventListener('click', function () {
      //definir la logique sur pc
      label.classList.toggle('active');
    });
  });
  radioInputsLabels.forEach(function (label) {
    label.addEventListener('click', function (e) {
      radioInputsLabels.forEach(function (label) {
        label.classList.remove('active');
      });
      //definir la logique sur pc
      this.classList.toggle('active');
    });
  });
  var seeResultsFilterBtn = document.getElementById('see-results-filter-btn');
  var resetFiltersBtn = document.getElementById('reset-filters-btn');
  var emptyMessage = document.getElementById('empty-message');
  var alternativeMessage = document.getElementById('alternative-message');
  seeResultsFilterBtn.addEventListener('click', function () {
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.hidePopup)(filtersSection);
  });
  resetFiltersBtn.addEventListener('click', function () {
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(function (input) {
      input.checked = false;
    });
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.hidePopup)(filtersSection);
    inputsLabels.forEach(function (label) {
      label.classList.remove('active');
    });
    document.querySelectorAll('.trajet-div').forEach(function (trajet) {
      trajet.style.display = "block";
    });
    if (document.querySelectorAll('.trajet').length > 0) {
      emptyMessage.classList.remove('visible');
    }
    //gerer le cas ou des le premier chargement pas de résultat. Il faudrait dans ce cas cacher la rubrique filtre
    if (alternativeMessage) {
      alternativeMessage.style.display = 'block';
    }
    resetFiltersBtn.style.display = "none";
  });
  function appliquerFiltres() {
    var _document$querySelect;
    var notes = Array.from(document.querySelectorAll('input[name="note"]:checked')).map(function (el) {
      return el.value;
    });
    var electrique = (_document$querySelect = document.querySelector('input[name="electric"]:checked')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value;
    var heures = Array.from(document.querySelectorAll('input[name="date_depart"]:checked')).map(function (el) {
      return el.value;
    });
    resetFiltersBtn.style.display = 'block';
    var isAllTrajetsHidden = true;
    document.querySelectorAll('.trajet-div').forEach(function (trajet) {
      var note = parseFloat(trajet.dataset.note || 0);
      var isElectrique = trajet.dataset.electrique === '1';
      var heureDepart = trajet.dataset.heureDepart || "00:00";
      var visible = true;

      // Note
      if (notes.length) {
        visible = notes.some(function (val) {
          if (val === 'plus_4') return note >= 4;
          if (val === 'plus_3') return note >= 3;
          return true;
        });
      }

      // Électrique
      if (visible && electrique) {
        visible = electrique === '1' === isElectrique;
      }

      // Filtre Heure de départ
      if (visible && heures.length) {
        var _heureDepart$split$ma = heureDepart.split(':').map(Number),
          _heureDepart$split$ma2 = _slicedToArray(_heureDepart$split$ma, 2),
          h = _heureDepart$split$ma2[0],
          m = _heureDepart$split$ma2[1];
        var totalMinutes = h * 60 + m;
        visible = heures.some(function (val) {
          if (val === 'avant_6h') return totalMinutes < 360;
          if (val === '6h_12h') return totalMinutes >= 360 && totalMinutes < 720;
          if (val === '12h_18h') return totalMinutes >= 720 && totalMinutes < 1080;
          if (val === 'apres_18h') return totalMinutes >= 1080;
          return true;
        });
      }
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
    var _document$querySelect2;
    var critere = (_document$querySelect2 = document.querySelector('input[name="sort"]:checked')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value;
    var trajetsContainer = document.querySelector('.trajets'); // adapte le sélecteur si besoin
    var trajets = Array.from(trajetsContainer.querySelectorAll('.trajet-div'));
    resetFiltersBtn.style.display = "flex";

    // Fonction de comparaison selon le critère sélectionné
    var compare = {
      'prix': function prix(a, b) {
        return parseFloat(a.dataset.prix) - parseFloat(b.dataset.prix);
      },
      'duree': function duree(a, b) {
        return parseInt(a.dataset.duree) - parseInt(b.dataset.duree);
      },
      'note_chauffeur': function note_chauffeur(a, b) {
        return parseFloat(b.dataset.note || 0) - parseFloat(a.dataset.note || 0);
      }
    };
    if (critere && compare[critere]) {
      trajets.sort(compare[critere]).forEach(function (trajet) {
        return trajetsContainer.appendChild(trajet);
      }); // réinsère dans l'ordre trié
    }
  }
  document.querySelectorAll('input[type="checkbox"]').forEach(function (input) {
    input.addEventListener('change', appliquerFiltres);
  });
  document.querySelectorAll('input[type="radio"]').forEach(function (input) {
    input.addEventListener('change', trier);
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["assets_styles_app_scss","assets_app_js"], () => (__webpack_exec__("./assets/js/resultatsRecherche.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEdBQUdDLFVBQVUsQ0FBQ3VCLENBQUMsQ0FBQ3RCLE9BQU8sQ0FBQ0YsSUFBSSxJQUFJLENBQUMsQ0FBQztNQUFBO0lBQ2pHLENBQUM7SUFFRCxJQUFJbUIsT0FBTyxJQUFJRyxPQUFPLENBQUNILE9BQU8sQ0FBQyxFQUFFO01BQzdCRSxPQUFPLENBQ0ZRLElBQUksQ0FBQ1AsT0FBTyxDQUFDSCxPQUFPLENBQUMsQ0FBQyxDQUN0QjlDLE9BQU8sQ0FBQyxVQUFBWSxNQUFNO1FBQUEsT0FBSW1DLGdCQUFnQixDQUFDVSxXQUFXLENBQUM3QyxNQUFNLENBQUM7TUFBQSxFQUFDLENBQUMsQ0FBQztJQUNsRTtFQUNKO0VBS0F6QixRQUFRLENBQUNXLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUNFLE9BQU8sQ0FBQyxVQUFBVSxLQUFLLEVBQUk7SUFDakVBLEtBQUssQ0FBQ3RCLGdCQUFnQixDQUFDLFFBQVEsRUFBRTRCLGdCQUFnQixDQUFDO0VBQ3RELENBQUMsQ0FBQztFQUVGN0IsUUFBUSxDQUFDVyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDRSxPQUFPLENBQUMsVUFBQVUsS0FBSyxFQUFJO0lBQzlEQSxLQUFLLENBQUN0QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUV3RCxLQUFLLENBQUM7RUFDM0MsQ0FBQyxDQUFDO0FBRU4sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3Jlc3VsdGF0c1JlY2hlcmNoZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2hpZGVQb3B1cCwgc2hvd1BvcHVwfSBmcm9tICcuLi9hcHAnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbW9iaWxlVG9nZ2xlRmlsdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZ2dsZS1maWx0ZXItbW9iaWxlJyk7XG4gICAgY29uc3QgZmlsdGVyc1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVycy1zZWN0aW9uJyk7XG4gICAgY29uc3QgYmx1ckVmZmVjdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibHVyLWVmZmVjdCcpXG5cbiAgICBtb2JpbGVUb2dnbGVGaWx0ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2hvd1BvcHVwKGZpbHRlcnNTZWN0aW9uLCAnZmxleCcpO1xuICAgIH0pO1xuXG4gICAgXG5cbiAgICBjb25zdCBtb2JpbGVTaG93U2VhcmNoRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hvdy1mb3JtLW1vYmlsZVwiKTtcbiAgICBjb25zdCBtb2JpbGVIaWRlU2VhcmNoRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRlLWZvcm0tYnRuLW1vYmlsZScpO1xuICAgIGNvbnN0IHNlYXJjaEZvcm1EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1kaXYnKTtcblxuICAgIG1vYmlsZVNob3dTZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNob3dQb3B1cChzZWFyY2hGb3JtRGl2LCAnZmxleCcpO1xuICAgIH0pXG4gICAgbW9iaWxlSGlkZVNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaGlkZVBvcHVwKHNlYXJjaEZvcm1EaXYpO1xuICAgIH0pXG5cbiAgICBjb25zdCBpbnB1dHNMYWJlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCcpO1xuICAgIGNvbnN0IHJhZGlvSW5wdXRzTGFiZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJhZGlvLWxhYmVsJyk7XG5cbiAgICBpbnB1dHNMYWJlbHMuZm9yRWFjaCgobGFiZWwpID0+IHtcbiAgICAgICAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vZGVmaW5pciBsYSBsb2dpcXVlIHN1ciBwY1xuICAgICAgICAgICAgbGFiZWwuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIHJhZGlvSW5wdXRzTGFiZWxzLmZvckVhY2goKGxhYmVsKSA9PiB7XG4gICAgICAgIGxhYmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmFkaW9JbnB1dHNMYWJlbHMuZm9yRWFjaCgobGFiZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIC8vZGVmaW5pciBsYSBsb2dpcXVlIHN1ciBwY1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcblxuXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbnN0IHNlZVJlc3VsdHNGaWx0ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlLXJlc3VsdHMtZmlsdGVyLWJ0bicpO1xuICAgIGNvbnN0IHJlc2V0RmlsdGVyc0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldC1maWx0ZXJzLWJ0bicpO1xuICAgIGNvbnN0IGVtcHR5TWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbXB0eS1tZXNzYWdlJyk7XG4gICAgY29uc3QgYWx0ZXJuYXRpdmVNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsdGVybmF0aXZlLW1lc3NhZ2UnKTtcblxuICAgIHNlZVJlc3VsdHNGaWx0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaGlkZVBvcHVwKGZpbHRlcnNTZWN0aW9uKTtcbiAgICB9KVxuXG4gICAgcmVzZXRGaWx0ZXJzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdJykuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhpZGVQb3B1cChmaWx0ZXJzU2VjdGlvbik7XG5cbiAgICAgICAgaW5wdXRzTGFiZWxzLmZvckVhY2goKGxhYmVsKSA9PiB7XG4gICAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfSlcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHJhamV0LWRpdicpLmZvckVhY2godHJhamV0ID0+IHtcbiAgICAgICAgICAgIHRyYWpldC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHJhamV0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZW1wdHlNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgICAvL2dlcmVyIGxlIGNhcyBvdSBkZXMgbGUgcHJlbWllciBjaGFyZ2VtZW50IHBhcyBkZSByw6lzdWx0YXQuIElsIGZhdWRyYWl0IGRhbnMgY2UgY2FzIGNhY2hlciBsYSBydWJyaXF1ZSBmaWx0cmVcbiAgICAgICAgaWYgKGFsdGVybmF0aXZlTWVzc2FnZSkge1xuICAgICAgICAgICAgYWx0ZXJuYXRpdmVNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzZXRGaWx0ZXJzQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICBcblxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBhcHBsaXF1ZXJGaWx0cmVzKCkge1xuICAgICAgICBjb25zdCBub3RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cIm5vdGVcIl06Y2hlY2tlZCcpKS5tYXAoZWwgPT4gZWwudmFsdWUpO1xuICAgICAgICBjb25zdCBlbGVjdHJpcXVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImVsZWN0cmljXCJdOmNoZWNrZWQnKT8udmFsdWU7XG4gICAgICAgIGNvbnN0IGhldXJlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cImRhdGVfZGVwYXJ0XCJdOmNoZWNrZWQnKSkubWFwKGVsID0+IGVsLnZhbHVlKTtcbiAgICAgICAgcmVzZXRGaWx0ZXJzQnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBcblxuICAgICAgICBsZXQgaXNBbGxUcmFqZXRzSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50cmFqZXQtZGl2JykuZm9yRWFjaCh0cmFqZXQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm90ZSA9IHBhcnNlRmxvYXQodHJhamV0LmRhdGFzZXQubm90ZSB8fCAwKTtcbiAgICAgICAgICAgIGNvbnN0IGlzRWxlY3RyaXF1ZSA9IHRyYWpldC5kYXRhc2V0LmVsZWN0cmlxdWUgPT09ICcxJztcbiAgICAgICAgICAgIGNvbnN0IGhldXJlRGVwYXJ0ID0gdHJhamV0LmRhdGFzZXQuaGV1cmVEZXBhcnQgfHwgXCIwMDowMFwiO1xuICAgIFxuICAgICAgICAgICAgbGV0IHZpc2libGUgPSB0cnVlO1xuICAgIFxuICAgICAgICAgICAgLy8gTm90ZVxuICAgICAgICAgICAgaWYgKG5vdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZpc2libGUgPSBub3Rlcy5zb21lKHZhbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09ICdwbHVzXzQnKSByZXR1cm4gbm90ZSA+PSA0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09PSAncGx1c18zJykgcmV0dXJuIG5vdGUgPj0gMztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAvLyDDiWxlY3RyaXF1ZVxuICAgICAgICAgICAgaWYgKHZpc2libGUgJiYgZWxlY3RyaXF1ZSkge1xuICAgICAgICAgICAgICAgIHZpc2libGUgPSAoZWxlY3RyaXF1ZSA9PT0gJzEnKSA9PT0gaXNFbGVjdHJpcXVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGaWx0cmUgSGV1cmUgZGUgZMOpcGFydFxuICAgICAgICAgICAgaWYgKHZpc2libGUgJiYgaGV1cmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtoLCBtXSA9IGhldXJlRGVwYXJ0LnNwbGl0KCc6JykubWFwKE51bWJlcik7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWxNaW51dGVzID0gaCAqIDYwICsgbTtcbiAgICBcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gaGV1cmVzLnNvbWUodmFsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gJ2F2YW50XzZoJykgcmV0dXJuIHRvdGFsTWludXRlcyA8IDM2MDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gJzZoXzEyaCcpIHJldHVybiB0b3RhbE1pbnV0ZXMgPj0gMzYwICYmIHRvdGFsTWludXRlcyA8IDcyMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gJzEyaF8xOGgnKSByZXR1cm4gdG90YWxNaW51dGVzID49IDcyMCAmJiB0b3RhbE1pbnV0ZXMgPCAxMDgwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09PSAnYXByZXNfMThoJykgcmV0dXJuIHRvdGFsTWludXRlcyA+PSAxMDgwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBpc0FsbFRyYWpldHNIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIC8vIEFmZmljaGFnZVxuICAgICAgICAgICAgdHJhamV0LnN0eWxlLmRpc3BsYXkgPSB2aXNpYmxlID8gJycgOiAnbm9uZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc0FsbFRyYWpldHNIaWRkZW4pIHtcbiAgICAgICAgICAgIGVtcHR5TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG5cbiAgICAgICAgICAgIGlmIChhbHRlcm5hdGl2ZU1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBhbHRlcm5hdGl2ZU1lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW1wdHlNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcblxuICAgICAgICAgICAgaWYgKGFsdGVybmF0aXZlTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGFsdGVybmF0aXZlTWVzc2FnZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJpZXIoKSB7XG4gICAgICAgIGNvbnN0IGNyaXRlcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwic29ydFwiXTpjaGVja2VkJyk/LnZhbHVlO1xuICAgICAgICBjb25zdCB0cmFqZXRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyYWpldHMnKTsgLy8gYWRhcHRlIGxlIHPDqWxlY3RldXIgc2kgYmVzb2luXG4gICAgICAgIGNvbnN0IHRyYWpldHMgPSBBcnJheS5mcm9tKHRyYWpldHNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnRyYWpldC1kaXYnKSk7XG5cbiAgICAgICAgcmVzZXRGaWx0ZXJzQnRuLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBcbiAgICAgICAgLy8gRm9uY3Rpb24gZGUgY29tcGFyYWlzb24gc2Vsb24gbGUgY3JpdMOocmUgc8OpbGVjdGlvbm7DqVxuICAgICAgICBjb25zdCBjb21wYXJlID0ge1xuICAgICAgICAgICAgJ3ByaXgnOiAoYSwgYikgPT4gcGFyc2VGbG9hdChhLmRhdGFzZXQucHJpeCkgLSBwYXJzZUZsb2F0KGIuZGF0YXNldC5wcml4KSxcbiAgICAgICAgICAgICdkdXJlZSc6IChhLCBiKSA9PiBwYXJzZUludChhLmRhdGFzZXQuZHVyZWUpIC0gcGFyc2VJbnQoYi5kYXRhc2V0LmR1cmVlKSxcbiAgICAgICAgICAgICdub3RlX2NoYXVmZmV1cic6IChhLCBiKSA9PiBwYXJzZUZsb2F0KGIuZGF0YXNldC5ub3RlIHx8IDApIC0gcGFyc2VGbG9hdChhLmRhdGFzZXQubm90ZSB8fCAwKSxcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgaWYgKGNyaXRlcmUgJiYgY29tcGFyZVtjcml0ZXJlXSkge1xuICAgICAgICAgICAgdHJhamV0c1xuICAgICAgICAgICAgICAgIC5zb3J0KGNvbXBhcmVbY3JpdGVyZV0pXG4gICAgICAgICAgICAgICAgLmZvckVhY2godHJhamV0ID0+IHRyYWpldHNDb250YWluZXIuYXBwZW5kQ2hpbGQodHJhamV0KSk7IC8vIHLDqWluc8OocmUgZGFucyBsJ29yZHJlIHRyacOpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cblxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFwcGxpcXVlckZpbHRyZXMpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJykuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRyaWVyKTtcbiAgICB9KTtcbiAgICBcbn0pOyJdLCJuYW1lcyI6WyJoaWRlUG9wdXAiLCJzaG93UG9wdXAiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtb2JpbGVUb2dnbGVGaWx0ZXIiLCJnZXRFbGVtZW50QnlJZCIsImZpbHRlcnNTZWN0aW9uIiwiYmx1ckVmZmVjdERpdiIsInF1ZXJ5U2VsZWN0b3IiLCJtb2JpbGVTaG93U2VhcmNoRm9ybSIsIm1vYmlsZUhpZGVTZWFyY2hGb3JtIiwic2VhcmNoRm9ybURpdiIsImlucHV0c0xhYmVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyYWRpb0lucHV0c0xhYmVscyIsImZvckVhY2giLCJsYWJlbCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImUiLCJyZW1vdmUiLCJzZWVSZXN1bHRzRmlsdGVyQnRuIiwicmVzZXRGaWx0ZXJzQnRuIiwiZW1wdHlNZXNzYWdlIiwiYWx0ZXJuYXRpdmVNZXNzYWdlIiwiaW5wdXQiLCJjaGVja2VkIiwidHJhamV0Iiwic3R5bGUiLCJkaXNwbGF5IiwibGVuZ3RoIiwiYXBwbGlxdWVyRmlsdHJlcyIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdCIsIm5vdGVzIiwiQXJyYXkiLCJmcm9tIiwibWFwIiwiZWwiLCJ2YWx1ZSIsImVsZWN0cmlxdWUiLCJoZXVyZXMiLCJpc0FsbFRyYWpldHNIaWRkZW4iLCJub3RlIiwicGFyc2VGbG9hdCIsImRhdGFzZXQiLCJpc0VsZWN0cmlxdWUiLCJoZXVyZURlcGFydCIsInZpc2libGUiLCJzb21lIiwidmFsIiwiX2hldXJlRGVwYXJ0JHNwbGl0JG1hIiwic3BsaXQiLCJOdW1iZXIiLCJfaGV1cmVEZXBhcnQkc3BsaXQkbWEyIiwiX3NsaWNlZFRvQXJyYXkiLCJoIiwibSIsInRvdGFsTWludXRlcyIsImFkZCIsInRyaWVyIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0MiIsImNyaXRlcmUiLCJ0cmFqZXRzQ29udGFpbmVyIiwidHJhamV0cyIsImNvbXBhcmUiLCJwcml4IiwiYSIsImIiLCJkdXJlZSIsInBhcnNlSW50Iiwibm90ZV9jaGF1ZmZldXIiLCJzb3J0IiwiYXBwZW5kQ2hpbGQiXSwic291cmNlUm9vdCI6IiJ9