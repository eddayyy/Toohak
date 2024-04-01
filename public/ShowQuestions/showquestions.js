// Import Firebase app and Firestore modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Firebase configuration for your project
const firebaseConfig = {
  apiKey: "AIzaSyCFZZdU6tXJkw0jl0JBlPtXJWVz4R18Bgk",
  authDomain: "toohak-a8f56.firebaseapp.com",
  databaseURL: "https://toohak-a8f56-default-rtdb.firebaseio.com",
  projectId: "toohak-a8f56",
  storageBucket: "toohak-a8f56.appspot.com",
  messagingSenderId: "897488009404",
  appId: "1:897488009404:web:1063307bdc12e4b277f8b9",
  measurementId: "G-K22LYRMT3G",
};

// Initialize Firebase and Firestore instances
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Array to store the correct answers for validation later
let correctAnswers = [];

// Function to fetch quizzes from Firestore and display them
async function fetchAndDisplayQuizzes() {
  // Extracting room data from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get("room");
  if (!encodedData) {
    console.error("No room data provided in the URL.");
    return;
  }

  // Getting reference to the quiz container element
  const quizContainer = document.getElementById("quizContainer");
  try {
    // Fetching documents from Firestore based on the encoded URL data
    const qSnapshot = await getDocs(query(collection(db, "games"), where("url", "==", encodedData)));
    qSnapshot.forEach((doc) => {
      const gameData = doc.data();
      const questions = gameData.questions;

      // Generating quiz content dynamically based on fetched data
      questions.forEach((question, index) => {
        correctAnswers[index] = question.correctAnswer; // Storing correct answers for later validation
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.innerHTML = `
          <h4 class="questionQ">Question ${index + 1}: ${question.questionText}</h4>
          <div class="options">
            ${Object.keys(question.options).map(key =>
              `<label><input type="radio" name="question${index}" value="${key}"> ${question.options[key]}</label>`
            ).join("<br>")}
          </div>
        `;
        quizContainer.appendChild(questionElement);
      });
    });

    // Setting up event listeners for the dynamically created radio inputs
    document.querySelectorAll('.options input[type="radio"]').forEach(input => {
      input.addEventListener('change', function () {
        let parentOptionsDiv = this.closest('.options');
        parentOptionsDiv.querySelectorAll('label').forEach(label => {
          label.classList.remove('active');
        });
        this.closest('label').classList.add('active');
      });
    });
  } catch (error) {
    console.error("Error fetching games: ", error);
    quizContainer.innerHTML = `<p>Error loading games.</p>`;
  }
}

// Submit answers handler
document.getElementById('submitAnswers').addEventListener('click', function() {
    console.log('Submit button clicked.'); // Diagnostic log for debugging
    const quizContainer = document.getElementById('quizContainer');
    let score = 0;

    // Scoring and highlighting correct answers
    correctAnswers.forEach((correctAnswer, index) => {
        console.log(`Checking answer for question ${index + 1}`); // Diagnostic log for debugging
        const questionInputName = `question${index}`;
        const selectedOption = quizContainer.querySelector(`input[name="${questionInputName}"]:checked`);
        
        // Increment score if selected option matches the correct answer
        if (selectedOption && selectedOption.value === correctAnswer) {
            score++;
        }

        // Highlighting the correct answer for feedback
        const correctOptionLabel = quizContainer.querySelector(`input[name="${questionInputName}"][value="${correctAnswer}"]`).closest('label');
        if (correctOptionLabel) {
            console.log(`Highlighting correct answer for question ${index + 1}`); // Diagnostic log for debugging
            correctOptionLabel.classList.add('highlight-correct');
        }
    });

    // Displaying the score to the user
    const resultDisplay = document.getElementById('result');
    resultDisplay.innerHTML = `You scored ${score} out of ${correctAnswers.length}`;
    resultDisplay.style.display = 'block';
});

// Ensuring the DOM is fully loaded before executing the main function
document.addEventListener("DOMContentLoaded", fetchAndDisplayQuizzes);
