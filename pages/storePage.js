import { fetchSalesItems, saveSalesItem } from '../services/salesItemService.js';
import {savePrice} from "../services/salesItemService.js";

export async function storePage() {
    document.querySelector("#content").innerHTML = `
        <h1>Butik</h1>

        <div id="salesItemContainer">
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Pris (kr)</th>
                        <th>Handling</th>
                    </tr>
                </thead>
                <tbody id="salesItemTableBody">
                    <!-- Produkter vil blive indsat her med JavaScript -->
                </tbody>
            </table>
        </div>
    `;

    await loadSalesItems(); // Hent produkter når siden vises
    addSalesItemInputRow()
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
                <td>
                    <input type="number" class="price-input" value="${salesItem.price}" data-id="${salesItem.id}">
                </td>
                <td class="buttons">
                    <button class="save-btn" data-id="${salesItem.id}" >Gem pris</button>
                </td>   
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Fejl ved hentning af produkter:', error);
    }
    document.querySelectorAll(".save-btn").forEach(button => {
        button.addEventListener("click", savePrice);
    });
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
            storePage(); // Opdater hele siden
        } else {
            alert('Fejl under oprettelse af produkt.');
        }
    });
}
