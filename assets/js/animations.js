const expandAnimation = [
    { display: "none"},
    { display: "flex"},
]

const expandTiming = [
    {duration: 1000},
    {iterations: 1}
]

//  navbarBtns.animate(
//     {
//         display: ["none", "flex"],
//         // opacity: [0, 1],
//         height: [0, "200px"],
//         // transform: ["scaleY(0)", "scaleX(1)"],
//     },
//     {
//         fill: "both",
//         duration: 1000,
//         // timeline,
//         // rangeStart: "cover 0%",
//         // rangeEnd: "cover 100%",
//     },
// );

function fadeIn(element) {
    element.classList.add('fade');
    element.style.display = "flex";

    // Reflow nécessaire pour que transition démarre
    requestAnimationFrame(() => {
        element.classList.add('show');
    });
}

function fadeOut(element) {
    element.classList.remove('show');
    element.addEventListener('transitionend', function handleTransitionEnd() {
        element.style.display = "none";
        element.removeEventListener('transitionend', handleTransitionEnd);
    });
}

function showFadeSlide(el) {
    el.classList.add('fade-slide');
    el.style.display = "flex";
    requestAnimationFrame(() => el.classList.add('show'));
}

function hideFadeSlide(el) {
    el.classList.remove('show');
    el.addEventListener('transitionend', function cb() {
        el.style.display = "none";
        el.removeEventListener('transitionend', cb);
    });
}

function expand(el) {
    el.classList.add('slide-down');
    requestAnimationFrame(() => el.classList.add('open'));
    // el.addEventListener('transitionend', function cb() {
    //     // el.style.display = "none";
    //     el.removeEventListener('transitionend', cb);
    // });
}