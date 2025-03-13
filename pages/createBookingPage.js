import { createBooking } from '../services/bookingService.js';
import { fetchActivities } from '../services/activityService.js'; // Tilføjet import

export function createBookingPage() {
    document.querySelector("#content").innerHTML = `
        <h1>Opret Booking</h1>
        <form id="bookingForm" class="booking-form">
            <div class="form-group">
                <label for="activity">Aktivitet:</label>
                <select id="activity" name="activity" required>
                    <option value="">Vælg en aktivitet...</option>
                </select>
            </div>>
            <div class="form-group">
                <label for="date">Dato:</label>
                <input type="date" id="date" name="date" required>
            </div>
            <div class="form-group">
                <label for="time">Tidspunkt:</label>
                <input type="time" id="time" name="time" required>
            </div>
            <div class="form-group">
                <label for="duration">Varighed:</label>
                <input type="time" id="duration" name="duration" required>
            </div>
            <div class="form-group">
                <label for="participants">Antal deltagere:</label>
                <input type="number" id="participants" name="participants" required min="1">
            </div>

            <h2>Kundeoplysninger</h2>
            <div class="form-group">
                <label for="name">Navn:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="phone">Telefon:</label>
                <input type="tel" id="phone" name="phone" required>
            </div>

            <button type="submit" class="submit-btn">Opret Booking</button>
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

export async function loadActivitiesForBooking() {
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
