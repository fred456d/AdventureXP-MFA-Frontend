import {fetchBookings} from "../services/bookingService.js";

const daysOfWeek = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];

export async function schedulePage() {
    document.querySelector("#content").innerHTML = `
        <h1>Vagtplan</h1>
        <div id="scheduleContainer">
            <table>
                <thead>
                    <tr>
                        <th>Dato</th>
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



    await loadSchedule();
}

async function loadSchedule() {
    const tableBody = document.getElementById('scheduleTableBody');
    tableBody.innerHTML = '';

    try {
        const bookings = await fetchBookings();
        bookings.forEach(booking => {
            const row = document.createElement('tr');
            const time_split = booking.time.split(":");
            const duration_split = booking.duration.split(":");
            const date_split = booking.date.split("-");

            const instructor = booking.instructor || "-";

            row.innerHTML = `
                <td>${date_split[2]}/${date_split[1]}</td>
                <td>kl. ${time_split[0]}:${time_split[1]}</td>
                <td>${duration_split[0]}t : ${duration_split[1]}m</td>
                <td>${booking.participants}</td>
                <td>${booking.activity.title}</td>
                <td>${booking.tshirts}/${booking.sodas}/${booking.sweet_Grams} g</td>
                <td>${instructor}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Fejl ved hentning af bookings:", error);
    }
}