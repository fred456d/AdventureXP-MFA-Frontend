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
        
                <!-- Formular til at tilføje en ny aktivitet som en sidste række -->
                <tfoot>
                    <tr>
                        <td><input type="text" id="title" name="title" placeholder="Titel"></td>
                        <td><input type="number" id="age_Requirement" name="age_Requirement" placeholder="Alderskrav"></td>
                        <td><input type="number" id="height_Requirement" name="height_Requirement" placeholder="Højdekrav"></td>
                        <td><input type="text" id="equipment" name="equipment" placeholder="Udstyr"></td>
                        <td><input type="number" id="hourly_price" name="hourly_price" placeholder="Timepris"></td>
                        <td><button type="submit" onclick="saveActivity()">Gem Aktivitet</button></td>
                    </tr>
                </tfoot>
            </table>
        </div>

    `;
}
