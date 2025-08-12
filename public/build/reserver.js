(self["webpackChunk"] = self["webpackChunk"] || []).push([["reserver"],{

/***/ "./assets/js/reserver.js":
/*!*******************************!*\
  !*** ./assets/js/reserver.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ../app */ "./assets/app.js"),
  showPopup = _require.showPopup,
  hidePopup = _require.hidePopup;
document.addEventListener('DOMContentLoaded', function () {
  var showPopupBtn = document.getElementById('show-add-credits-section-btn');
  var addCreditsSection = document.querySelector('.add-credits');
  var addCreditsBtn = document.getElementById('add-credits-btn');
  var creditsSelect = document.getElementById('credits-select');
  var hidePopupBtn = addCreditsSection.querySelector('.close-popup-btn');

  // Afficher le popup
  if (showPopupBtn) {
    showPopupBtn.addEventListener('click', function () {
      showPopup(addCreditsSection, "flex");
    });
  }
  if (hidePopupBtn) {
    hidePopupBtn.addEventListener('click', function () {
      hidePopup(addCreditsSection);
    });
  }

  // Appel AJAX/FETCH au clic sur "Valider"
  addCreditsBtn.addEventListener('click', function () {
    var selectedCredits = creditsSelect.value;
    fetch("/ajouter-credits?credits=".concat(selectedCredits), {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (response) {
      if (!response.ok) throw new Error("Erreur lors de l'ajout des crédits.");
      return response.json(); // ou .text() selon ce que retourne ton endpoint
    }).then(function (data) {
      alert("Succ\xE8s : ".concat(selectedCredits, " cr\xE9dits ajout\xE9s !"));
      window.location.reload();
      // hidePopup(addCreditsSection);
      // const userCreditsLabel = document.getElementById('user-credits')
      // userCreditsLabel.innerText = data.credits + "¢";

      // const creditsNeeded = parseInt(document.getElementById('credits-needed').innerText.replace(/\D/g, ''), 10);

      // if (parseInt(data.credits, 10) >= creditsNeeded) {
      //     userCreditsLabel.style.color = "#386150";
      // }
      // Tu peux mettre à jour le solde ici si tu veux
    })["catch"](function (error) {
      alert("Une erreur s'est produite : " + error.message);
    });
  });
});
function initContinueBtnEvent() {
  var continueBtn = document.getElementById('continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var recap1Section = document.getElementById('recap-1');
      var recap2Section = document.getElementById('recap-2');
      recap1Section.style.display = "none";
      recap2Section.style.display = "flex";
    });
  }
}
initContinueBtnEvent();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["assets_styles_app_scss","assets_app_js"], () => (__webpack_exec__("./assets/js/reserver.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0FBTyxHQUFJLE1BQU07SUFHekMsQ0FBQyxDQUFDO0VBQ047QUFDSjtBQUNBUCxvQkFBb0IsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3Jlc2VydmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgc2hvd1BvcHVwLCBoaWRlUG9wdXAgfSA9IHJlcXVpcmUoXCIuLi9hcHBcIik7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBzaG93UG9wdXBCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1hZGQtY3JlZGl0cy1zZWN0aW9uLWJ0bicpO1xuICAgIGNvbnN0IGFkZENyZWRpdHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1jcmVkaXRzJyk7XG4gICAgY29uc3QgYWRkQ3JlZGl0c0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtY3JlZGl0cy1idG4nKTtcbiAgICBjb25zdCBjcmVkaXRzU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWRpdHMtc2VsZWN0Jyk7XG4gICAgY29uc3QgaGlkZVBvcHVwQnRuID0gYWRkQ3JlZGl0c1NlY3Rpb24ucXVlcnlTZWxlY3RvcignLmNsb3NlLXBvcHVwLWJ0bicpXG5cbiAgICAvLyBBZmZpY2hlciBsZSBwb3B1cFxuICAgIGlmIChzaG93UG9wdXBCdG4pIHtcbiAgICAgICAgc2hvd1BvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgc2hvd1BvcHVwKGFkZENyZWRpdHNTZWN0aW9uLCBcImZsZXhcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChoaWRlUG9wdXBCdG4pIHtcbiAgICAgICAgaGlkZVBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBoaWRlUG9wdXAoYWRkQ3JlZGl0c1NlY3Rpb24pO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBcblxuICAgIC8vIEFwcGVsIEFKQVgvRkVUQ0ggYXUgY2xpYyBzdXIgXCJWYWxpZGVyXCJcbiAgICBhZGRDcmVkaXRzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZENyZWRpdHMgPSBjcmVkaXRzU2VsZWN0LnZhbHVlO1xuXG4gICAgICAgIGZldGNoKGAvYWpvdXRlci1jcmVkaXRzP2NyZWRpdHM9JHtzZWxlY3RlZENyZWRpdHN9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbCdham91dCBkZXMgY3LDqWRpdHMuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTsgLy8gb3UgLnRleHQoKSBzZWxvbiBjZSBxdWUgcmV0b3VybmUgdG9uIGVuZHBvaW50XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgYWxlcnQoYFN1Y2PDqHMgOiAke3NlbGVjdGVkQ3JlZGl0c30gY3LDqWRpdHMgYWpvdXTDqXMgIWApO1xuXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAvLyBoaWRlUG9wdXAoYWRkQ3JlZGl0c1NlY3Rpb24pO1xuICAgICAgICAgICAgLy8gY29uc3QgdXNlckNyZWRpdHNMYWJlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLWNyZWRpdHMnKVxuICAgICAgICAgICAgLy8gdXNlckNyZWRpdHNMYWJlbC5pbm5lclRleHQgPSBkYXRhLmNyZWRpdHMgKyBcIsKiXCI7XG5cbiAgICAgICAgICAgIC8vIGNvbnN0IGNyZWRpdHNOZWVkZWQgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlZGl0cy1uZWVkZWQnKS5pbm5lclRleHQucmVwbGFjZSgvXFxEL2csICcnKSwgMTApO1xuXG4gICAgICAgICAgICAvLyBpZiAocGFyc2VJbnQoZGF0YS5jcmVkaXRzLCAxMCkgPj0gY3JlZGl0c05lZWRlZCkge1xuICAgICAgICAgICAgLy8gICAgIHVzZXJDcmVkaXRzTGFiZWwuc3R5bGUuY29sb3IgPSBcIiMzODYxNTBcIjtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIFR1IHBldXggbWV0dHJlIMOgIGpvdXIgbGUgc29sZGUgaWNpIHNpIHR1IHZldXhcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KFwiVW5lIGVycmV1ciBzJ2VzdCBwcm9kdWl0ZSA6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGluaXRDb250aW51ZUJ0bkV2ZW50KCkge1xuICAgIGNvbnN0IGNvbnRpbnVlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRpbnVlLWJ0bicpO1xuXG4gICAgaWYgKGNvbnRpbnVlQnRuKSB7XG4gICAgICAgIGNvbnRpbnVlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCByZWNhcDFTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlY2FwLTEnKTtcbiAgICAgICAgICAgIGNvbnN0IHJlY2FwMlNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjYXAtMicpO1xuXG4gICAgICAgICAgICByZWNhcDFTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAgXCJub25lXCI7XG4gICAgICAgICAgICByZWNhcDJTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAgXCJmbGV4XCI7XG4gICAgICAgICAgICBcblxuICAgICAgICB9KVxuICAgIH1cbn1cbmluaXRDb250aW51ZUJ0bkV2ZW50KCk7Il0sIm5hbWVzIjpbIl9yZXF1aXJlIiwicmVxdWlyZSIsInNob3dQb3B1cCIsImhpZGVQb3B1cCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNob3dQb3B1cEJ0biIsImdldEVsZW1lbnRCeUlkIiwiYWRkQ3JlZGl0c1NlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwiYWRkQ3JlZGl0c0J0biIsImNyZWRpdHNTZWxlY3QiLCJoaWRlUG9wdXBCdG4iLCJzZWxlY3RlZENyZWRpdHMiLCJ2YWx1ZSIsImZldGNoIiwiY29uY2F0IiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiRXJyb3IiLCJqc29uIiwiZGF0YSIsImFsZXJ0Iiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJlcnJvciIsIm1lc3NhZ2UiLCJpbml0Q29udGludWVCdG5FdmVudCIsImNvbnRpbnVlQnRuIiwiZSIsInByZXZlbnREZWZhdWx0IiwicmVjYXAxU2VjdGlvbiIsInJlY2FwMlNlY3Rpb24iLCJzdHlsZSIsImRpc3BsYXkiXSwic291cmNlUm9vdCI6IiJ9