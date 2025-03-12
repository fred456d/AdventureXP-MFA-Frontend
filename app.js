import { aktiviteterPage } from './aktiviteterPage.js';
import { butikPage } from "./butikPage.js";

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
        fetchActivities(); // Hent aktiviteter fra backend
    } else if (page === 'booking') {
        contentDiv.innerHTML = `<h1>Booking</h1><p>Her kan du booke din aktivitet.</p>`;
    } else if (page === 'vagtplan') {
        contentDiv.innerHTML = `<h1>Vagtplan</h1><p>Her er vagtplanen.</p>`;
    } else if (page === 'butik') {
        contentDiv.innerHTML = butikPage();
        fetchSalesItems();
    }
};

// Hent og vis aktiviteter i tabellen
async function fetchActivities() {
    try {
        const response = await fetch('https://adventurexp-g5freqhuangfa9ab.northeurope-01.azurewebsites.net/activities');
        const activities = await response.json();

        const tableBody = document.getElementById('activitiesTableBody');
        tableBody.innerHTML = ''; // Ryd tabellen før nye data

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

        // Tilføj række med inputfelter til tabellen
        addInputRow();
    } catch (error) {
        console.error('Fejl ved hentning af aktiviteter:', error);
    }
}

// Hent og vis aktiviteter i tabellen
async function fetchSalesItems() {
    try {
        const response = await fetch('https://adventurexp-g5freqhuangfa9ab.northeurope-01.azurewebsites.net/salesitems');
        const salesItems = await response.json();

        const tableBody = document.getElementById('salesItemTableBody');
        tableBody.innerHTML = ''; // Ryd tabellen før nye data

        salesItems.forEach(salesItem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${salesItem.type}</td>
                <td>${salesItem.price}</td>
            `;
            tableBody.appendChild(row);
        });

        // Tilføj række med inputfelter til tabellen
        addSalesItemInputRow();
    } catch (error) {
        console.error('Fejl ved hentning af produkter:', error);
    }
}

// Tilføj inputfelter til tabellen
function addSalesItemInputRow() {
    const tableBody = document.getElementById('salesItemTableBody');

    const inputRow = document.createElement('tr');
    inputRow.innerHTML = `
        <td><input type="text" id="type" placeholder="Type"></td>
        <td><input type="number" id="price" placeholder="Pris"></td>
        <td><button id="saveSalesItemButton">Gem Produkt</button></td>
    `;

    tableBody.appendChild(inputRow);

    // Tilføj event listener til knappen
    document.getElementById('saveSalesItemButton').addEventListener('click', saveSalesItem);
}

// Tilføj inputfelter til tabellen
function addInputRow() {
    const tableBody = document.getElementById('activitiesTableBody');

    const inputRow = document.createElement('tr');
    inputRow.innerHTML = `
        <td><input type="text" id="title" placeholder="Titel"></td>
        <td><input type="number" id="age_Requirement" placeholder="Alder"></td>
        <td><input type="number" id="height_Requirement" placeholder="Højde"></td>
        <td><input type="text" id="equipment" placeholder="Udstyr"></td>
        <td><input type="number" id="hourly_price" placeholder="Pris"></td>
        <td><button id="saveActivityButton">Gem Aktivitet</button></td>
    `;

    tableBody.appendChild(inputRow);

    // Tilføj event listener til knappen
    document.getElementById('saveActivityButton').addEventListener('click', saveActivity);
}

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

// Gem et nyt produkt
async function saveSalesItem() {
    const salesItem = {
        type: document.getElementById('type').value,
        price: parseInt(document.getElementById('price').value),
    };

    try {
        const response = await fetch('https://adventurexp-g5freqhuangfa9ab.northeurope-01.azurewebsites.net/salesItems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(salesItem)
        });

        if (response.ok) {
            alert('Produkt oprettet succesfuldt!');
            fetchSalesItems(); // Opdater tabellen
        } else {
            alert('Fejl under oprettelse af produkt.');
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
