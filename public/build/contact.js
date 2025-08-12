"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["contact"],{

/***/ "./assets/js/contact.js":
/*!******************************!*\
  !*** ./assets/js/contact.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app */ "./assets/app.js");

var contactForm = document.querySelector('form');
var contactFormInputs = contactForm.querySelectorAll('input, textarea');
var contactFormSubmitBtn = contactForm.querySelector('.submit-btn');
contactFormInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.checkInputs)(contactForm);
  });
});
contactFormSubmitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  var formData = new FormData(contactForm);
  contactFormSubmitBtn.classList.add('inactive');
  fetch('/contact', {
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

    (0,_app__WEBPACK_IMPORTED_MODULE_0__.treatFormAlert)(contactForm, 'Message envoyé', data);
    contactForm.reset();
    contactFormSubmitBtn.classList.add('inactive');
  })["catch"](function (error) {
    return console.error('Erreur:', error);
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["assets_styles_app_scss","assets_app_js"], () => (__webpack_exec__("./assets/js/contact.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFxRDtBQUVyRCxJQUFNRSxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztBQUVsRCxJQUFNQyxpQkFBaUIsR0FBR0gsV0FBVyxDQUFDSSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQztBQUN6RSxJQUFNQyxvQkFBb0IsR0FBR0wsV0FBVyxDQUFDRSxhQUFhLENBQUMsYUFBYSxDQUFDO0FBRXJFQyxpQkFBaUIsQ0FBQ0csT0FBTyxDQUFDLFVBQUNDLEtBQUssRUFBSztFQUVqQ0EsS0FBSyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUN2Q1YsaURBQVcsQ0FBQ0UsV0FBVyxDQUFDO0VBQzVCLENBQUMsQ0FBQztBQUVOLENBQUMsQ0FBQztBQUVGSyxvQkFBb0IsQ0FBQ0csZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVNDLENBQUMsRUFBRTtFQUN2REEsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztFQUVsQixJQUFNQyxRQUFRLEdBQUcsSUFBSUMsUUFBUSxDQUFDWixXQUFXLENBQUM7RUFDMUNLLG9CQUFvQixDQUFDUSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7RUFFOUNDLEtBQUssQ0FBQyxVQUFVLEVBQUU7SUFDZEMsTUFBTSxFQUFFLE1BQU07SUFDZEMsSUFBSSxFQUFFTixRQUFRO0lBQ2RPLE9BQU8sRUFBRTtNQUNMLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDO0lBQ3pDO0VBQ0osQ0FBQyxDQUFDLENBQ0RDLElBQUksQ0FBQyxVQUFBQyxRQUFRLEVBQUk7SUFDZCxJQUFJLENBQUNBLFFBQVEsQ0FBQ0MsRUFBRSxFQUFFO01BQ2QsTUFBTSxJQUFJQyxLQUFLLENBQUMsZUFBZSxDQUFDO0lBQ3BDO0lBQ0EsT0FBT0YsUUFBUSxDQUFDRyxJQUFJLENBQUMsQ0FBQztFQUMxQixDQUFDLENBQUMsQ0FDREosSUFBSSxDQUFDLFVBQUFLLElBQUksRUFBSTtJQUNWOztJQUVBekIsb0RBQWMsQ0FBQ0MsV0FBVyxFQUFFLGdCQUFnQixFQUFFd0IsSUFBSSxDQUFDO0lBQ25EeEIsV0FBVyxDQUFDeUIsS0FBSyxDQUFDLENBQUM7SUFFbkJwQixvQkFBb0IsQ0FBQ1EsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0VBRWxELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQVksS0FBSztJQUFBLE9BQUlDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLFNBQVMsRUFBRUEsS0FBSyxDQUFDO0VBQUEsRUFBQztBQUNwRCxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29udGFjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjaGVja0lucHV0cywgdHJlYXRGb3JtQWxlcnQgfSBmcm9tIFwiLi4vYXBwXCI7XG5cbmNvbnN0IGNvbnRhY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXG5jb25zdCBjb250YWN0Rm9ybUlucHV0cyA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYScpO1xuY29uc3QgY29udGFjdEZvcm1TdWJtaXRCdG4gPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuXG5jb250YWN0Rm9ybUlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIFxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2hlY2tJbnB1dHMoY29udGFjdEZvcm0pO1xuICAgIH0pXG4gICAgXG59KVxuXG5jb250YWN0Rm9ybVN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShjb250YWN0Rm9ybSk7XG4gICAgY29udGFjdEZvcm1TdWJtaXRCdG4uY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcblxuICAgIGZldGNoKCcvY29udGFjdCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgLy8gaW1wb3J0YW50IHBvdXIgaW5kaXF1ZXIgdW5lIHJlcXXDqnRlIEFKQVhcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VycmV1ciByw6lzZWF1Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAvLyBkYXRhLmh0bWwgY29udGllbnQgdG9uIGZvcm11bGFpcmUgcmVuZHVcblxuICAgICAgICB0cmVhdEZvcm1BbGVydChjb250YWN0Rm9ybSwgJ01lc3NhZ2UgZW52b3nDqScsIGRhdGEpO1xuICAgICAgICBjb250YWN0Rm9ybS5yZXNldCgpO1xuXG4gICAgICAgIGNvbnRhY3RGb3JtU3VibWl0QnRuLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG5cbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJldXI6JywgZXJyb3IpKTtcbn0pIl0sIm5hbWVzIjpbImNoZWNrSW5wdXRzIiwidHJlYXRGb3JtQWxlcnQiLCJjb250YWN0Rm9ybSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRhY3RGb3JtSW5wdXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImNvbnRhY3RGb3JtU3VibWl0QnRuIiwiZm9yRWFjaCIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJjbGFzc0xpc3QiLCJhZGQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJFcnJvciIsImpzb24iLCJkYXRhIiwicmVzZXQiLCJlcnJvciIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9