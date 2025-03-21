import { BASE_URL } from './config.js';

console.log("BASE_URL:", BASE_URL)

// asynkron funktion som returnerer alle aktiviteter fra backend
// await pauser koden indtil fetch er færdig
// response indeholder det faktiske svar fra serveren
// response.json() konvererer svaret fra serveren til json
export async function fetchActivities() {
    console.log("Henter aktiviteter fra:", `${BASE_URL}/activities`);
    try {
        const response = await fetch(`${BASE_URL}/activities`);
        console.log("Response status:", response.status);
        if (!response.ok) throw new Error(`Fejl: ${response.statusText}`);
        return await response.json();
        console.log("Aktiviteter modtaget:", data);
    } catch (error) {
        console.error('Fejl ved hentning af aktiviteter:', error);
        alert("Kunne ikke hente aktiviteter. Prøv igen senere!");
    }
}

export async function saveActivity(activity) {
    try {
        const response = await fetch(`${BASE_URL}/activities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activity)
        });

        if (!response.ok) throw new Error(`Fejl: ${response.statusText}`);
        return response.ok;
    } catch (error) {
        console.error('Fejl ved oprettelse af aktivitet:', error);
        alert("Kunne ikke oprette aktivitet. Tjek input og prøv igen!");
    }
}
export async function updateActivity(activity) {
    try {
        const response = await fetch(`${BASE_URL}/activities/${activity.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activity)
        });

        if (!response.ok) {
            throw new Error(`Fejl: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fejl ved opdatering af aktivitet:", error);
        throw error;
    }
}

