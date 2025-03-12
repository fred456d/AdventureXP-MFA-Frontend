export function bookingPage() {
    return `
<h1>Opret Booking</h1>
<form id="bookingForm">
  <label for="activity">Aktivitet:</label>
  <select id="activity" name="activity" required></select><br><br>

  <label for="date">Dato:</label>
  <input type="date" id="date" name="date" required><br><br>

  <label for="time">Tidspunkt:</label>
  <input type="time" id="time" name="time" required><br><br>

  <label for="duration">Varighed (timer:minutter):</label>
  <input type="time" id="duration" name="duration" required><br><br>

  <label for="participants">Antal deltagere:</label>
  <input type="number" id="participants" name="participants" required min="1"><br><br>

  <label for="sodas">Sodavand:</label>
  <input type="number" id="sodas" name="sodas" min="0"><br><br>

  <label for="sweetGrams">Slik (gram):</label>
  <input type="number" id="sweetGrams" name="sweetGrams" min="0"><br><br>

  <label for="tshirts">T-shirts:</label>
  <input type="number" id="tshirts" name="tshirts" min="0"><br><br>

  <h2>Kundeoplysninger</h2>
  <label for="name">Navn:</label>
  <input type="text" id="name" name="name" required><br><br>

  <label for="email">E-mail:</label>
  <input type="email" id="email" name="email" required><br><br>

  <label for="phone">Telefon:</label>
  <input type="tel" id="phone" name="phone" required><br><br>

  <button type="submit">Opret Booking</button>
</form>
    `;
}