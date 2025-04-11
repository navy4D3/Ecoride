import './bootstrap';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';

const navbarMenuIcon = document.getElementById('navbar-menu-icon');
const navbarBtns = document.getElementById('navbar-btns');
const navbarCloseMobileMenuBtn = document.getElementById('navbar-close-mobile-menu');

navbarMenuIcon.addEventListener('click', function() {
    navbarBtns.style.display = "flex";
    navbarCloseMobileMenuBtn.style.display = "block";
})

navbarCloseMobileMenuBtn.addEventListener('click', function() {
    navbarBtns.style.display ="none";
})


const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
    input.addEventListener('focus', () => {
       
       input.parentNode.classList.add('selected');

    })
    input.addEventListener('blur', () => {
       
       input.parentNode.classList.remove('selected');

    })
})
