import { aktiviteterPage } from './aktiviteterPage.js';

window.showPage = function(page) {
    const contentDiv = document.getElementById('content');

    if (page === 'forside') {
        contentDiv.innerHTML = `
            <h1>Velkommen til AdventureXP's interne system</h1>
            <h2>Vælg et punkt i menuen ovenfor</h2>
        `;
    } else if (page === 'aktiviteter') {
        contentDiv.innerHTML = aktiviteterPage();
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
            const response = await fetch('http://localhost:8080/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activity)
            });

            if (response.ok) {
                alert('Aktivitet oprettet succesfuldt!');
                document.getElementById('activityForm').reset();
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