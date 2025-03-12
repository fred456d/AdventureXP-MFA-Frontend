export function schedulePage() {
    document.querySelector("#content").innerHTML = `
        <h1>Vagtplan</h1>
        <div id="scheduleContainer">
            <table>
                <thead>
                    <tr>
                        <th>Tidspunkt</th>
                        <th>Varighed</th>
                        <th>Antal deltagere</th>
                        <th>Aktivitet</th>
                        <th>T-shirt/Soda/Slik</th>
                        <th>Instruktør</th>
                    </tr>
                </thead>
                <tbody id="scheduleTableBody"></tbody>
            </table>
        </div>
    `;
}

