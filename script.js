function changeGreeting() {
    const greetingElement = document.getElementById('greeting');
    greetingElement.textContent = 'Du har klikket på knappen!';
    greetingElement.style.color = 'blue';
    console.log('Knappen blev klikket!');
}