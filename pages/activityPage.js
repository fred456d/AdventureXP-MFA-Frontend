import { fetchBookings, deleteBooking, updateBooking } from '../services/bookingService.js';
import { loadActivitiesForBooking } from './createBookingPage.js'; // Genbrug funktion

export async function bookingPage() {
    document.querySelector("#content").innerHTML = `
        <h1>Se/rediger/slet bookinger</h1>
        <input type="text" id="search" placeholder="Søg efter tlf." />
        <table>
            <thead>
                <tr>
                    <th>Dato</th>
                    <th>Tidspunkt</th>
                    <th>Varighed</th>
                    <th>Telefonnummer</th>
                    <th>Aktivitet</th>
                    <th>Efternavn</th>
                    <th>Handling</th>
                </tr>
            </thead>
            <tbody id="bookingTableBody">
                <tr><td colspan="7">Indlæser bookinger...</td></tr>
            </tbody>
        </table>

        <div id="editModal" class="modal" style="display:none;">
            <h2>Rediger Booking</h2>
            <form id="editForm">
                <label for="editDate">Dato:</label>
                <input type="date" id="editDate" required>

                <label for="editTime">Tidspunkt:</label>
                <input type="time" id="editTime" required>

                <label for="editDuration">Varighed:</label>
                <input type="text" id="editDuration" required>

                <label for="editPhone">Telefon:</label>
                <input type="text" id="editPhone" required>

                <label for="editActivity">Aktivitet:</label>
                <select id="editActivity">
                    <option value="">Indlæser aktiviteter...</option>
                </select>

                <label for="editLastname">Efternavn:</label>
                <input type="text" id="editLastname" required>

                <button type="submit">Gem ændringer</button>
                <button type="button" id="closeEdit">Annuller</button>
            </form>
        </div>

        <div id="confirmBox" class="confirm-box">
            <p>Vil du slette booking?</p>
            <button id="confirmDelete">Ja</button>
            <button id="closeConfirm">Nej</button>
        </div>
    `;

    try {
        const bookings = await fetchBookings();
        renderBookings(bookings);
    } catch (error) {
        console.error("Fejl ved hentning af bookinger:", error);
        document.getElementById("bookingTableBody").innerHTML = "<tr><td colspan='7'>Kunne ikke hente bookinger.</td></tr>";
    }

    // Eventlisteners
    document.getElementById("closeEdit").addEventListener("click", closeEditModal);
    document.getElementById("closeConfirm").addEventListener("click", closeConfirmBox);
}

function renderBookings(bookings) {
    const tableBody = document.getElementById("bookingTableBody");
    tableBody.innerHTML = "";

    bookings.forEach(booking => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td>${booking.duration}</td>
            <td>${booking.phone}</td>
            <td>${booking.activity.title}</td>
            <td>${booking.lastname}</td>
            <td class="buttons">
                <button class="edit-btn" data-id="${booking.id}" 
                    data-date="${booking.date}" 
                    data-time="${booking.time}" 
                    data-duration="${booking.duration}" 
                    data-phone="${booking.phone}" 
                    data-activity="${booking.activity.id}" 
                    data-lastname="${booking.lastname}">Rediger</button>

                <button class="delete-btn" data-id="${booking.id}">Slet</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", openEditModal);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", openConfirmBox);
    });
}

// redigeringsmodal
async function openEditModal(event) {
    const button = event.target;
    document.getElementById("editModal").style.display = "block";
    document.getElementById("editDate").value = button.dataset.date;
    document.getElementById("editTime").value = button.dataset.time;
    document.getElementById("editDuration").value = button.dataset.duration;
    document.getElementById("editPhone").value = button.dataset.phone;
    document.getElementById("editLastname").value = button.dataset.lastname;
//funktion fra createBookingPage (drop down)
    await loadActivitiesForBooking(button.dataset.activity); // Brug den eksisterende funktion
}

document.getElementById("editForm").onsubmit = async function (event) {
    event.preventDefault();

    const updatedBooking = {
        id: document.querySelector(".edit-btn").dataset.id,
        date: document.getElementById("editDate").value,
        time: document.getElementById("editTime").value,
        duration: document.getElementById("editDuration").value,
        phone: document.getElementById("editPhone").value,
        activity: document.getElementById("editActivity").value, // Bruger valgt aktivitets-ID
        lastname: document.getElementById("editLastname").value,
    };

    await updateBooking(updatedBooking);
    closeEditModal();
    bookingPage();
};

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

// Bekræftigelsesbox
function openConfirmBox(event) {
    const button = event.target;
    const bookingId = button.dataset.id;

    document.getElementById("confirmBox").style.display = "block";
    document.getElementById("confirmDelete").onclick = async function () {
        await deleteBooking(bookingId);
        closeConfirmBox();
        bookingPage();
    };
}

function closeConfirmBox() {
    document.getElementById("confirmBox").style.display = "none";
}
