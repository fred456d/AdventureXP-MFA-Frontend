import { BASE_URL } from './config.js';
import {storePage} from "../pages/storePage.js";

export async function fetchSalesItems() {
    try {
        const response = await fetch(`${BASE_URL}/salesitems`);
        if (!response.ok) throw new Error(`Fejl: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Fejl ved hentning af produkter:', error);
        alert("Kunne ikke hente produkter. Prøv igen senere!");
    }
}

export async function saveSalesItem(salesItem) {
    try {
        const response = await fetch(`${BASE_URL}/salesitems`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(salesItem)
        });

        if (!response.ok) throw new Error(`Fejl: ${response.statusText}`);
        return response.ok;
    } catch (error) {
        console.error('Fejl ved oprettelse af produkt:', error);
        alert("Kunne ikke oprette produkt. Tjek input og prøv igen!");
    }
}

export async function savePrice(event) {
    const bookingId = event.target.dataset.id;
    const inputField = document.querySelector(`input[data-id="${bookingId}"]`);
    const price = inputField.value;

    try {
        const response = await fetch(`${BASE_URL}/salesitems/${bookingId}/price`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: price,
        });

        if (!response.ok) {
            throw new Error('Fejl ved opdatering af pris');
        }

        alert("Pris gemt!");
        await storePage();

    } catch (error) {
        console.error(error);
    }
}
