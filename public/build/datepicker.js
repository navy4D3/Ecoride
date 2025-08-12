(self["webpackChunk"] = self["webpackChunk"] || []).push([["datepicker"],{

/***/ "./assets/js/datepicker.js":
/*!*********************************!*\
  !*** ./assets/js/datepicker.js ***!
  \*********************************/
/***/ (() => {

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var datepicker = document.querySelector(".datepicker");
var dateInput = document.querySelector(".date-input");
// const yearInput = datepicker.querySelector(".year-input");
var monthInput = datepicker.querySelector(".month-input");
var cancelBtn = datepicker.querySelector(".cancel");
var applyBtn = datepicker.querySelector(".apply");
var nextBtn = datepicker.querySelector(".next");
var prevBtn = datepicker.querySelector(".prev");
var dates = datepicker.querySelector(".dates");
var monthLabel = datepicker.querySelector(".month-input-label");
var selectedDate = new Date();
var year = selectedDate.getFullYear();
var month = selectedDate.getMonth();
monthLabel.innerText = monthInput.options[month].text;

// show datepicker
dateInput.addEventListener("click", function (e) {
  e.preventDefault();
  datepicker.hidden = false;
  // const offset = 100; // décalage en pixels (vers le bas)

  // // Obtenir la position absolue de l’élément
  // const elementPosition = dateInput.getBoundingClientRect().top + window.scrollY;

  // // Scroller avec un décalage
  // window.scrollTo({
  //     top: elementPosition - offset,
  //     behavior: 'smooth'
  // });

  // datepicker.scrollIntoView();
});

// hide datepicker
cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  datepicker.hidden = true;
});

// handle apply button click event
applyBtn.addEventListener("click", function (e) {
  // set the selected date to date input
  e.preventDefault();
  dateInput.value = selectedDate.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Déclencher un événement "input" manuellement
  var event = new Event("change", {
    bubbles: true
  });
  dateInput.dispatchEvent(event);

  // hide datepicker
  datepicker.hidden = true;
});

// handle next month nav
nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (month === 11) year++;
  month = (month + 1) % 12;
  displayDates();
});

// handle prev month nav
prevBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (month === 0) year--;
  month = (month - 1 + 12) % 12;
  displayDates();
});

// handle month input change event
monthInput.addEventListener("change", function (e) {
  e.preventDefault();
  month = monthInput.selectedIndex;
  displayDates();
});

// handle year input change event
// yearInput.addEventListener("change", (e) => {
//     e.preventDefault();
//   year = yearInput.value;
//   displayDates();
// });

var updateYearMonth = function updateYearMonth() {
  monthInput.selectedIndex = month;
  monthLabel.innerText = monthInput.options[month].text;

  // yearInput.value = year;
};
var handleDateClick = function handleDateClick(e) {
  e.preventDefault();
  var button = e.target;

  // remove the 'selected' class from other buttons
  var selected = dates.querySelector(".selected");
  selected && selected.classList.remove("selected");

  // add the 'selected' class to current button
  button.classList.add("selected");

  // set the selected date
  //   selectedDate = new Date(year, month, parseInt(button.textContent));
  selectedDate = new Date(year, month, parseInt(button.textContent));
};

// render the dates in the calendar interface
var displayDates = function displayDates() {
  // update year & month whenever the dates are updated
  updateYearMonth();

  // clear the dates
  dates.innerHTML = "";

  //* display the last week of previous month

  // get the last date of previous month
  var lastOfPrevMonth = new Date(year, month, 0);
  for (var i = 0; i <= lastOfPrevMonth.getDay(); i++) {
    var text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
    var button = createButton(text, true, -1);
    dates.appendChild(button);
  }

  //* display the current month

  // get the last date of the month
  var lastOfMOnth = new Date(year, month + 1, 0);
  for (var _i = 1; _i <= lastOfMOnth.getDate(); _i++) {
    var _button = createButton(_i, false);
    _button.addEventListener("click", handleDateClick);
    dates.appendChild(_button);
  }

  //* display the first week of next month

  var firstOfNextMonth = new Date(year, month + 1, 1);
  for (var _i2 = firstOfNextMonth.getDay(); _i2 < 7; _i2++) {
    var _text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + _i2;
    var _button2 = createButton(_text, true, 1);
    dates.appendChild(_button2);
  }
  var allBtns = datepicker.querySelector(".dates").querySelectorAll("button");
  var isAllBtnsDisabled = true;
  prevBtn.style.opacity = "0%";
  var _iterator = _createForOfIteratorHelper(allBtns),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var btn = _step.value;
      if (!btn.disabled) {
        isAllBtnsDisabled = false;
        prevBtn.style.opacity = "100%";
        return;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
var createButton = function createButton(text) {
  var isDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var currentDate = new Date();

  // determine the date to compare based on the button type
  var comparisonDate = new Date(year, month + type, text);

  // desactive bouton si date inferieur a ajourd'hui
  var currentDate00 = new Date(currentDate);
  var comparisonDate00 = new Date(comparisonDate);
  currentDate00.setHours(0, 0, 0, 0);
  comparisonDate00.setHours(0, 0, 0, 0);
  if (comparisonDate00.getTime() < currentDate00.getTime()) {
    isDisabled = true;
  }

  // check if the current button is the date today
  var isToday = currentDate.getDate() === text && currentDate.getFullYear() === year && currentDate.getMonth() === month;

  // check if the current button is selected
  var selected = selectedDate.getTime() === comparisonDate.getTime();
  var button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  button.classList.toggle("today", isToday && !isDisabled);
  button.classList.toggle("selected", selected);
  return button;
};
displayDates();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./assets/js/datepicker.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ3hELFFBQVEsQ0FBQyxDQUFDLEtBQUtELEtBQUs7O0VBRWxDO0VBQ0EsSUFBTXNCLFFBQVEsR0FBRzFCLFlBQVksQ0FBQ2tFLE9BQU8sQ0FBQyxDQUFDLEtBQUtKLGNBQWMsQ0FBQ0ksT0FBTyxDQUFDLENBQUM7RUFFcEUsSUFBTTFDLE1BQU0sR0FBR2xDLFFBQVEsQ0FBQzhFLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDL0M1QyxNQUFNLENBQUNPLFdBQVcsR0FBR3ZCLElBQUk7RUFDekJnQixNQUFNLENBQUM2QixRQUFRLEdBQUdHLFVBQVU7RUFDNUJoQyxNQUFNLENBQUNHLFNBQVMsQ0FBQzBDLE1BQU0sQ0FBQyxPQUFPLEVBQUVGLE9BQU8sSUFBSSxDQUFDWCxVQUFVLENBQUM7RUFDeERoQyxNQUFNLENBQUNHLFNBQVMsQ0FBQzBDLE1BQU0sQ0FBQyxVQUFVLEVBQUUzQyxRQUFRLENBQUM7RUFDN0MsT0FBT0YsTUFBTTtBQUNmLENBQUM7QUFFREosWUFBWSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGF0ZXBpY2tlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY29uc3QgZGF0ZXBpY2tlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZXBpY2tlclwiKTtcbmNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZS1pbnB1dFwiKTtcbi8vIGNvbnN0IHllYXJJbnB1dCA9IGRhdGVwaWNrZXIucXVlcnlTZWxlY3RvcihcIi55ZWFyLWlucHV0XCIpO1xuY29uc3QgbW9udGhJbnB1dCA9IGRhdGVwaWNrZXIucXVlcnlTZWxlY3RvcihcIi5tb250aC1pbnB1dFwiKTtcbmNvbnN0IGNhbmNlbEJ0biA9IGRhdGVwaWNrZXIucXVlcnlTZWxlY3RvcihcIi5jYW5jZWxcIik7XG5jb25zdCBhcHBseUJ0biA9IGRhdGVwaWNrZXIucXVlcnlTZWxlY3RvcihcIi5hcHBseVwiKTtcbmNvbnN0IG5leHRCdG4gPSBkYXRlcGlja2VyLnF1ZXJ5U2VsZWN0b3IoXCIubmV4dFwiKTtcbmNvbnN0IHByZXZCdG4gPSBkYXRlcGlja2VyLnF1ZXJ5U2VsZWN0b3IoXCIucHJldlwiKTtcbmNvbnN0IGRhdGVzID0gZGF0ZXBpY2tlci5xdWVyeVNlbGVjdG9yKFwiLmRhdGVzXCIpO1xubGV0IG1vbnRoTGFiZWwgPSBkYXRlcGlja2VyLnF1ZXJ5U2VsZWN0b3IoXCIubW9udGgtaW5wdXQtbGFiZWxcIik7XG5cbmxldCBzZWxlY3RlZERhdGUgPSBuZXcgRGF0ZSgpO1xubGV0IHllYXIgPSBzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKTtcbmxldCBtb250aCA9IHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpO1xuXG5tb250aExhYmVsLmlubmVyVGV4dCA9IG1vbnRoSW5wdXQub3B0aW9uc1ttb250aF0udGV4dDtcblxuXG4vLyBzaG93IGRhdGVwaWNrZXJcbmRhdGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGRhdGVwaWNrZXIuaGlkZGVuID0gZmFsc2U7XG4gIC8vIGNvbnN0IG9mZnNldCA9IDEwMDsgLy8gZMOpY2FsYWdlIGVuIHBpeGVscyAodmVycyBsZSBiYXMpXG5cbiAgLy8gLy8gT2J0ZW5pciBsYSBwb3NpdGlvbiBhYnNvbHVlIGRlIGzigJnDqWzDqW1lbnRcbiAgLy8gY29uc3QgZWxlbWVudFBvc2l0aW9uID0gZGF0ZUlucHV0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xuXG4gIC8vIC8vIFNjcm9sbGVyIGF2ZWMgdW4gZMOpY2FsYWdlXG4gIC8vIHdpbmRvdy5zY3JvbGxUbyh7XG4gIC8vICAgICB0b3A6IGVsZW1lbnRQb3NpdGlvbiAtIG9mZnNldCxcbiAgLy8gICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAvLyB9KTtcblxuICAvLyBkYXRlcGlja2VyLnNjcm9sbEludG9WaWV3KCk7XG5cbn0pO1xuXG4vLyBoaWRlIGRhdGVwaWNrZXJcbmNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgZGF0ZXBpY2tlci5oaWRkZW4gPSB0cnVlO1xufSk7XG5cbi8vIGhhbmRsZSBhcHBseSBidXR0b24gY2xpY2sgZXZlbnRcbmFwcGx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAvLyBzZXQgdGhlIHNlbGVjdGVkIGRhdGUgdG8gZGF0ZSBpbnB1dFxuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgZGF0ZUlucHV0LnZhbHVlID0gc2VsZWN0ZWREYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImZyLUZSXCIsIHtcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICBtb250aDogXCJsb25nXCIsXG4gICAgZGF5OiBcIm51bWVyaWNcIixcbiAgfSk7XG5cbiAgLy8gRMOpY2xlbmNoZXIgdW4gw6l2w6luZW1lbnQgXCJpbnB1dFwiIG1hbnVlbGxlbWVudFxuICBjb25zdCBldmVudCA9IG5ldyBFdmVudChcImNoYW5nZVwiLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG4gIGRhdGVJbnB1dC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuICBcbiAgLy8gaGlkZSBkYXRlcGlja2VyXG4gIGRhdGVwaWNrZXIuaGlkZGVuID0gdHJ1ZTtcbn0pO1xuXG4vLyBoYW5kbGUgbmV4dCBtb250aCBuYXZcbm5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAobW9udGggPT09IDExKSB5ZWFyKys7XG4gIG1vbnRoID0gKG1vbnRoICsgMSkgJSAxMjtcbiAgZGlzcGxheURhdGVzKCk7XG59KTtcblxuLy8gaGFuZGxlIHByZXYgbW9udGggbmF2XG5wcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgaWYgKG1vbnRoID09PSAwKSB5ZWFyLS07XG4gIG1vbnRoID0gKG1vbnRoIC0gMSArIDEyKSAlIDEyO1xuICBkaXNwbGF5RGF0ZXMoKTtcbn0pO1xuXG4vLyBoYW5kbGUgbW9udGggaW5wdXQgY2hhbmdlIGV2ZW50XG5tb250aElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIG1vbnRoID0gbW9udGhJbnB1dC5zZWxlY3RlZEluZGV4O1xuICBkaXNwbGF5RGF0ZXMoKTtcbn0pO1xuXG4vLyBoYW5kbGUgeWVhciBpbnB1dCBjaGFuZ2UgZXZlbnRcbi8vIHllYXJJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4vLyAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gICB5ZWFyID0geWVhcklucHV0LnZhbHVlO1xuLy8gICBkaXNwbGF5RGF0ZXMoKTtcbi8vIH0pO1xuXG5jb25zdCB1cGRhdGVZZWFyTW9udGggPSAoKSA9PiB7XG4gIG1vbnRoSW5wdXQuc2VsZWN0ZWRJbmRleCA9IG1vbnRoO1xuICBtb250aExhYmVsLmlubmVyVGV4dCA9IG1vbnRoSW5wdXQub3B0aW9uc1ttb250aF0udGV4dDtcblxuXG4gIC8vIHllYXJJbnB1dC52YWx1ZSA9IHllYXI7XG59O1xuXG5jb25zdCBoYW5kbGVEYXRlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgYnV0dG9uID0gZS50YXJnZXQ7XG5cbiAgLy8gcmVtb3ZlIHRoZSAnc2VsZWN0ZWQnIGNsYXNzIGZyb20gb3RoZXIgYnV0dG9uc1xuICBjb25zdCBzZWxlY3RlZCA9IGRhdGVzLnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIik7XG4gIHNlbGVjdGVkICYmIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcblxuICAvLyBhZGQgdGhlICdzZWxlY3RlZCcgY2xhc3MgdG8gY3VycmVudCBidXR0b25cbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcblxuICAvLyBzZXQgdGhlIHNlbGVjdGVkIGRhdGVcbi8vICAgc2VsZWN0ZWREYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIHBhcnNlSW50KGJ1dHRvbi50ZXh0Q29udGVudCkpO1xuICBzZWxlY3RlZERhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgcGFyc2VJbnQoYnV0dG9uLnRleHRDb250ZW50KSk7XG59O1xuXG4vLyByZW5kZXIgdGhlIGRhdGVzIGluIHRoZSBjYWxlbmRhciBpbnRlcmZhY2VcbmNvbnN0IGRpc3BsYXlEYXRlcyA9ICgpID0+IHtcbiAgLy8gdXBkYXRlIHllYXIgJiBtb250aCB3aGVuZXZlciB0aGUgZGF0ZXMgYXJlIHVwZGF0ZWRcbiAgdXBkYXRlWWVhck1vbnRoKCk7XG5cbiAgLy8gY2xlYXIgdGhlIGRhdGVzXG4gIGRhdGVzLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgLy8qIGRpc3BsYXkgdGhlIGxhc3Qgd2VlayBvZiBwcmV2aW91cyBtb250aFxuXG4gIC8vIGdldCB0aGUgbGFzdCBkYXRlIG9mIHByZXZpb3VzIG1vbnRoXG4gIGNvbnN0IGxhc3RPZlByZXZNb250aCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBsYXN0T2ZQcmV2TW9udGguZ2V0RGF5KCk7IGkrKykge1xuICAgIGNvbnN0IHRleHQgPSBsYXN0T2ZQcmV2TW9udGguZ2V0RGF0ZSgpIC0gbGFzdE9mUHJldk1vbnRoLmdldERheSgpICsgaTtcbiAgICBjb25zdCBidXR0b24gPSBjcmVhdGVCdXR0b24odGV4dCwgdHJ1ZSwgLTEpO1xuICAgIGRhdGVzLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH1cblxuICAvLyogZGlzcGxheSB0aGUgY3VycmVudCBtb250aFxuXG4gIC8vIGdldCB0aGUgbGFzdCBkYXRlIG9mIHRoZSBtb250aFxuICBjb25zdCBsYXN0T2ZNT250aCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCk7XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGFzdE9mTU9udGguZ2V0RGF0ZSgpOyBpKyspIHtcbiAgICBjb25zdCBidXR0b24gPSBjcmVhdGVCdXR0b24oaSwgZmFsc2UpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlRGF0ZUNsaWNrKTtcbiAgICBkYXRlcy5hcHBlbmRDaGlsZChidXR0b24pO1xuICB9XG5cbiAgLy8qIGRpc3BsYXkgdGhlIGZpcnN0IHdlZWsgb2YgbmV4dCBtb250aFxuXG4gIGNvbnN0IGZpcnN0T2ZOZXh0TW9udGggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIDEpO1xuXG4gIGZvciAobGV0IGkgPSBmaXJzdE9mTmV4dE1vbnRoLmdldERheSgpOyBpIDwgNzsgaSsrKSB7XG4gICAgY29uc3QgdGV4dCA9IGZpcnN0T2ZOZXh0TW9udGguZ2V0RGF0ZSgpIC0gZmlyc3RPZk5leHRNb250aC5nZXREYXkoKSArIGk7XG5cbiAgICBjb25zdCBidXR0b24gPSBjcmVhdGVCdXR0b24odGV4dCwgdHJ1ZSwgMSk7XG4gICAgZGF0ZXMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuICBjb25zdCBhbGxCdG5zID0gZGF0ZXBpY2tlci5xdWVyeVNlbGVjdG9yKFwiLmRhdGVzXCIpLnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIik7XG4gIGxldCBpc0FsbEJ0bnNEaXNhYmxlZCA9IHRydWU7XG4gIHByZXZCdG4uc3R5bGUub3BhY2l0eSA9IFwiMCVcIjtcblxuICBmb3IgKGNvbnN0IGJ0biBvZiBhbGxCdG5zKSB7XG4gICAgaWYgKCFidG4uZGlzYWJsZWQpIHtcbiAgICAgIGlzQWxsQnRuc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgICBwcmV2QnRuLnN0eWxlLm9wYWNpdHkgPSBcIjEwMCVcIjtcbiAgICAgIHJldHVybjtcbiAgICB9IFxuICB9XG5cbiAgXG59O1xuXG5jb25zdCBjcmVhdGVCdXR0b24gPSAodGV4dCwgaXNEaXNhYmxlZCA9IGZhbHNlLCB0eXBlID0gMCkgPT4ge1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgLy8gZGV0ZXJtaW5lIHRoZSBkYXRlIHRvIGNvbXBhcmUgYmFzZWQgb24gdGhlIGJ1dHRvbiB0eXBlXG4gIGxldCBjb21wYXJpc29uRGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgdHlwZSwgdGV4dCk7XG5cbiAgLy8gZGVzYWN0aXZlIGJvdXRvbiBzaSBkYXRlIGluZmVyaWV1ciBhIGFqb3VyZCdodWlcbiAgY29uc3QgY3VycmVudERhdGUwMCA9IG5ldyBEYXRlKGN1cnJlbnREYXRlKTtcbiAgY29uc3QgY29tcGFyaXNvbkRhdGUwMCA9IG5ldyBEYXRlKGNvbXBhcmlzb25EYXRlKTtcblxuICBjdXJyZW50RGF0ZTAwLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBjb21wYXJpc29uRGF0ZTAwLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBpZiAoY29tcGFyaXNvbkRhdGUwMC5nZXRUaW1lKCkgPCBjdXJyZW50RGF0ZTAwLmdldFRpbWUoKSkge1xuICAgIGlzRGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gY2hlY2sgaWYgdGhlIGN1cnJlbnQgYnV0dG9uIGlzIHRoZSBkYXRlIHRvZGF5XG4gIGNvbnN0IGlzVG9kYXkgPVxuICAgIGN1cnJlbnREYXRlLmdldERhdGUoKSA9PT0gdGV4dCAmJlxuICAgIGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIgJiZcbiAgICBjdXJyZW50RGF0ZS5nZXRNb250aCgpID09PSBtb250aDtcblxuICAvLyBjaGVjayBpZiB0aGUgY3VycmVudCBidXR0b24gaXMgc2VsZWN0ZWRcbiAgY29uc3Qgc2VsZWN0ZWQgPSBzZWxlY3RlZERhdGUuZ2V0VGltZSgpID09PSBjb21wYXJpc29uRGF0ZS5nZXRUaW1lKCk7XG5cbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgYnV0dG9uLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJ0b2RheVwiLCBpc1RvZGF5ICYmICFpc0Rpc2FibGVkKTtcbiAgYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3RlZFwiLCBzZWxlY3RlZCk7XG4gIHJldHVybiBidXR0b247XG59O1xuXG5kaXNwbGF5RGF0ZXMoKTsiXSwibmFtZXMiOlsiZGF0ZXBpY2tlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRhdGVJbnB1dCIsIm1vbnRoSW5wdXQiLCJjYW5jZWxCdG4iLCJhcHBseUJ0biIsIm5leHRCdG4iLCJwcmV2QnRuIiwiZGF0ZXMiLCJtb250aExhYmVsIiwic2VsZWN0ZWREYXRlIiwiRGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJpbm5lclRleHQiLCJvcHRpb25zIiwidGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJoaWRkZW4iLCJ2YWx1ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsImRheSIsImV2ZW50IiwiRXZlbnQiLCJidWJibGVzIiwiZGlzcGF0Y2hFdmVudCIsImRpc3BsYXlEYXRlcyIsInNlbGVjdGVkSW5kZXgiLCJ1cGRhdGVZZWFyTW9udGgiLCJoYW5kbGVEYXRlQ2xpY2siLCJidXR0b24iLCJ0YXJnZXQiLCJzZWxlY3RlZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInBhcnNlSW50IiwidGV4dENvbnRlbnQiLCJpbm5lckhUTUwiLCJsYXN0T2ZQcmV2TW9udGgiLCJpIiwiZ2V0RGF5IiwiZ2V0RGF0ZSIsImNyZWF0ZUJ1dHRvbiIsImFwcGVuZENoaWxkIiwibGFzdE9mTU9udGgiLCJmaXJzdE9mTmV4dE1vbnRoIiwiYWxsQnRucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpc0FsbEJ0bnNEaXNhYmxlZCIsInN0eWxlIiwib3BhY2l0eSIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJidG4iLCJkaXNhYmxlZCIsImVyciIsImYiLCJpc0Rpc2FibGVkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwidHlwZSIsImN1cnJlbnREYXRlIiwiY29tcGFyaXNvbkRhdGUiLCJjdXJyZW50RGF0ZTAwIiwiY29tcGFyaXNvbkRhdGUwMCIsInNldEhvdXJzIiwiZ2V0VGltZSIsImlzVG9kYXkiLCJjcmVhdGVFbGVtZW50IiwidG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==