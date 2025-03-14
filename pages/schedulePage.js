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
            const timeParts = booking.time.split(":").map(Number);

            const durationParts = booking.duration.split(":").map(Number);
            //Plus tider sammen
            const bookingTime = new Date();
            bookingTime.setHours(timeParts[0], timeParts[1]);

            const endTime = new Date();
            endTime.setHours(timeParts[0] + durationParts[0], timeParts[1] + durationParts[1]);
            const endTimeHour = String(endTime.getHours()).padStart(2,"0");
            const endTimeMin = String(endTime.getMinutes()).padStart(2,"0");


            console.log("Endtime: " + endTime.getHours() +":"+ endTime.getMinutes());

            const date_split = booking.date.split("-");

            const instructor = booking.instructor || "-";

            row.innerHTML = `
                <td>${date_split[2]}/${date_split[1]}</td>
                <td>kl. ${time_split[0]}:${time_split[1]}</td>
                <td>kl. ${endTimeHour}:${endTimeMin}</td>
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