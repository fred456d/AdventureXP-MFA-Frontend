export function aktiviteterPage() {
    return `
        <h1>Opret en ny aktivitet</h1>

            <!-- Her oprettes den almindelige html-formular -->
            <form id="activityForm">
                <label for="title">Titel:</label>
                <input type="text" id="title" name="title" required><br><br>
            
                <label for="age_Requirement">Alderskrav:</label>
                <input type="number" id="age_Requirement" name="age_Requirement"><br><br>
            
                <label for="height_Requirement">Højdekrav (cm):</label>
                <input type="number" id="height_Requirement" name="height_Requirement"><br><br>
            
                <label for="equipment">Udstyr:</label>
                <input type="text" id="equipment" name="equipment"><br><br>
            
                <label for="hourly_price">Timepris (DKK):</label>
                <input type="number" id="hourly_price" name="hourly_price" required><br><br>
            
                <button type="submit">Opret Activity</button>
            </form>
    `;
}