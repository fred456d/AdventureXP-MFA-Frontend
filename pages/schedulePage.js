import {fetchBookings} from "../services/bookingService.js";
import {saveInstructor} from "../services/scheduleService.js";

export async function schedulePage() {
    document.querySelector("#content").innerHTML = `
        <h1>Vagtplan</h1>
        <div id="scheduleContainer">
            <table>
                <thead>
                    <tr>
                        <th>Dato</th>
                        <th>Start</th>
                        <th>Slut</th>
                        <th>Antal deltagere</th>
                        <th>Aktivitet</th>
                        <th>T-shirt/Soda/Slik</th>
                        <th>Instruktør</th>
                        <th>Handling</th>
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
            const endTime = booking.time + booking.duration
            const endTime_split = endTime.split(":");
            const date_split = booking.date.split("-");

            const instructor = booking.instructor || "-";

            row.innerHTML = `
                <td>${date_split[2]}/${date_split[1]}</td>
                <td>kl. ${time_split[0]}:${time_split[1]}</td>
                <td>${endTime_split[0]}t : ${endTime_split[1]}m</td>
                <td>${booking.participants}</td>
                <td>${booking.activity.title}</td>
                <td>${booking.tshirts}/${booking.sodas}/${booking.sweet_Grams} g</td>
                <td>
                    <input type="text" class="instructor-input" value="${instructor}" data-id="${booking.id}">
                </td>
                <td class="buttons">
                    <button class="save-btn" data-id="${booking.id}" >Gem instruktør</button>
                </td>   
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Fejl ved hentning af bookings:", error);
    }

    document.querySelectorAll(".save-btn").forEach(button => {
        button.addEventListener("click", saveInstructor);
    });
}