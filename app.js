import { activityPage } from './pages/activityPage.js';
import { storePage } from './pages/storePage.js';
import { createBookingPage } from './pages/createBookingPage.js';
import { schedulePage } from "./pages/schedulePage.js";

// Start med at vise forsiden, når siden indlæses
window.onload = function () {
    showPage('forside');
};

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
        activityPage();
    } else if (page === 'booking') {
        bookingPage();
    } else if (page === 'vagtplan') {
        schedulePage();
    } else if (page === 'butik') {
        storePage();
    } else if (page === 'opretBooking') {
        createBookingPage();
    } else {
        contentDiv.innerHTML = `<h1>404 - Siden blev ikke fundet</h1>`;
    }
};

// Håndter tilbage-knap i browseren
window.onpopstate = function (event) {
    if (event.state && event.state.page) {
        showPage(event.state.page);
    }
};