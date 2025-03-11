import { aktiviteterPage } from './aktiviteterPage.js';

window.showPage = function(page) {
    const contentDiv = document.getElementById('content');

    if (page === 'forside') {
        contentDiv.innerHTML = `
            <h1>Velkommen til AdventureXP's interne system</h1>
            <main>
                <div class="container">
                    <!-- Booking Kasse -->
                    <div class="card">
                        <h2>Booking</h2>
                        <a href="#" onclick="showPage('opretBooking')">Opret booking</a>
                        <a href="#" onclick="showPage('seBooking')">Se/rediger/slet booking</a>
                    </div>
            
                    <!-- Admin Kasse -->
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
        fetchActivities(); // Henter og viser aktiviteter i tabellen
        saveActivity();

    } else if (page === 'booking') {
        contentDiv.innerHTML = `
            <h1>Booking</h1>
            <p>Her kan du booke din aktivitet.</p>
        `;
    }else if (page === 'vagtplan') {
        contentDiv.innerHTML = `
            <h1>Vagtplan</h1>
            <p>Her er vagtplanen.</p>
        `;
    }
}

async function fetchActivities() {
    try {
        const response = await fetch('https://adventurexp-g5freqhuangfa9ab.northeurope-01.azurewebsites.net/activities');
        const activities = await response.json();

        const tableBody = document.getElementById('activitiesTableBody');
        tableBody.innerHTML = ''; // Ryd tabellen før vi tilføjer nye data

        activities.forEach(activity => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${activity.title}</td>
                <td>${activity.age_Requirement}</td>
                <td>${activity.height_Requirement}</td>
                <td>${activity.equipment}</td>
                <td>${activity.hourly_price} DKK</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Fejl ved hentning af aktiviteter:', error);
    }
}


// Her er JS-kode som kører når man trykker submit-knap i ovenståene HTML-->
// const activity opretter et JS-objekt med de indtastede værdier -->
// adressen http://localhost:8080/activities er den request som sendes til backend -->
// Så når man submitter, sendes data til den backend controller som tager imod request med /activities -->
// async gør funktionen asynkron så man kan bruge "await" inde i den -->
// preventDefault forhindrer hjemmesiden i at opdatere når man submitter -->
// await pauser udførelsen af koden, indtil fetch-anmodningen er færdig, så response laves først når vi har svar -->

function saveActivity(){
    document.getElementById('activityForm').addEventListener('submit', async (e) => {
        e.preventDefault();

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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activity)
            });

            if (response.ok) {
                alert('Aktivitet oprettet succesfuldt!');
                document.getElementById('activityForm').reset();
                fetchActivities(); // Opdater tabellen efter tilføjelse
            } else {
                alert('Fejl under oprettelse af aktivitet.');
            }
        } catch (error) {
            console.error('Fejl:', error);
        }
    });
}
// Håndter tilbage-knap i browseren
window.onpopstate = function(event) {
    if (event.state && event.state.page) {
        showPage(event.state.page);
    }
}

// Start med at vise forsiden, når siden indlæses
window.onload = function() {
    showPage('forside');
};