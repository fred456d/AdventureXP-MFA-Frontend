export function aktiviteterPage() {
    return `
        <h1>Aktiviteter</h1>

        <!-- Container til tabel og formular -->
        <div id="activitiesContainer">
            <!-- Tabel over eksisterende aktiviteter -->
            <table>
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Alderskrav</th>
                        <th>Højdekrav</th>
                        <th>Udstyr</th>
                        <th>Timepris</th>
                    </tr>
                </thead>
                <tbody id="activitiesTableBody">
                    <!-- Aktiviteter vil blive indsat her med JavaScript -->
                </tbody>
            </table>
        </div>

    `;

    try {
        const response = await fetch('https://adventurexp-g5freqhuangfa9ab.northeurope-01.azurewebsites.net/activities');
        const activities = await response.json();

        const tableBody = document.getElementById('activitiesTableBody');
        tableBody.innerHTML = ''; // Ryd tabellen før nye data

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

        // Tilføj event listener til knappen
        document.getElementById('saveActivityButton').addEventListener('click', saveActivity);

    } catch (error) {
        console.error('Fejl ved hentning af aktiviteter:', error);
    }
}
