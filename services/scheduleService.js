import { BASE_URL } from './config.js';

export async function saveInstructor(event) {
    const bookingId = event.target.dataset.id;
    const inputField = document.querySelector(`input[data-id="${bookingId}"]`);
    const instructorName = inputField.value;

    try {
        const response = await fetch(`${BASE_URL}/bookings/${bookingId}/instructor`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(instructorName),
        });

        if (!response.ok) {
            throw new Error('Fejl ved opdatering af instruktør');
        }

        alert("Instruktør gemt!");
    } catch (error) {
        console.error(error);
    }
}