import { createBooking } from '../services/bookingService.js';
import { fetchActivities } from '../services/activityService.js'; // Tilføjet import

export function createBookingPage() {
    document.querySelector("#content").innerHTML = `
        <h1>Opret Booking</h1>
        <form id="bookingForm">
            <label for="activity">Aktivitet:</label>
            <select id="activity" name="activity" required>
                <option value="">Indlæser aktiviteter...</option>
            </select><br><br>

            <label for="date">Dato:</label>
            <input type="date" id="date" name="date" required><br><br>

            <label for="time">Tidspunkt:</label>
            <input type="time" id="time" name="time" required><br><br>

            <label for="duration">Varighed (timer:minutter):</label>
            <input type="time" id="duration" name="duration" required><br><br>

            <label for="participants">Antal deltagere:</label>
            <input type="number" id="participants" name="participants" required min="1"><br><br>

            <h2>Kundeoplysninger</h2>
            <label for="name">Navn:</label>
            <input type="text" id="name" name="name" required><br><br>

            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required><br><br>

            <label for="phone">Telefon:</label>
            <input type="tel" id="phone" name="phone" required><br><br>

            <button type="submit">Opret Booking</button>
        </form>
    `;

    loadActivitiesForBooking(); // Henter aktiviteter ved sidens indlæsning

    document.getElementById('bookingForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const booking = {
            activity: { id: document.getElementById('activity').value },
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            duration: document.getElementById('duration').value,
            participants: parseInt(document.getElementById('participants').value),
            customer: {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            }
        };

        if (await createBooking(booking)) {
            alert('Booking oprettet succesfuldt!');
            document.getElementById('bookingForm').reset();
        } else {
            alert('Fejl ved oprettelse af booking.');
        }
    });
}

async function loadActivitiesForBooking() {
    console.log("Henter aktiviteter til booking...");
    const activitySelect = document.getElementById('activity');

    if (!activitySelect) {
        console.error("Fejl: Kunne ikke finde aktivitets-dropdown.");
        return;
    }

    try {
        const activities = await fetchActivities();
        console.log("Modtog aktiviteter:", activities);

        if (!activities || activities.length === 0) {
            console.warn("Ingen aktiviteter modtaget!");
            return;
        }

        activitySelect.innerHTML = '<option value="">Vælg en aktivitet</option>';

        activities.forEach(activity => {
            const option = document.createElement('option');
            option.value = activity.id;
            option.textContent = activity.title;
            activitySelect.appendChild(option);
        });

    } catch (error) {
        console.error("Fejl ved hentning af aktiviteter:", error);
    }
}
