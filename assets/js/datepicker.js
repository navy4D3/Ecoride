

const datepicker = document.querySelector(".datepicker");
const dateInput = document.querySelector(".date-input");
// const yearInput = datepicker.querySelector(".year-input");
const monthInput = datepicker.querySelector(".month-input");
const cancelBtn = datepicker.querySelector(".cancel");
const applyBtn = datepicker.querySelector(".apply");
const nextBtn = datepicker.querySelector(".next");
const prevBtn = datepicker.querySelector(".prev");
const dates = datepicker.querySelector(".dates");
let monthLabel = datepicker.querySelector(".month-input-label");

let selectedDate = new Date();
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();

monthLabel.innerText = monthInput.options[month].text;


// show datepicker
dateInput.addEventListener("click", (e) => {
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
cancelBtn.addEventListener("click", (e) => {
   e.preventDefault();
  datepicker.hidden = true;
});

// handle apply button click event
applyBtn.addEventListener("click", (e) => {
  // set the selected date to date input
  e.preventDefault();

  dateInput.value = selectedDate.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Déclencher un événement "input" manuellement
  const event = new Event("change", { bubbles: true });
  dateInput.dispatchEvent(event);

  
  // hide datepicker
  datepicker.hidden = true;
});

// handle next month nav
nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
  if (month === 11) year++;
  month = (month + 1) % 12;
  displayDates();
});

// handle prev month nav
prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
  if (month === 0) year--;
  month = (month - 1 + 12) % 12;
  displayDates();
});

// handle month input change event
monthInput.addEventListener("change", (e) => {
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

const updateYearMonth = () => {
  monthInput.selectedIndex = month;
  monthLabel.innerText = monthInput.options[month].text;


  // yearInput.value = year;
};

const handleDateClick = (e) => {
    e.preventDefault();
  const button = e.target;

  // remove the 'selected' class from other buttons
  const selected = dates.querySelector(".selected");
  selected && selected.classList.remove("selected");

  // add the 'selected' class to current button
  button.classList.add("selected");

  // set the selected date
//   selectedDate = new Date(year, month, parseInt(button.textContent));
  selectedDate = new Date(year, month, parseInt(button.textContent));
};

// render the dates in the calendar interface
const displayDates = () => {
  // update year & month whenever the dates are updated
  updateYearMonth();

  // clear the dates
  dates.innerHTML = "";

  //* display the last week of previous month

  // get the last date of previous month
  const lastOfPrevMonth = new Date(year, month, 0);

  for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
    const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
    const button = createButton(text, true, -1);
    dates.appendChild(button);
  }

  //* display the current month

  // get the last date of the month
  const lastOfMOnth = new Date(year, month + 1, 0);

  for (let i = 1; i <= lastOfMOnth.getDate(); i++) {
    const button = createButton(i, false);
    button.addEventListener("click", handleDateClick);
    dates.appendChild(button);
  }

  //* display the first week of next month

  const firstOfNextMonth = new Date(year, month + 1, 1);

  for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
    const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;

    const button = createButton(text, true, 1);
    dates.appendChild(button);
  }
  const allBtns = datepicker.querySelector(".dates").querySelectorAll("button");
  let isAllBtnsDisabled = true;
  prevBtn.style.opacity = "0%";

  for (const btn of allBtns) {
    if (!btn.disabled) {
      isAllBtnsDisabled = false;
      prevBtn.style.opacity = "100%";
      return;
    } 
  }

  
};

const createButton = (text, isDisabled = false, type = 0) => {
  const currentDate = new Date();

  // determine the date to compare based on the button type
  let comparisonDate = new Date(year, month + type, text);

  // desactive bouton si date inferieur a ajourd'hui
  const currentDate00 = new Date(currentDate);
  const comparisonDate00 = new Date(comparisonDate);

  currentDate00.setHours(0, 0, 0, 0);
  comparisonDate00.setHours(0, 0, 0, 0);
  if (comparisonDate00.getTime() < currentDate00.getTime()) {
    isDisabled = true;
  }

  // check if the current button is the date today
  const isToday =
    currentDate.getDate() === text &&
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month;

  // check if the current button is selected
  const selected = selectedDate.getTime() === comparisonDate.getTime();

  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  button.classList.toggle("today", isToday && !isDisabled);
  button.classList.toggle("selected", selected);
  return button;
};

displayDates();