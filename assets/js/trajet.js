import { hidePopup, showPopup } from "../app";


const deleteTrajetBtn = document.getElementById('delete-trajet-btn');

if (deleteTrajetBtn) {
    const deleteTrajetPopup = document.getElementById('delete-trajet-popup');
    deleteTrajetBtn.addEventListener('click', function() {
        

        showPopup(deleteTrajetPopup, 'flex');

    })

    const hideDeleteTrajetPopup = document.getElementById('hide-delete-trajet-popup-btn');

    hideDeleteTrajetPopup.addEventListener('click', () => hidePopup(deleteTrajetPopup))


}

const cancelReservationBtn = document.getElementById('cancel-reservation-btn');

if (cancelReservationBtn) {
    const cancelReservationPopup = document.getElementById('cancel-reservation-popup');

    cancelReservationBtn.addEventListener('click', function() {
        

        showPopup(cancelReservationPopup, 'flex');

    })

    const hideCancelReservationPopup = document.getElementById('hide-cancel-reservation-popup-btn');

    hideCancelReservationPopup.addEventListener('click', () => hidePopup(cancelReservationPopup));
}

