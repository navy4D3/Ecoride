(self["webpackChunk"] = self["webpackChunk"] || []).push([["assets_app_js"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkInputs: () => (/* binding */ checkInputs),
/* harmony export */   checkPasswordValidity: () => (/* binding */ checkPasswordValidity),
/* harmony export */   checkRegisterFormValidity: () => (/* binding */ checkRegisterFormValidity),
/* harmony export */   hidePopup: () => (/* binding */ hidePopup),
/* harmony export */   showErrors: () => (/* binding */ showErrors),
/* harmony export */   showPopup: () => (/* binding */ showPopup),
/* harmony export */   showSuccessAlert: () => (/* binding */ showSuccessAlert),
/* harmony export */   treatFormAlert: () => (/* binding */ treatFormAlert)
/* harmony export */ });
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap */ "./assets/bootstrap.js");
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bootstrap__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */

var navbarMenuIcon = document.getElementById('navbar-menu-icon');
var navbarBtns = document.getElementById('navbar-btns');
var navbarCloseMobileMenuBtn = document.getElementById('navbar-close-mobile-menu');
var navbarLogo = document.querySelector('.navbar_logo');
function animateToggle(element) {
  var animationClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'fade-slide-down';
  if (element.classList.contains('show')) {
    element.classList.remove('show');
    element.addEventListener('transitionend', function handleTransition() {
      element.classList.remove(animationClass); // clean si besoin
      element.style.display = "none";
      element.removeEventListener('transitionend', handleTransition);
    });
  } else {
    element.style.display = "flex";
    element.classList.add(animationClass);
    requestAnimationFrame(function () {
      element.classList.add('show');
    });
  }
}
function animateToggle2(el) {
  var animationClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'fade';
  var displayType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'flex';
  return new Promise(function (resolve) {
    var isHidden = getComputedStyle(el).display === 'none';

    // Cas : AFFICHER l'élément
    if (isHidden) {
      el.style.display = displayType;
      el.classList.add(animationClass);

      // Forcer un reflow pour permettre à la transition de se déclencher
      requestAnimationFrame(function () {
        el.classList.add('show');
      });
      el.addEventListener('transitionend', function handler(e) {
        if (e.target === el) {
          el.removeEventListener('transitionend', handler);
          resolve();
        }
      });
    }

    // Cas : MASQUER l'élément
    else {
      el.classList.remove('show');
      el.addEventListener('transitionend', function handler(e) {
        if (e.target === el) {
          el.style.display = 'none';
          el.classList.remove(animationClass);
          el.removeEventListener('transitionend', handler);
          resolve();
        }
      });
    }
  });
}
if (navbarMenuIcon) {
  navbarMenuIcon.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var animation;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          navbarMenuIcon.style.display = "none";
          navbarLogo.style.display = "none";
          navbarBtns.style.display = "flex";
          navbarBtns.style.overflow = "hidden";
          animation = navbarBtns.animate({
            // display: ["none", "flex"],
            // opacity: [0, 1],
            maxHeight: [0, "200px"]
            // transform: ["scaleY(0)", "scaleX(1)"],
          }, {
            fill: "both",
            duration: 500,
            easing: 'ease'
            // timeline,
            // rangeStart: "cover 0%",
            // rangeEnd: "cover 100%",
          });
          animation.finished.then(function () {
            navbarCloseMobileMenuBtn.style.display = "flex";
            navbarCloseMobileMenuBtn.animate({
              opacity: [0, 1]
            }, {
              fill: "both",
              duration: 500
            });
          });
          if (window.innerWidth < 768) {
            document.querySelector(".navbar_buttons").style.paddingTop = '30px';
          }
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
}
if (navbarCloseMobileMenuBtn) {
  navbarCloseMobileMenuBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var animation;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // fadeOut(navbarBtns);
          navbarCloseMobileMenuBtn.style.display = "none";
          animation = navbarBtns.animate({
            opacity: [0, 1],
            maxHeight: ["200px", 0]
            // transform: ["scaleY(0)", "scaleX(1)"],
          }, {
            fill: "both",
            duration: 500
            // timeline,
            // rangeStart: "cover 0%",
            // rangeEnd: "cover 100%",
          });
          animation.finished.then(function () {
            navbarBtns.style.display = "none";
            navbarMenuIcon.style.display = "flex";
            navbarMenuIcon.animate({
              opacity: [0, 1]
            }, {
              fill: "both",
              duration: 1000
            });
            navbarLogo.style.display = "flex";
            navbarLogo.animate({
              opacity: [0, 1]
            }, {
              fill: "both",
              duration: 1000
            });
          });

          // navbarBtns.classList.remove("show");

          // navbarBtns.addEventListener('transitionend', function handler() {
          //     navbarBtns.style.display = 'none';

          //     navbarBtns.removeEventListener('transitionend', handler);
          // });

          // navbarLogo.classList.add('fadeup');
          // navbarMenuIcon.classList.add('fadeup');
          // navbarLogo.style.display =  "flex";
          // navbarMenuIcon.style.display =  "flex";

          // requestAnimationFrame(() => {
          //     navbarLogo.classList.add('show');
          //     navbarMenuIcon.classList.add('show');

          // })

          // navbarLogo.addEventListener('transitionend', function handler() {
          //     navbarLogo.classList.remove('fadeup')
          //     navbarLogo.classList.remove('show');
          //     navbarMenuIcon.classList.remove('fadeup');
          //     navbarMenuIcon.classList.remove('show');

          //     navbarLogo.removeEventListener('transitionend', handler);
          // });
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
}
function checkInputs(currentForm) {
  var submitBtn = currentForm.querySelector('.submit-btn');
  var fields = currentForm.querySelectorAll('input, select, textarea');
  var allFilled = true;
  fields.forEach(function (field) {
    //ignore les input hidden
    if (field.type === 'hidden' || !field.required) return;
    if (field.type === 'checkbox') {
      // Ne valider que les checkboxes marquées comme "required"
      if (field.required && !field.checked) {
        allFilled = false;
      }
    }
    if (field.value.trim() === '') {
      allFilled = false;
    }
  });
  if (allFilled) {
    submitBtn.classList.remove('inactive');
  } else {
    submitBtn.classList.add('inactive');
  }
}
function treatFormAlert(form, successAlert, jsonData) {
  var errorsContainer = form.querySelector('.errors-container');
  if (jsonData.status == "success") {
    showSuccessAlert(successAlert);
    if (errorsContainer) {
      errorsContainer.remove();
    }
  } else {
    if (!errorsContainer) {
      errorsContainer = document.createElement("div");
      errorsContainer.classList.add('errors-container');
      form.insertAdjacentElement('afterBegin', errorsContainer);
    }
    var newHtml = '';
    jsonData.errors.forEach(function (error) {
      newHtml += "\n                <div class=\"alert alert-danger\">\n                    ".concat(error.message, "\n                </div>\n                ");
    });
    errorsContainer.innerHTML = newHtml;
  }
}
function showSuccessAlert(message) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  var alert = document.createElement('div');
  alert.className = 'alert alert-success alert-dismissible fade show';
  alert.role = 'alert';
  alert.innerHTML = "\n      ".concat(message, "\n      \n    ");
  // <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

  // Ajoute l'alerte en haut du body (ou ailleurs selon ton design)
  document.body.prepend(alert);

  // Supprime l'alerte automatiquement après `duration` ms
  setTimeout(function () {
    alert.classList.remove('show'); // déclenche la transition
    alert.classList.add('hide'); // si besoin
    setTimeout(function () {
      return alert.remove();
    }, 300); // laisse le temps à la transition de s'effectuer
  }, duration);
}
function showErrors(alerts) {
  var alert = document.createElement('div');
  alert.className = 'alert alert-error alert-dismissible fade show';
  alert.role = 'alert';
  var message = "";
  alerts.forEach(function (alert) {
    message = message + "<br>" + alert.message;
  });
  alert.innerHTML = message;
}
function showPopup(divToShow, displayType) {
  var blurEffect = document.querySelector('.blur-effect');
  blurEffect.style.display = "block";
  divToShow.style.display = displayType;
  var hidePopupBtn = divToShow.querySelector('.hide-btn');
  if (hidePopupBtn) {
    hidePopupBtn.addEventListener('click', function () {
      hidePopup(divToShow);
    });
  }
}
function hidePopup(divToHide) {
  var blurEffect = document.querySelector('.blur-effect');
  blurEffect.style.display = "none";
  divToHide.style.display = "none";
}
function checkPasswordValidity(passwordInputId) {
  var lengthCriteria = document.getElementById('length');
  var lowercaseCriteria = document.getElementById('lowercase');
  var uppercaseCriteria = document.getElementById('uppercase');
  var numberCriteria = document.getElementById('number');
  var specialCriteria = document.getElementById('special');
  var passwordInput = document.getElementById(passwordInputId);
  // const confirmPasswordInput = document.getElementById(confirmPasswordInputIdd);

  var password = passwordInput.value;
  function toggleValidity(element, isValid) {
    if (isValid) {
      element.classList.remove('invalid');
      element.classList.add('valid');
    } else {
      element.classList.remove('valid');
      element.classList.add('invalid');
    }
  }

  // Longueur >= 8
  toggleValidity(lengthCriteria, password.length >= 8);

  // Contient une minuscule
  toggleValidity(lowercaseCriteria, /[a-z]/.test(password));

  // Contient une majuscule
  toggleValidity(uppercaseCriteria, /[A-Z]/.test(password));

  // Contient un chiffre
  toggleValidity(numberCriteria, /\d/.test(password));

  // Contient un caractère spécial
  toggleValidity(specialCriteria, /[^A-Za-z0-9]/.test(password));

  // checkRegisterFormValidity();
}
function checkRegisterFormValidity(form, passwordInput, confirmPasswordInput) {
  var emailInput = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var cguInput = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var currentPasswordInput = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var password = passwordInput.value;
  var confirm = confirmPasswordInput.value;
  var submitBtn = form.querySelector('.submit-btn');
  var isPasswordMatch = password && confirm && password === confirm;
  var passwordInputValidity = document.querySelectorAll('.valid').length == document.getElementById('password-criteria').children.length;
  var cguCheck = cguInput ? cguInput.checked : true;
  var currentPasswordCheck = currentPasswordInput ? currentPasswordInput.value : true;
  var emailCheck = emailInput ? emailInput.value : true;
  if (isPasswordMatch && emailCheck && cguCheck && passwordInputValidity && currentPasswordCheck) {
    submitBtn.classList.remove('inactive');
  } else {
    submitBtn.classList.add('inactive');
  }
}

/***/ }),

/***/ "./assets/bootstrap.js":
/*!*****************************!*\
  !*** ./assets/bootstrap.js ***!
  \*****************************/
/***/ (() => {

// import { startStimulusApp } from '@symfony/stimulus-bundle';

// const app = startStimulusApp();
// register any custom, 3rd party controllers here
// app.register('some_controller_name', SomeImportedController);

/***/ }),

/***/ "./assets/styles/app.scss":
/*!********************************!*\
  !*** ./assets/styles/app.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YnBhY2s6Ly8vLi9hc3NldHMvYm9vdHN0cmFwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3M/OGY1OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vYm9vdHN0cmFwJztcbi8qXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXG4gKlxuICogVGhpcyBmaWxlIHdpbGwgYmUgaW5jbHVkZWQgb250byB0aGUgcGFnZSB2aWEgdGhlIGltcG9ydG1hcCgpIFR3aWcgZnVuY3Rpb24sXG4gKiB3aGljaCBzaG91bGQgYWxyZWFkeSBiZSBpbiB5b3VyIGJhc2UuaHRtbC50d2lnLlxuICovXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcblxuY29uc3QgbmF2YmFyTWVudUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyLW1lbnUtaWNvbicpO1xuY29uc3QgbmF2YmFyQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZiYXItYnRucycpO1xuY29uc3QgbmF2YmFyQ2xvc2VNb2JpbGVNZW51QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhci1jbG9zZS1tb2JpbGUtbWVudScpO1xuY29uc3QgbmF2YmFyTG9nbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXJfbG9nbycpO1xuXG5mdW5jdGlvbiBhbmltYXRlVG9nZ2xlKGVsZW1lbnQsIGFuaW1hdGlvbkNsYXNzID0gJ2ZhZGUtc2xpZGUtZG93bicpIHtcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gaGFuZGxlVHJhbnNpdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShhbmltYXRpb25DbGFzcyk7IC8vIGNsZWFuIHNpIGJlc29pblxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gIFwibm9uZVwiO1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlVHJhbnNpdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYW5pbWF0aW9uQ2xhc3MpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYW5pbWF0ZVRvZ2dsZTIoZWwsIGFuaW1hdGlvbkNsYXNzID0gJ2ZhZGUnLCBkaXNwbGF5VHlwZSA9ICdmbGV4Jykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBpc0hpZGRlbiA9IGdldENvbXB1dGVkU3R5bGUoZWwpLmRpc3BsYXkgPT09ICdub25lJztcblxuICAgICAgICAvLyBDYXMgOiBBRkZJQ0hFUiBsJ8OpbMOpbWVudFxuICAgICAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5VHlwZTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYW5pbWF0aW9uQ2xhc3MpO1xuXG4gICAgICAgICAgICAvLyBGb3JjZXIgdW4gcmVmbG93IHBvdXIgcGVybWV0dHJlIMOgIGxhIHRyYW5zaXRpb24gZGUgc2UgZMOpY2xlbmNoZXJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FzIDogTUFTUVVFUiBsJ8OpbMOpbWVudFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcblxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShhbmltYXRpb25DbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuXG5cbmlmIChuYXZiYXJNZW51SWNvbikge1xuICAgIG5hdmJhck1lbnVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgZnVuY3Rpb24oKSB7ICAgXG4gICAgICAgIG5hdmJhck1lbnVJY29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgbmF2YmFyTG9nby5zdHlsZS5kaXNwbGF5ID1cIm5vbmVcIjtcbiAgICAgICAgbmF2YmFyQnRucy5zdHlsZS5kaXNwbGF5ID0gIFwiZmxleFwiO1xuICAgICAgICBuYXZiYXJCdG5zLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gbmF2YmFyQnRucy5hbmltYXRlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXk6IFtcIm5vbmVcIiwgXCJmbGV4XCJdLFxuICAgICAgICAgICAgICAgIC8vIG9wYWNpdHk6IFswLCAxXSxcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IFswLCBcIjIwMHB4XCJdLFxuICAgICAgICAgICAgICAgIC8vIHRyYW5zZm9ybTogW1wic2NhbGVZKDApXCIsIFwic2NhbGVYKDEpXCJdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcImJvdGhcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2Vhc2UnXG4gICAgICAgICAgICAgICAgLy8gdGltZWxpbmUsXG4gICAgICAgICAgICAgICAgLy8gcmFuZ2VTdGFydDogXCJjb3ZlciAwJVwiLFxuICAgICAgICAgICAgICAgIC8vIHJhbmdlRW5kOiBcImNvdmVyIDEwMCVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICBhbmltYXRpb24uZmluaXNoZWQudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIG5hdmJhckNsb3NlTW9iaWxlTWVudUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgICAgICBuYXZiYXJDbG9zZU1vYmlsZU1lbnVCdG4uYW5pbWF0ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IFswLCAxXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogXCJib3RoXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgXG5cbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdmJhcl9idXR0b25zXCIpLnN0eWxlLnBhZGRpbmdUb3AgPSAnMzBweCc7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cblxuaWYgKG5hdmJhckNsb3NlTW9iaWxlTWVudUJ0bikge1xuICAgIG5hdmJhckNsb3NlTW9iaWxlTWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBmYWRlT3V0KG5hdmJhckJ0bnMpO1xuICAgICAgICBuYXZiYXJDbG9zZU1vYmlsZU1lbnVCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gbmF2YmFyQnRucy5hbmltYXRlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IFswLCAxXSxcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IFtcIjIwMHB4XCIsIDBdLFxuICAgICAgICAgICAgICAgIC8vIHRyYW5zZm9ybTogW1wic2NhbGVZKDApXCIsIFwic2NhbGVYKDEpXCJdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcImJvdGhcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgICAgICAgIC8vIHRpbWVsaW5lLFxuICAgICAgICAgICAgICAgIC8vIHJhbmdlU3RhcnQ6IFwiY292ZXIgMCVcIixcbiAgICAgICAgICAgICAgICAvLyByYW5nZUVuZDogXCJjb3ZlciAxMDAlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuXG4gICAgICAgIGFuaW1hdGlvbi5maW5pc2hlZC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIG5hdmJhckJ0bnMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAgICAgICBuYXZiYXJNZW51SWNvbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgICAgICBuYXZiYXJNZW51SWNvbi5hbmltYXRlKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogWzAsIDFdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxsOiBcImJvdGhcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG5hdmJhckxvZ28uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgbmF2YmFyTG9nby5hbmltYXRlKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogWzAsIDFdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWxsOiBcImJvdGhcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG5cblxuXG4gICAgICAgIC8vIG5hdmJhckJ0bnMuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgIFxuXG4gICAgICAgIC8vIG5hdmJhckJ0bnMuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgIC8vICAgICBuYXZiYXJCdG5zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgXG5cbiAgICAgICAgLy8gICAgIG5hdmJhckJ0bnMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyBuYXZiYXJMb2dvLmNsYXNzTGlzdC5hZGQoJ2ZhZGV1cCcpO1xuICAgICAgICAvLyBuYXZiYXJNZW51SWNvbi5jbGFzc0xpc3QuYWRkKCdmYWRldXAnKTtcbiAgICAgICAgLy8gbmF2YmFyTG9nby5zdHlsZS5kaXNwbGF5ID0gIFwiZmxleFwiO1xuICAgICAgICAvLyBuYXZiYXJNZW51SWNvbi5zdHlsZS5kaXNwbGF5ID0gIFwiZmxleFwiO1xuICAgICAgICBcblxuICAgICAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAvLyAgICAgbmF2YmFyTG9nby5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgIC8vICAgICBuYXZiYXJNZW51SWNvbi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cbiAgICAgICAgLy8gfSlcblxuICAgICAgICAvLyBuYXZiYXJMb2dvLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAvLyAgICAgbmF2YmFyTG9nby5jbGFzc0xpc3QucmVtb3ZlKCdmYWRldXAnKVxuICAgICAgICAvLyAgICAgbmF2YmFyTG9nby5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgIC8vICAgICBuYXZiYXJNZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYWRldXAnKTtcbiAgICAgICAgLy8gICAgIG5hdmJhck1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcblxuICAgICAgICAvLyAgICAgbmF2YmFyTG9nby5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcik7XG4gICAgICAgIC8vIH0pO1xuXG5cbiAgICB9KVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lucHV0cyhjdXJyZW50Rm9ybSkge1xuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGN1cnJlbnRGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtYnRuJyk7XG4gICAgY29uc3QgZmllbGRzID0gY3VycmVudEZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblxuICAgIGxldCBhbGxGaWxsZWQgPSB0cnVlO1xuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgLy9pZ25vcmUgbGVzIGlucHV0IGhpZGRlblxuICAgICAgICBpZiAoZmllbGQudHlwZSA9PT0gJ2hpZGRlbicgfHwgIWZpZWxkLnJlcXVpcmVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIC8vIE5lIHZhbGlkZXIgcXVlIGxlcyBjaGVja2JveGVzIG1hcnF1w6llcyBjb21tZSBcInJlcXVpcmVkXCJcbiAgICAgICAgICAgIGlmIChmaWVsZC5yZXF1aXJlZCAmJiAhZmllbGQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGFsbEZpbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpZWxkLnZhbHVlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIGFsbEZpbGxlZCA9IGZhbHNlO1xuXG4gICAgICAgIH1cblxuICAgIFxuICAgIH0pO1xuXG4gICAgaWYgKGFsbEZpbGxlZCkge1xuICAgICAgICBzdWJtaXRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdWJtaXRCdG4uY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmVhdEZvcm1BbGVydChmb3JtLCBzdWNjZXNzQWxlcnQsIGpzb25EYXRhKSB7XG4gICAgICAgIGxldCBlcnJvcnNDb250YWluZXIgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcnMtY29udGFpbmVyJyk7XG5cbiAgICAgICAgaWYgKGpzb25EYXRhLnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgc2hvd1N1Y2Nlc3NBbGVydChzdWNjZXNzQWxlcnQpO1xuXG4gICAgICAgICAgICBpZiAoZXJyb3JzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghZXJyb3JzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBlcnJvcnNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXJyb3JzLWNvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICAgICAgZm9ybS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyQmVnaW4nLCBlcnJvcnNDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbmV3SHRtbCA9ICcnO1xuICAgICAgICAgICAganNvbkRhdGEuZXJyb3JzLmZvckVhY2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0h0bWwgKz0gYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgJHtlcnJvci5tZXNzYWdlfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXJyb3JzQ29udGFpbmVyLmlubmVySFRNTCA9IG5ld0h0bWw7XG4gICAgICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTdWNjZXNzQWxlcnQobWVzc2FnZSwgZHVyYXRpb24gPSAzMDAwKSB7XG4gICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhbGVydC5jbGFzc05hbWUgPSAnYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3cnO1xuICAgIGFsZXJ0LnJvbGUgPSAnYWxlcnQnO1xuICAgIGFsZXJ0LmlubmVySFRNTCA9IGBcbiAgICAgICR7bWVzc2FnZX1cbiAgICAgIFxuICAgIGA7XG4gICAgLy8gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tY2xvc2VcIiBkYXRhLWJzLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPjwvYnV0dG9uPlxuICBcbiAgICAvLyBBam91dGUgbCdhbGVydGUgZW4gaGF1dCBkdSBib2R5IChvdSBhaWxsZXVycyBzZWxvbiB0b24gZGVzaWduKVxuICAgIGRvY3VtZW50LmJvZHkucHJlcGVuZChhbGVydCk7XG4gIFxuICAgIC8vIFN1cHByaW1lIGwnYWxlcnRlIGF1dG9tYXRpcXVlbWVudCBhcHLDqHMgYGR1cmF0aW9uYCBtc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgYWxlcnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpOyAvLyBkw6ljbGVuY2hlIGxhIHRyYW5zaXRpb25cbiAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTsgLy8gc2kgYmVzb2luXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGFsZXJ0LnJlbW92ZSgpLCAzMDApOyAvLyBsYWlzc2UgbGUgdGVtcHMgw6AgbGEgdHJhbnNpdGlvbiBkZSBzJ2VmZmVjdHVlclxuICAgIH0sIGR1cmF0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcnMoYWxlcnRzKSB7XG4gICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhbGVydC5jbGFzc05hbWUgPSAnYWxlcnQgYWxlcnQtZXJyb3IgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93JztcbiAgICBhbGVydC5yb2xlID0gJ2FsZXJ0JztcbiAgICBcblxuICAgIGxldCBtZXNzYWdlID0gXCJcIlxuXG4gICAgYWxlcnRzLmZvckVhY2goKGFsZXJ0KSA9PiB7XG4gICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlICsgXCI8YnI+XCIgKyBhbGVydC5tZXNzYWdlXG4gICAgfSk7XG5cbiAgICBhbGVydC5pbm5lckhUTUwgPSBtZXNzYWdlO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93UG9wdXAoZGl2VG9TaG93LCBkaXNwbGF5VHlwZSkge1xuICAgIGNvbnN0IGJsdXJFZmZlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmx1ci1lZmZlY3QnKTtcblxuICAgIGJsdXJFZmZlY3Quc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBkaXZUb1Nob3cuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlUeXBlO1xuXG4gICAgY29uc3QgaGlkZVBvcHVwQnRuID0gZGl2VG9TaG93LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLWJ0bicpO1xuXG4gICAgaWYgKGhpZGVQb3B1cEJ0bikge1xuICAgICAgICBoaWRlUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGhpZGVQb3B1cChkaXZUb1Nob3cpO1xuICAgICAgICB9KVxuICAgIH1cblxuXG59XG5leHBvcnQgZnVuY3Rpb24gaGlkZVBvcHVwKGRpdlRvSGlkZSkge1xuICAgIGNvbnN0IGJsdXJFZmZlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmx1ci1lZmZlY3QnKTtcblxuICAgIGJsdXJFZmZlY3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRpdlRvSGlkZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1Bhc3N3b3JkVmFsaWRpdHkocGFzc3dvcmRJbnB1dElkKSB7XG5cbiAgICBjb25zdCBsZW5ndGhDcml0ZXJpYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZW5ndGgnKTtcbiAgICBjb25zdCBsb3dlcmNhc2VDcml0ZXJpYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb3dlcmNhc2UnKTtcbiAgICBjb25zdCB1cHBlcmNhc2VDcml0ZXJpYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cHBlcmNhc2UnKTtcbiAgICBjb25zdCBudW1iZXJDcml0ZXJpYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudW1iZXInKTtcbiAgICBjb25zdCBzcGVjaWFsQ3JpdGVyaWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BlY2lhbCcpO1xuICBcbiAgICBjb25zdCBwYXNzd29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFzc3dvcmRJbnB1dElkKTtcbiAgICAvLyBjb25zdCBjb25maXJtUGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbmZpcm1QYXNzd29yZElucHV0SWRkKTtcbiAgXG4gICAgY29uc3QgcGFzc3dvcmQgPSBwYXNzd29yZElucHV0LnZhbHVlO1xuICBcbiAgICBmdW5jdGlvbiB0b2dnbGVWYWxpZGl0eShlbGVtZW50LCBpc1ZhbGlkKSB7XG4gICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd2YWxpZCcpO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWQnKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkJyk7XG4gICAgICAgIFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExvbmd1ZXVyID49IDhcbiAgdG9nZ2xlVmFsaWRpdHkobGVuZ3RoQ3JpdGVyaWEsIHBhc3N3b3JkLmxlbmd0aCA+PSA4KTtcbiAgICBcbiAgLy8gQ29udGllbnQgdW5lIG1pbnVzY3VsZVxuICB0b2dnbGVWYWxpZGl0eShsb3dlcmNhc2VDcml0ZXJpYSwgL1thLXpdLy50ZXN0KHBhc3N3b3JkKSk7XG5cbiAgLy8gQ29udGllbnQgdW5lIG1hanVzY3VsZVxuICB0b2dnbGVWYWxpZGl0eSh1cHBlcmNhc2VDcml0ZXJpYSwgL1tBLVpdLy50ZXN0KHBhc3N3b3JkKSk7XG5cbiAgLy8gQ29udGllbnQgdW4gY2hpZmZyZVxuICB0b2dnbGVWYWxpZGl0eShudW1iZXJDcml0ZXJpYSwgL1xcZC8udGVzdChwYXNzd29yZCkpO1xuXG4gIC8vIENvbnRpZW50IHVuIGNhcmFjdMOocmUgc3DDqWNpYWxcbiAgdG9nZ2xlVmFsaWRpdHkoc3BlY2lhbENyaXRlcmlhLCAvW15BLVphLXowLTldLy50ZXN0KHBhc3N3b3JkKSk7XG5cbiAgLy8gY2hlY2tSZWdpc3RlckZvcm1WYWxpZGl0eSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tSZWdpc3RlckZvcm1WYWxpZGl0eShmb3JtLCBwYXNzd29yZElucHV0LCBjb25maXJtUGFzc3dvcmRJbnB1dCwgZW1haWxJbnB1dCA9IG51bGwsIGNndUlucHV0ID0gbnVsbCwgY3VycmVudFBhc3N3b3JkSW5wdXQgPSBudWxsKSB7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBwYXNzd29yZElucHV0LnZhbHVlO1xuICAgIGNvbnN0IGNvbmZpcm0gPSBjb25maXJtUGFzc3dvcmRJbnB1dC52YWx1ZTtcbiAgICBjb25zdCBzdWJtaXRCdG4gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtYnRuJyk7XG4gICAgXG5cbiAgICBjb25zdCBpc1Bhc3N3b3JkTWF0Y2ggPSBwYXNzd29yZCAmJiBjb25maXJtICYmIHBhc3N3b3JkID09PSBjb25maXJtO1xuICAgIGNvbnN0IHBhc3N3b3JkSW5wdXRWYWxpZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52YWxpZCcpLmxlbmd0aCA9PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQtY3JpdGVyaWEnKS5jaGlsZHJlbi5sZW5ndGg7XG5cbiAgICBsZXQgY2d1Q2hlY2sgPSBjZ3VJbnB1dCA/IGNndUlucHV0LmNoZWNrZWQgOiB0cnVlO1xuXG4gICAgbGV0IGN1cnJlbnRQYXNzd29yZENoZWNrID0gY3VycmVudFBhc3N3b3JkSW5wdXQgPyBjdXJyZW50UGFzc3dvcmRJbnB1dC52YWx1ZSA6IHRydWU7XG5cbiAgICBsZXQgZW1haWxDaGVjayA9IGVtYWlsSW5wdXQgPyBlbWFpbElucHV0LnZhbHVlIDogdHJ1ZVxuXG4gICAgaWYgKGlzUGFzc3dvcmRNYXRjaCAmJiBlbWFpbENoZWNrICYmIGNndUNoZWNrICYmIHBhc3N3b3JkSW5wdXRWYWxpZGl0eSAmJiBjdXJyZW50UGFzc3dvcmRDaGVjaykge1xuICAgICAgc3VibWl0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Ym1pdEJ0bi5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZScpO1xuICAgIH1cbn1cblxuXG4iLCIvLyBpbXBvcnQgeyBzdGFydFN0aW11bHVzQXBwIH0gZnJvbSAnQHN5bWZvbnkvc3RpbXVsdXMtYnVuZGxlJztcblxuLy8gY29uc3QgYXBwID0gc3RhcnRTdGltdWx1c0FwcCgpO1xuLy8gcmVnaXN0ZXIgYW55IGN1c3RvbSwgM3JkIHBhcnR5IGNvbnRyb2xsZXJzIGhlcmVcbi8vIGFwcC5yZWdpc3Rlcignc29tZV9jb250cm9sbGVyX25hbWUnLCBTb21lSW1wb3J0ZWRDb250cm9sbGVyKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZSIsInQiLCJyIiwiT2JqZWN0IiwicHJvdG90eXBlIiwibiIsImhhc093blByb3BlcnR5IiwibyIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJpIiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsInR5cGUiLCJhcmciLCJjYWxsIiwiaCIsImwiLCJmIiwicyIsInkiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwicCIsImQiLCJnZXRQcm90b3R5cGVPZiIsInYiLCJ2YWx1ZXMiLCJnIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIl9pbnZva2UiLCJBc3luY0l0ZXJhdG9yIiwiaW52b2tlIiwiX3R5cGVvZiIsInJlc29sdmUiLCJfX2F3YWl0IiwidGhlbiIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiRXJyb3IiLCJkb25lIiwibWV0aG9kIiwiZGVsZWdhdGUiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJUeXBlRXJyb3IiLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImlzTmFOIiwibGVuZ3RoIiwiZGlzcGxheU5hbWUiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJrZXlzIiwicmV2ZXJzZSIsInBvcCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJydmFsIiwiaGFuZGxlIiwiY29tcGxldGUiLCJmaW5pc2giLCJfY2F0Y2giLCJkZWxlZ2F0ZVlpZWxkIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwibmF2YmFyTWVudUljb24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibmF2YmFyQnRucyIsIm5hdmJhckNsb3NlTW9iaWxlTWVudUJ0biIsIm5hdmJhckxvZ28iLCJxdWVyeVNlbGVjdG9yIiwiYW5pbWF0ZVRvZ2dsZSIsImVsZW1lbnQiLCJhbmltYXRpb25DbGFzcyIsInVuZGVmaW5lZCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVRyYW5zaXRpb24iLCJzdHlsZSIsImRpc3BsYXkiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYW5pbWF0ZVRvZ2dsZTIiLCJlbCIsImRpc3BsYXlUeXBlIiwiaXNIaWRkZW4iLCJnZXRDb21wdXRlZFN0eWxlIiwiaGFuZGxlciIsInRhcmdldCIsIl9jYWxsZWUiLCJhbmltYXRpb24iLCJfY2FsbGVlJCIsIl9jb250ZXh0Iiwib3ZlcmZsb3ciLCJhbmltYXRlIiwibWF4SGVpZ2h0IiwiZmlsbCIsImR1cmF0aW9uIiwiZWFzaW5nIiwiZmluaXNoZWQiLCJvcGFjaXR5Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsInBhZGRpbmdUb3AiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImNoZWNrSW5wdXRzIiwiY3VycmVudEZvcm0iLCJzdWJtaXRCdG4iLCJmaWVsZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWxsRmlsbGVkIiwiZmllbGQiLCJyZXF1aXJlZCIsImNoZWNrZWQiLCJ0cmltIiwidHJlYXRGb3JtQWxlcnQiLCJmb3JtIiwic3VjY2Vzc0FsZXJ0IiwianNvbkRhdGEiLCJlcnJvcnNDb250YWluZXIiLCJzdGF0dXMiLCJzaG93U3VjY2Vzc0FsZXJ0IiwiY3JlYXRlRWxlbWVudCIsImluc2VydEFkamFjZW50RWxlbWVudCIsIm5ld0h0bWwiLCJlcnJvcnMiLCJlcnJvciIsImNvbmNhdCIsIm1lc3NhZ2UiLCJpbm5lckhUTUwiLCJhbGVydCIsImNsYXNzTmFtZSIsInJvbGUiLCJib2R5IiwicHJlcGVuZCIsInNldFRpbWVvdXQiLCJzaG93RXJyb3JzIiwiYWxlcnRzIiwic2hvd1BvcHVwIiwiZGl2VG9TaG93IiwiYmx1ckVmZmVjdCIsImhpZGVQb3B1cEJ0biIsImhpZGVQb3B1cCIsImRpdlRvSGlkZSIsImNoZWNrUGFzc3dvcmRWYWxpZGl0eSIsInBhc3N3b3JkSW5wdXRJZCIsImxlbmd0aENyaXRlcmlhIiwibG93ZXJjYXNlQ3JpdGVyaWEiLCJ1cHBlcmNhc2VDcml0ZXJpYSIsIm51bWJlckNyaXRlcmlhIiwic3BlY2lhbENyaXRlcmlhIiwicGFzc3dvcmRJbnB1dCIsInBhc3N3b3JkIiwidG9nZ2xlVmFsaWRpdHkiLCJpc1ZhbGlkIiwidGVzdCIsImNoZWNrUmVnaXN0ZXJGb3JtVmFsaWRpdHkiLCJjb25maXJtUGFzc3dvcmRJbnB1dCIsImVtYWlsSW5wdXQiLCJjZ3VJbnB1dCIsImN1cnJlbnRQYXNzd29yZElucHV0IiwiY29uZmlybSIsImlzUGFzc3dvcmRNYXRjaCIsInBhc3N3b3JkSW5wdXRWYWxpZGl0eSIsImNoaWxkcmVuIiwiY2d1Q2hlY2siLCJjdXJyZW50UGFzc3dvcmRDaGVjayIsImVtYWlsQ2hlY2siXSwic291cmNlUm9vdCI6IiJ9