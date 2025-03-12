export function butikPage() {
    return `
        <h1>Butik</h1>

        <!-- Container til tabel og formular -->
        <div id="salesItemContainer">
            <!-- Tabel over eksisterende produkter -->
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Pris</th>
                    </tr>
                </thead>
                <tbody id="salesItemTableBody">
                    <!-- Produkter vil blive indsat her med JavaScript -->
                </tbody>
            </table>
        </div>

    `;
}
