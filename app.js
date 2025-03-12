import { aktiviteterPage } from './aktiviteterPage.js';

window.showPage = function (page) {
    const contentDiv = document.getElementById('content');

    if (page === 'forside') {
        contentDiv.innerHTML = `
            <h1>Velkommen til AdventureXP's interne system</h1>
            <main>
                <div class="container">
                    <div class="card">
                        <h2>Booking</h2>
                        <a href="#" onclick="showPage('opretBooking')">Opret booking</a>
                        <a href="#" onclick="showPage('seBooking')">Se/rediger/slet booking</a>
                    </div>
                    <div class="card">
                        <h2>Admin</h2>
                        <a href="#" onclick="showPage('vagtplan')">Vagtplan</a>
                        <a href="#" onclick="showPage('aktiviteter')">Aktiviteter</a>
                        <a href="#" onclick="showPage('butik')">Butik</a>
                    </div>
                </div>
            </main>
        `;
    } else if (page === 'aktiviteter') {
        contentDiv.innerHTML = aktiviteterPage();
        //fetchActivities(); // Hent aktiviteter fra backend
    } else if (page === 'booking') {
        contentDiv.innerHTML = `<h1>Booking</h1><p>Her kan du booke din aktivitet.</p>`;
    } else if (page === 'vagtplan') {
        contentDiv.innerHTML = `<h1>Vagtplan</h1><p>Her er vagtplanen.</p>`;
    }
};

// Gem en ny aktivitet
async function saveActivity() {
    const activity = {
        title: document.getElementById('title').value,
        age_Requirement: parseInt(document.getElementById('age_Requirement').value),
        height_Requirement: parseInt(document.getElementById('height_Requirement').value),
        equipment: document.getElementById('equipment').value,
        hourly_price: parseInt(document.getElementById('hourly_price').value)
    };

    try {
        const response = await fetch('https://adventurexp-g5freqhuangfa9ab.northeurope-01.azurewebsites.net/activities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activity)
        });

        if (response.ok) {
            alert('Aktivitet oprettet succesfuldt!');
            fetchActivities(); // Opdater tabellen
        } else {
            alert('Fejl under oprettelse af aktivitet.');
        }
    } catch (error) {
        console.error('Fejl:', error);
    }
}

// Håndter tilbage-knap i browseren
window.onpopstate = function (event) {
    if (event.state && event.state.page) {
        showPage(event.state.page);
    }
};

// Start med at vise forsiden, når siden indlæses
window.onload = function () {
    showPage('forside');
};
