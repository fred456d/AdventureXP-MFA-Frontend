import { fetchSalesItems, saveSalesItem } from '../services/salesItemService.js';

export function storePage() {
    document.querySelector("#content").innerHTML = `
        <h1>Butik</h1>

        <div id="salesItemContainer">
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
        <button id="addSalesItemButton">Tilføj produkt</button>
    `;

    loadSalesItems(); // Hent produkter når siden vises
    setupEventListeners();
}

async function loadSalesItems() {
    const tableBody = document.getElementById('salesItemTableBody');
    tableBody.innerHTML = '';

    try {
        const salesItems = await fetchSalesItems();
        salesItems.forEach(salesItem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${salesItem.type}</td>
                <td>${salesItem.price} DKK</td>
            `;
            tableBody.appendChild(row);
        });

        addSalesItemInputRow(); // Tilføj inputrække
    } catch (error) {
        console.error('Fejl ved hentning af produkter:', error);
    }
}

function setupEventListeners() {
    document.getElementById('addSalesItemButton').addEventListener('click', addSalesItemInputRow);
}

function addSalesItemInputRow() {
    const tableBody = document.getElementById('salesItemTableBody');

    const inputRow = document.createElement('tr');
    inputRow.innerHTML = `
        <td><input type="text" id="type" placeholder="Type"></td>
        <td><input type="number" id="price" placeholder="Pris"></td>
        <td><button id="saveSalesItemButton">Gem Produkt</button></td>
    `;

    tableBody.appendChild(inputRow);

    document.getElementById('saveSalesItemButton').addEventListener('click', async () => {
        const newSalesItem = {
            type: document.getElementById('type').value,
            price: parseInt(document.getElementById('price').value),
        };

        if (await saveSalesItem(newSalesItem)) {
            alert('Produkt oprettet succesfuldt!');
            loadSalesItems(); // Opdater listen
        } else {
            alert('Fejl under oprettelse af produkt.');
        }
    });
}
