import { fetchActivities, saveActivity } from '../services/activityService.js';

export async function activityPage() {
    document.querySelector("#content").innerHTML = `
        <h1>Aktiviteter</h1>
        <div id="activitiesContainer">
            <table>
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Alderskrav</th>
                        <th>Højdekrav</th>
                        <th>Udstyr</th>
                        <th>Timepris</th>git push --force
                        <th>Handling</th>
                    </tr>
                </thead>
                <tbody id="activitiesTableBody"></tbody>
            </table>
        </div>
    `;

    await loadActivities();
    addInputRow();
}

async function loadActivities() {
    console.log("Laster aktiviteter...");
    const tableBody = document.getElementById('activitiesTableBody');
    tableBody.innerHTML = '';

    try {
        const activities = await fetchActivities();
        activities.forEach(activity => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${activity.title}</td>
                <td>${activity.age_Requirement}</td>
                <td>${activity.height_Requirement}</td>
                <td>${activity.equipment}</td>
                <td>${activity.hourly_price} DKK</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Fejl ved hentning af aktiviteter:", error);
    }
}

function addInputRow() {
    const tableBody = document.getElementById('activitiesTableBody');

    const inputRow = document.createElement('tr');
    inputRow.innerHTML = `
        <td><input type="text" id="title" placeholder="Titel"></td>
        <td><input type="number" id="age_Requirement" placeholder="Alder"></td>
        <td><input type="number" id="height_Requirement" placeholder="Højde"></td>
        <td><input type="text" id="equipment" placeholder="Udstyr"></td>
        <td><input type="number" id="hourly_price" placeholder="Pris"></td>
        <td><button id="saveActivityButton">Gem Aktivitet</button></td>
    `;

    tableBody.appendChild(inputRow);

    document.getElementById('saveActivityButton').addEventListener('click', saveActivityHandler);
}

async function saveActivityHandler() {
    const activity = {
        title: document.getElementById('title').value,
        age_Requirement: parseInt(document.getElementById('age_Requirement').value),
        height_Requirement: parseInt(document.getElementById('height_Requirement').value),
        equipment: document.getElementById('equipment').value,
        hourly_price: parseInt(document.getElementById('hourly_price').value)
    };

    if (await saveActivity(activity)) {
        alert('Aktivitet oprettet!');
        loadActivities(); // Opdater listen uden reload
    } else {
        alert('Fejl ved oprettelse.');
    }
}