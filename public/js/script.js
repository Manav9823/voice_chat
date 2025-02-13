// 'use strict';

// console.log('hello manav')

let socket 
try {
    socket = io.connect("http://localhost:7777")
    console.log('Socket intialized')
} catch(err) {
    console.log('error connection socket.io', err)
}
console.log('new manav')

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    alert("Speech Recognition API not supported in this browser.");
  }
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
  console.log('recognition started')
  recognition.start();
  console.log('recognition started')
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
    console.log('Result has been detected.');
    console.log(e.results)
    let last = e.results.length - 1;
    let text = e.results[last]?.[0]?.transcript; // Safe access to prevent errors
    console.log("Last index:", last);
    console.log("Transcript:", text);
  
    if (e.results[0] && e.results[0][0]) {
      console.log('Confidence:', e.results[0][0].confidence);
    } else {
      console.warn("No confidence value found in results.");
    }

    console.log('hii manav')
  
    outputYou.textContent = text || "No text detected";
    // synthVoice(text)
    console.log('text', text)

    if (socket && socket.connected) {
        console.log('inside emitting the message')
        socket.emit('chatMessage', { text });
        console.log("Sent message:", text);
    } else {
        console.warn("Socket is not connected, cannot send message");
    }
//   socket.emit('chatMessage', {text});
});

// recognition.addEventListener('speechend', () => {
//   recognition.stop();
// });

// recognition.addEventListener('error', (e) => {
//   outputBot.textContent = 'Error: ' + e.error;
// });

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

socket.on('chatReply', ({aiReply}) => {
  console.log('inside the reply text code', aiReply)
  synthVoice(aiReply);

  if(aiReply == '') aiReply = '(No answer...)';
  outputBot.textContent = aiReply;
});