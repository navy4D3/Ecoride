import { checkInputs, hidePopup, showPopup, treatFormAlert } from "../app";

const prochainTrajeTChart = document.getElementById('prochains-trajet-chart');


if (prochainTrajeTChart) {
    const ctx = document.getElementById('prochains-trajet-chart').getContext('2d');
    const ctx2 = document.getElementById('credits-a-venir-chart').getContext('2d');
    let rideChart;
    let credistChart;

    function fetchData(days) {
        fetch(`/admin/stats?days=${days}`)
        .then(response => response.json())
        .then(data => {
            const labels = data.trajetsAVenir.map(d => d.date);
            const counts = data.trajetsAVenir.map(d => d.count);
    
            const labelsCredits = data.creditsAVenir.map(d => d.date);
            const countsCredits = data.creditsAVenir.map(d => d.count);
            const greenBlackColor =  '#386150';
            const greenMediumColor =  '#EAFFF3';
            const blueBtnColor =  '#37abc7';
            const greenBtnColor =  '#58fea0';
    
            if (rideChart) {
                rideChart.data.labels = labels;
                rideChart.data.datasets[0].data = counts;
                rideChart.update();
    
                creditsChart.data.labels = labelsCredits;
                creditsChart.data.datasets[0].data = countsCredits;
                creditsChart.update();
            
            } else {
                const chartOptions = {
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: greenBlackColor, // ✅ Couleur du label dans la légende
                                font: {
                                    family: 'Josefin sans',
                                    size: 18,
                                },
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: greenBlackColor,           // Couleur du texte
                                font: {
                                    family: 'Nunito',          // Police (ou Google Fonts, ex: 'Poppins')
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            grid: {
                                drawOnChartArea: true, // 👈 n'affiche pas les lignes verticales internes
                                drawTicks: true,
                                color: greenBlackColor,     // Couleur de l’axe X
                                borderColor : greenBlackColor,
    
                                tickWidth: 1,
                                lineWidth: (ctx) => {
                                // Ne dessiner que le premier trait
                                return ctx.index === 0 ? 1 : 0;
                                }          // Épaisseur du trait X
                            }
                            },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1, // 👈 Forcer un pas de 1
                                callback: function(value) {
                                    if (Number.isInteger(value)) {
                                    return value;
                                    }
                                },
                                color: greenBlackColor,           // Couleur du texte
                                font: {
                                    family: 'Nunito',          // Police (ou Google Fonts, ex: 'Poppins')
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            grid: {
                                drawOnChartArea: true, // 👈 n'affiche pas les lignes verticales internes
                                drawBorder: false,        // 👈 garde l’axe Y
                                drawTicks: true,
                                display: true,
                                color: greenBlackColor,     // Couleur de l’axe X
                                tickWidth: 1,
                                lineWidth: (ctx) => {
                                    // Ne dessiner que le premier trait
                                    return ctx.index === 0 ? 1 : 0;
                                    }
                                
                                }
                        }
                    }
                }
                rideChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Nombre de trajet',
                            data: counts,
                            // backgroundColor: blueBtnColor,
                            // borderColor: 'transparent',
                            backgroundColor: greenBtnColor,
                            borderColor: 'transparent',
                            borderWidth: 2,
                            borderRadius: 6,
                        }]
                    },
                    options: chartOptions
                });
    
                creditsChart = new Chart(ctx2, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: countsCredits,
                            label: 'Nombre de credits',
                            backgroundColor: blueBtnColor,
                            borderColor: 'transparent',
                            borderWidth: 2,
                            borderRadius: 6,
                        }]
                    },
                    options: chartOptions
                });
            }
        });
    
    
    }
    
    document.getElementById('period-select').addEventListener('change', (e) => {
        fetchData(e.target.value);
    });
    
    // Initial load
    fetchData(7);
    
    function adjustCanvasHeight() {
        const isSmallScreen = window.innerWidth < 512;
        
        const canvases = [
            document.getElementById('prochains-trajet-chart'),
            document.getElementById('credits-a-venir-chart')
        ];
    
        canvases.forEach(canvas => {
            if (canvas) {
                canvas.height = isSmallScreen ? 300 : 300; // 📏 ajuste comme tu veux
            }
        });
    }
    
    // Exécuter au chargement
    adjustCanvasHeight();
    
    // Exécuter au redimensionnement
    window.addEventListener('resize', adjustCanvasHeight);
}


const searchInput = document.getElementById('search-input');

// Recherche en direct
if (searchInput) {
    const searchBtn = document.getElementById('search-btn');
    const form = document.getElementById('search-form');
    const usersTable = document.getElementById('users-table');
    searchInput.addEventListener('input', () => {
        const query = new URLSearchParams(new FormData(form)).toString();
        fetch("/admin/users-list?" + query, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(res => res.text())
        .then(html => {
            usersTable.innerHTML = html;
        });
    });
    
    // Pagination AJAX
    usersTable.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.closest('.pagination')) {
            e.preventDefault();
            fetch(e.target.href, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(res => res.text())
            .then(html => {
                usersTable.innerHTML = html;
            });
        }
    });
    
    usersTable.addEventListener('click', (e) => {
        const row = e.target.closest('.clickable-row');
        if (row && row.dataset.href) {
            window.location.href = row.dataset.href;
        }
    });
}


const adminEditUserForm = document.getElementById('admin-edit-user-form');

if (adminEditUserForm) {
    const inputs = adminEditUserForm.querySelectorAll('input, select, textarea');
    const editBtn = document.getElementById('admin-edit-user-btn');

    inputs.forEach((input) => {
        input.addEventListener('input', function() {
            editBtn.classList.remove('inactive');
        })
    })

    editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const formData = new FormData(adminEditUserForm);

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');


        fetch('/admin/user?id=' + id , {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            // data.html contient ton formulaire rendu
    
            treatFormAlert(adminEditUserForm, 'Informations mises à jour avec succès', data);

            if (data.status !== "success") {
                adminEditUserForm.reset();
            }
            // const event = new Event('input', {
            //     bubbles: true,
            // });
              
            // passwordInput.dispatchEvent(event);
    
        })
        .catch(error => console.error('Erreur:', error));

    })

    const resetProfilPictureBtn = document.getElementById('reset-user-photo-profil-btn');
    

    if (resetProfilPictureBtn) {
        const profilPictureImg = document.getElementById('profil-picture-img');


        resetProfilPictureBtn.addEventListener('click', function(e) {
            profilPictureImg.src = '/default-profil-picture.png';

            e.preventDefault();
            const formData = new FormData(adminEditUserForm);
    
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
    
    
            fetch('/user/reset-photo-profil?id=' + id , {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest' // important pour indiquer une requête AJAX
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                // data.html contient ton formulaire rendu
        
                treatFormAlert(adminEditUserForm, 'Photo de profil réinitialisé.', data);
    
                if (data.status !== "success") {
                    adminEditUserForm.reset();
                    profilPictureImg.src = '/default-profil-picture.png'

                }
    
                resetProfilPictureBtn.remove();
                // const event = new Event('input', {
                //     bubbles: true,
                // });
                  
                // passwordInput.dispatchEvent(event);
        
            })
            .catch(error => console.error('Erreur:', error));
        })

        
    }

    const deleteUserBtn = document.getElementById('delete-user-btn');
        const deleteUserPopup = document.getElementById('delete-user-popup');

        deleteUserBtn.addEventListener('click', function(e) {
            showPopup(deleteUserPopup, 'flex');
        })

        const hideDeleteUserPopupBtn = deleteUserPopup.querySelector('.back');

        hideDeleteUserPopupBtn.addEventListener('click', function() {
            hidePopup(deleteUserPopup);
        })

}

const adminAddEmployeForm = document.getElementById('admin-add-employe-form');

if (adminAddEmployeForm) {
    const adminAddEmployeFormInputs = adminAddEmployeForm.querySelectorAll('input');

    adminAddEmployeFormInputs.forEach((input) => {
        input.addEventListener('input', function() {
            checkInputs(adminAddEmployeForm);
        })
    })
    
}

