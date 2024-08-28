const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timer');
const alarmSound = document.getElementById('alarmSound');
const lapCounterDisplay = document.getElementById('lapCounter');

let countdown;
let totalTime = 15 * 60; // 1 minuto en segundos
let isPaused = false;
let lapCounter = 0;

// Verificar si las notificaciones son compatibles y pedir permiso
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

function startTimer() {
  clearInterval(countdown); // Limpia cualquier cronómetro previo
  isPaused = false;
  countdown = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!isPaused) {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (totalTime <= 0) {
      clearInterval(countdown);
      alarmSound.play(); // Reproduce el sonido cuando el tiempo llega a cero
      sendNotification(); // Envía la notificación de escritorio
      lapCounter++; // Incrementa el contador de vueltas
      lapCounterDisplay.textContent = lapCounter; // Actualiza el contador en pantalla
      totalTime = 15 * 60; // Reinicia el temporizador para 1 minuto
      startTimer(); // Vuelve a iniciar el temporizador automáticamente
    } else {
      totalTime--;
    }
  }
}

function pauseTimer() {
  isPaused = true;
}

function resetTimer() {
  clearInterval(countdown);
  totalTime = 15 * 60; // Reinicia el temporizador a 1 minuto
  timerDisplay.textContent = "15:00"; // Reinicia la visualización
  isPaused = false;
  lapCounter = 0; // Reinicia el contador de vueltas
  lapCounterDisplay.textContent = lapCounter; // Actualiza la visualización del contador
}

// Función para enviar la notificación de escritorio
function sendNotification() {
  if (Notification.permission === 'granted') {
    new Notification("¡Tiempo completado!", {
      body: "ÉL que lee es puto.",
      icon: 'alarma.png' // Puedes usar un icono personalizado si lo deseas
    });
  }
}

// Solicita permiso para mostrar notificaciones cuando se carga la página
document.addEventListener('DOMContentLoaded', requestNotificationPermission);

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
