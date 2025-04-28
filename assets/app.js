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

if (navbarMenuIcon) {
    navbarMenuIcon.addEventListener('click', function() {
        navbarBtns.style.display = "flex";
        navbarCloseMobileMenuBtn.style.display = "block";
    })
}


if (navbarCloseMobileMenuBtn) {
    navbarCloseMobileMenuBtn.addEventListener('click', function() {
        navbarBtns.style.display ="none";
    })
}




