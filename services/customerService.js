import { BASE_URL } from './config.js';

export async function updateCustomer(customer) {
    try {
        const response = await fetch(`${BASE_URL}/customers/${customer.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        });

        if (!response.ok) {
            throw new Error(`Fejl: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fejl ved opdatering af kunde:", error);
        throw error;
    }
}
