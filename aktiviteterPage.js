export function aktiviteterPage() {
    return `
        <h1>Opret en ny aktivitet</h1>

            <!-- Her oprettes den almindelige html-formular -->
            <form>
                <div class="form-group">
                    <label for="title">Titel:</label>
                    <input type="text" id="title" name="title">
                </div>
            
                <div class="form-group">
                    <label for="age_Requirement">Alderskrav:</label>
                    <input type="number" id="age_Requirement" name="age_Requirement">
                </div>
            
                <div class="form-group">
                    <label for="height_Requirement">Højdekrav:</label>
                    <input type="number" id="height_Requirement" name="height_Requirement">
                </div>
            
                <div class="form-group">
                    <label for="equipment">Udstyr:</label>
                    <input type="text" id="equipment" name="equipment">
                </div>
            
                <div class="form-group">
                    <label for="hourly_price">Timepris:</label>
                    <input type="number" id="hourly_price" name="hourly_price">
                </div>
            
                <button type="submit">Gem Aktivitet</button>
            </form>

    `;
}