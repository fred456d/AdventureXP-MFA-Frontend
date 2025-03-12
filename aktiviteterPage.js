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
}
