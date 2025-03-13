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
export async function updateBooking(booking) {
    try {
        const response = await fetch(`${BASE_URL}/bookings/${booking.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });

        if (!response.ok) throw new Error(`Fejl: ${response.statusText}`);
        return await response.json(); // Returnerer den opdaterede booking
    } catch (error) {
        console.error('Fejl ved opdatering af booking:', error);
        alert("Kunne ikke opdatere booking. Prøv igen senere!");
    }
}
export async function deleteBooking(id) {
    try {
        const response = await fetch(`${BASE_URL}/bookings/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Fejl: ${response.statusText}`);
        return true; // Returnerer true, hvis sletning lykkes
    } catch (error) {
        console.error('Fejl ved sletning af booking:', error);
        alert("Kunne ikke slette booking. Prøv igen senere!");
    }
}