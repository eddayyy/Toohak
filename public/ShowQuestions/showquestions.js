// Import Firebase app and Firestore modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
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

// Global variables
let currentQuestionIndex = 0;
let totalQuestions = 0;
let questions = [];
let score = 0; // Initialize score variable
let userSelections = []; // Array to store user selections for each question
let first_time = true; //first creation instance

async function fetchAndDisplayQuizzes() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get("room");

  if (!encodedData) {
    console.error("No room data provided in the URL.");
    return;
  }

  const quizContainer = document.getElementById("quizContainer");
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "games"), where("url", "==", encodedData))
    );
    querySnapshot.forEach((doc) => {
      const gameData = doc.data();
      questions = gameData.questions; // Store questions data
      totalQuestions = questions.length;

      // Display the first question
      displayCurrentQuestion(0);
    });
  } catch (error) {
    console.error("Error fetching games: ", error);
    quizContainer.innerHTML = `<p>Error loading games.</p>`;
  }
}

function displayCurrentQuestion(index) {
  const question = questions[index];
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML = ""; // Clear previous question content

  const questionElement = document.createElement("div");
  questionElement.classList.add("question");
  questionElement.innerHTML = `
    <h4 class="questionQ">Question ${index + 1}: ${question.questionText}</h4>
    <div>Options:</div>
    <ul class="options">
      ${Object.keys(question.options)
        .map(
          (key) => `
            <li>
              <label>
                <input type="radio" name="question${index}" value="${key}">
                ${question.options[key]}
              </label>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
  quizContainer.appendChild(questionElement);
}

// Function to handle user's selection of an option
function handleOptionSelection(selectedOption) {
  const questionIndex = currentQuestionIndex;
  userSelections[questionIndex] = selectedOption.value; // Record user's selection for the current question
}

function nextQuestion() {
  const selectedOption = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (!selectedOption) {
    alert("Please select an option.");
    return;
  }
  console.log(selectedOption.value);
  console.log("index: " + currentQuestionIndex);
  handleOptionSelection(selectedOption); // Record user's selection
  const selectedAnswer = selectedOption.value;
  if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
    score++; // Increment score if the selected option is correct
  }
  console.log("Current Score: " + score);
  currentQuestionIndex++; // Move to the next question
  if (currentQuestionIndex < totalQuestions ) {
    displayCurrentQuestion(currentQuestionIndex);
    updateButtonVisibility();
  } else {
    //updateButtonVisibility();
    console.log("Final Score:", score); // Log the final score when all questions are answered
    submitAnswers();
  }
}


function updateButtonVisibility() {
  const nextButton = document.getElementById("nextButton");
  const submitButton = document.getElementById("submitAnswers");

  if (currentQuestionIndex < totalQuestions - 1 || first_time) {
    nextButton.style.display = "block"; // Show the Next button
    submitButton.style.display = "none"; // Hide the Submit Answers button
    first_time = false; //we dont need this after the first question
  }
  else {
    // nextButton.style.display = "none"; // Hide the Next button
    // submitButton.style.display = "block"; // Show the Submit Answers button

  }
}

function submitAnswers() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous results

  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML = ""; // Clear previous question content



  // Loop through questions
  for (let i = 0; i < totalQuestions; i++) {


    const question = questions[i];
    const selectedAnswer = userSelections[i];
    const correctAnswer = question.correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;

    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = `
      <h4 class="questionQ">Question ${i + 1}: ${question.questionText}</h4>
      <div>Options:</div>
      <ul class="options">
        ${Object.keys(question.options)
          .map(
            (key) => `
              <li>
                <label class="${
                  isCorrect
                    ? selectedAnswer === key || correctAnswer === key
                      ? "correct_answer_box"
                      : ""
                    : selectedAnswer === key
                    ? "wrong_answer_box"
                    : correctAnswer === key
                    ? "correct_answer_box"
                    : ""
                }">
                  <input type="radio" name="question${i}" value="${key}" ${
              selectedAnswer === key ? "checked" : ""
            } disabled>
                  ${question.options[key]}
                </label>
              </li>
            `
          )
          .join("")}
      </ul>
      <p>Your Answer: ${selectedAnswer}</p>
      <p>Correct Answer: ${correctAnswer}</p>
      <hr>
    `;
    quizContainer.appendChild(questionElement);

    if (isCorrect) {
      score++; // Increment score if the answer is correct
    }
  }

  resultDiv.innerHTML = `Your score is ${score} out of ${totalQuestions}.`;
}


document.getElementById("nextButton").addEventListener("click", nextQuestion);
// Function to handle submitting the answers
document.getElementById("submitAnswers").addEventListener("click", function () {
  submitAnswers();
});

// Ensuring the DOM is fully loaded before executing the main function
document.addEventListener("DOMContentLoaded", fetchAndDisplayQuizzes);
// Ensuring the DOM is fully loaded before executing the main function
document.addEventListener("DOMContentLoaded", fetchAndDisplayQuizzes);

// Ensuring the DOM is fully loaded before executing the main function
document.addEventListener("DOMContentLoaded", fetchAndDisplayQuizzes);

// Ensuring the DOM is fully loaded before executing the main function
document.addEventListener("DOMContentLoaded", updateButtonVisibility); // updates
