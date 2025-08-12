(self["webpackChunk"] = self["webpackChunk"] || []).push([["googlePlace"],{

/***/ "./assets/js/googlePlace.js":
/*!**********************************!*\
  !*** ./assets/js/googlePlace.js ***!
  \**********************************/
/***/ (() => {

function initAutocomplete() {
  var inputs = document.querySelectorAll('.adresse-autocomplete');
  inputs.forEach(function (input) {
    new google.maps.places.Autocomplete(input, {
      types: ['establishment'],
      componentRestrictions: {
        country: 'fr'
      } // optionnel : limite à la France
    });
  });
}

// window.initAutocomplete = initAutocomplete;

// document.addEventListener('DOMContentLoaded', initAutocomplete);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./assets/js/googlePlace.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlUGxhY2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxTQUFTQSxnQkFBZ0JBLENBQUEsRUFBRztFQUN4QixJQUFNQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUM7RUFDakVGLE1BQU0sQ0FBQ0csT0FBTyxDQUFDLFVBQUNDLEtBQUssRUFBSztJQUN0QixJQUFJQyxNQUFNLENBQUNDLElBQUksQ0FBQ0MsTUFBTSxDQUFDQyxZQUFZLENBQUNKLEtBQUssRUFBRTtNQUN2Q0ssS0FBSyxFQUFFLENBQUMsZUFBZSxDQUFDO01BQ3hCQyxxQkFBcUIsRUFBRTtRQUFFQyxPQUFPLEVBQUU7TUFBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBQ047O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZ29vZ2xlUGxhY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gaW5pdEF1dG9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWRyZXNzZS1hdXRvY29tcGxldGUnKTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUoaW5wdXQsIHtcbiAgICAgICAgICAgIHR5cGVzOiBbJ2VzdGFibGlzaG1lbnQnXSxcbiAgICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczogeyBjb3VudHJ5OiAnZnInIH0gLy8gb3B0aW9ubmVsIDogbGltaXRlIMOgIGxhIEZyYW5jZVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gd2luZG93LmluaXRBdXRvY29tcGxldGUgPSBpbml0QXV0b2NvbXBsZXRlO1xuXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdEF1dG9jb21wbGV0ZSk7Il0sIm5hbWVzIjpbImluaXRBdXRvY29tcGxldGUiLCJpbnB1dHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaW5wdXQiLCJnb29nbGUiLCJtYXBzIiwicGxhY2VzIiwiQXV0b2NvbXBsZXRlIiwidHlwZXMiLCJjb21wb25lbnRSZXN0cmljdGlvbnMiLCJjb3VudHJ5Il0sInNvdXJjZVJvb3QiOiIifQ==