import {fetchBookings} from "../services/bookingService";

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

async function loadSchedule() {
    const tableBody = document.getElementById('scheduleTableBody');
    tableBody.innerHTML = '';

    try {
        const bookings = await fetchBookings();
        bookings.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.time}</td>
                <td>${booking.duration}</td>
                <td>${booking.participants}</td>
                <td>${booking.activity}</td>
                <td>${booking.tshirts}/${booking.sodas}${booking.sweet_Grams}/</td>
                <td>Instruktør navn</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Fejl ved hentning af bookings:", error);
    }
}
