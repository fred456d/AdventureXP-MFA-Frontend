import { fetchBookings, deleteBooking, updateBooking } from '../services/bookingService.js';
import { fetchActivities } from '../services/activityService.js'; // Henter aktiviteter

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
                    <th>Kunde</th>
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
                
                <input type="hidden" id="editBookingId">
                <input type="hidden" id="editCustomerId">   
                
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

                <label for="editCustomer">Kunde:</label>
                <input type="text" id="editCustomer" required>

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
            <td>${booking.customer?.phone || 'Ingen tlf.'}</td>
            <td>${booking.activity?.title || 'Ingen aktivitet'}</td>
            <td>${booking.customer?.name || 'Ingen navn'}</td>
            <td class="buttons">
                <button class="edit-btn" data-id="${booking.id}" 
                    data-date="${booking.date}" 
                    data-time="${booking.time}" 
                    data-duration="${booking.duration}" 
                    data-phone="${booking.customer?.phone}" 
                    data-customer-id="${booking.customer?.id}" 
                    data-activity-id="${booking.activity?.id}">Rediger</button>

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

// åbn redigeringsmodal og fyld dropdown
async function openEditModal(event) {
    const button = event.target;
    document.getElementById("editModal").style.display = "block";

    console.log("Åbner modal med booking:", button.dataset); // Debugging
    //værdier til de skjulte felter
    document.getElementById("editBookingId").value = button.dataset.id;
    document.getElementById("editCustomerId").value = button.dataset.customerId;

    document.getElementById("editDate").value = button.dataset.date;
    document.getElementById("editTime").value = button.dataset.time;
    document.getElementById("editDuration").value = button.dataset.duration;
    document.getElementById("editPhone").value = button.dataset.phone;
    document.getElementById("editCustomer").value = button.dataset.name

    const bookingId = button.dataset.id;
    const customerId = button.dataset.customerId;
    const activityId = button.dataset.activityId;

    console.log("Customer ID:", customerId, "Activity ID:", activityId, "Phone:", button.dataset.phone); // Debugging

    await loadActivitiesForEdit(activityId); // Fylder dropdown med aktiviteter

    document.getElementById("editForm").onsubmit = async function (event) {
        event.preventDefault();
        const bookingId = parseInt(document.getElementById("editBookingId").value);
        const customerId = parseInt(document.getElementById("editCustomerId").value);
        const activityId = parseInt(document.getElementById("editActivity").value);

        // Opret tomme objekter og fyld kun de felter, der er ændret
        const updatedCustomer = {};
        const currentCustomerName = document.getElementById("editCustomer").getAttribute("data-original-value");
        const newCustomerName = document.getElementById("editCustomer").value;
        if (newCustomerName !== currentCustomerName) {
            updatedCustomer.id = customerId;
            updatedCustomer.name = newCustomerName;
        }
        //Opdaterer phone
        const currentPhone = document.getElementById("editPhone").getAttribute("data-original-value");
        const newPhone = document.getElementById("editPhone").value;
        if (newPhone !== currentPhone) {
            updatedCustomer.id = customerId;
            updatedCustomer.phone = newPhone;
        }
        //Opdaterer aktiviteten
        const updatedActivity = {};
        const currentActivityId = document.getElementById("editActivity").getAttribute("data-original-value");
        if (activityId !== parseInt(currentActivityId)) {
            updatedActivity.id = activityId;
        }
        //Kæmpe trycatch der sender fejl hvis det ikke funger med opdateringen
        try {
            if (Object.keys(updatedCustomer).length > 0) {
                console.log("Opdaterer kunde:", updatedCustomer);
                await updateCustomer(updatedCustomer);
            }

        const updatedBooking = {
            id: parseInt(bookingId),
            date: document.getElementById("editDate").value,
            time: document.getElementById("editTime").value,
            duration: document.getElementById("editDuration").value,
            phone: document.getElementById("editPhone").value,
            customerId: parseInt(customerId),
            activityId: parseInt(document.getElementById("editActivity").value)
        };

        console.log("Sender opdateret booking til backend:", updatedBooking); // Debugging

        await updateBooking(updatedBooking);
        closeEditModal();
        bookingPage();
        } catch (error) {
            console.error("Fejl ved opdatering:", error);
            alert("Kunne ikke opdatere booking.");
        }
    };
}

async function loadActivitiesForEdit(selectedActivityId) {
    const select = document.getElementById("editActivity");
    select.innerHTML = `<option value="">Indlæser aktiviteter...</option>`;

    try {
        const activities = await fetchActivities();
        select.innerHTML = `<option value="">Vælg en aktivitet...</option>`;

        activities.forEach(activity => {
            const option = document.createElement("option");
            option.value = activity.id;
            option.textContent = activity.title;
            if (parseInt(selectedActivityId) === activity.id) {
                option.selected = true; // Forvalg den nuværende aktivitet
            }
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Fejl ved hentning af aktiviteter:", error);
        select.innerHTML = `<option value="">Kunne ikke hente aktiviteter</option>`;
    }
}

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
