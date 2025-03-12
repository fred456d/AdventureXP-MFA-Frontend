import { BASE_URL } from './config.js';

export async function createBooking(booking) {
    try {
        const response = await fetch(`${BASE_URL}/create-booking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });

        if (!response.ok) throw new Error(`Fejl: ${response.statusText}`);
        return response.ok;
    } catch (error) {
        console.error('Fejl ved oprettelse af booking:', error);
        alert("Kunne ikke oprette booking. Prøv igen senere!");
    }
}

export async function fetchBookings() {
    try {
        const response = await fetch(`${BASE_URL}/bookings`);
        if (!response.ok) throw new Error(`Fejl: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Fejl ved hentning af bookinger:', error);
        alert("Kunne ikke hente bookinger. Prøv igen senere!");
    }
}