// JS vanilla


document.addEventListener('DOMContentLoaded', () => {
    const minusBtn = document.getElementById('minus-icon');
    const plusBtn = document.getElementById('plus-icon');
    const placeDisplay = document.getElementById('place-count');
    const placeInput = document.getElementById('search_trajet_nbPlace');

    

    let count = 1;
    placeInput.value = count;

    function updateDisplay() {
        
        let endText = " passagers";

        if (count == 1) {
            endText = " passager";
            minusBtn.style.display = "none";
        } else if (count == 2) {
            minusBtn.style.display = "flex";
        } else if (count == 7) {
            plusBtn.parentNode.style.display = "flex";
        }  else if (count == 8) {
            plusBtn.parentNode.style.display = "none";
        } 

        placeDisplay.innerHTML = count.toString() + endText;
        placeDisplay.innerHTML = count.toString() + endText;
        // placeDisplay.innerHTML = count;
        placeInput.value = count;

    }

    plusBtn.addEventListener('click', () => {
            count++;
            updateDisplay();
    });

    minusBtn.addEventListener('click', () => {
            count--;
            updateDisplay();
    });

});
