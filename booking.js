document.addEventListener('DOMContentLoaded', () => {
    loadActivities();
    document.getElementById('bookingForm').addEventListener('submit', createBooking);
});

// **🔹 Henter aktiviteter fra backend**
async function loadActivities() {
    const activitySelect = document.getElementById('activity');

    try {
        const response = await fetch('https://adventurexp-g5freqhuangfa9ab.northeurope-01.azurewebsites.net/activities');
        const activities = await response.json();

        activities.forEach(activity => {
            const option = document.createElement('option');
            option.value = activity.id;
            option.textContent = `${activity.title} (Min. alder: ${activity.age_Requirement})`;
            activitySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Fejl ved hentning af aktiviteter:', error);
    }
}

// **🔹 Sender booking-data til backend**
async function createBooking(event) {
    event.preventDefault();

    const booking = {
        activity: { id: document.getElementById('activity').value },
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        duration: document.getElementById('duration').value,
        participants: parseInt(document.getElementById('participants').value),
        sodas: parseInt(document.getElementById('sodas').value) || 0,
        sweet_Grams: parseInt(document.getElementById('sweetGrams').value) || 0,
        tshirts: parseInt(document.getElementById('tshirts').value) || 0,
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        }
    };

    try {
        const response = await fetch('http://localhost:8080/create-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });

        if (response.ok) {
            alert('Booking oprettet succesfuldt!');
            document.getElementById('bookingForm').reset();
        } else {
            alert('Fejl ved oprettelse af booking.');
        }
    } catch (error) {
        console.error('Fejl:', error);
    }
}
