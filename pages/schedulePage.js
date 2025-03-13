import { fetchBookings } from "../services/bookingService.js";

const daysOfWeek = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

export async function schedulePage() {
    document.querySelector("#content").innerHTML = `
        <h1>Vagtplan</h1>
        <div id="scheduleContainer">
            ${daysOfWeek.map(day => `
                <h2>${day}</h2>
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
                    <tbody id="${day}-table"></tbody>
                </table>
            `).join('')}
        </div>
    `;

    await loadSchedule();
}

async function loadSchedule() {
    try {
        const bookings = await fetchBookings();

        // Group bookings by day of the week
        const groupedBookings = groupByDay(bookings);

        // Populate each day's table
        daysOfWeek.forEach(day => {
            const tableBody = document.getElementById(`${day}-table`);
            tableBody.innerHTML = '';

            const bookingsForDay = groupedBookings[day] || [];

            bookingsForDay.forEach(booking => {
                const row = document.createElement('tr');
                const time_split = booking.time.split(":");
                const duration_split = booking.duration.split(":");
                const instructor = booking.instructor || "-";

                row.innerHTML = `
                    <td>kl. ${time_split[0]}:${time_split[1]}</td>
                    <td>${duration_split[0]}t : ${duration_split[1]}m</td>
                    <td>${booking.participants}</td>
                    <td>${booking.activity.title}</td>
                    <td>${booking.tshirts}/${booking.sodas}/${booking.sweet_Grams} g</td>
                    <td>${instructor}</td>
                `;

                tableBody.appendChild(row);
            });
        });
    } catch (error) {
        console.error("Fejl ved hentning af bookings:", error);
    }
}

function groupByDay(bookings) {
    return bookings
        .filter(booking => {
            const bookingDate = new Date(booking.date);
            const today = new Date();

            const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            const diffInDays = Math.floor((bookingDate - currentDay) / (1000 * 60 * 60 * 24));

            // Filter only for Monday to Friday, and exclude past bookings
            return (
                diffInDays >= 0 &&
                bookingDate.getDay() >= 1 && // Exclude Sunday
                bookingDate.getDay() <= 5 // Exclude Saturday
            );
        })
        .reduce((acc, booking) => {
        const date = new Date(booking.date);
        const dayName = daysOfWeek[date.getDay()];

        if (!acc[dayName]) {
            acc[dayName] = [];
        }
        acc[dayName].push(booking);

        return acc;
    }, {});
}
