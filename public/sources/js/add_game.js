// Ensure the Firestore database instance is available as `db`
// This line should already be in your firebase_config.js or similar file, make sure it's included in your HTML before this script
// const db = firebase.firestore();

import { gameCode } from "./firebase_config.js";

// add_game.js
// add_game.js
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Materialize components, if any specific initialization needed

  document.getElementById("addQuestion").addEventListener("click", addQuestion);

  document.getElementById("addGameForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Assuming submitForm() returns a Promise that resolves when the form submission is successful
    await submitForm();

    // Display the modal with the Firebase URL
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    const urlDisplay = document.getElementById('urlDisplay');
    const copyButton = document.getElementById('copyButton');

    urlDisplay.textContent = gameCode;
    modal.show();

    // Add event listener to the copy button
    copyButton.addEventListener('click', function () {
      // Create a temporary textarea element
      const textarea = document.createElement('textarea');
      textarea.value = gameCode;

      // Append the textarea to the document body
      document.body.appendChild(textarea);

      // Select the URL in the textarea
      textarea.select();

      try {
        // Copy the URL to the clipboard using the Clipboard API
        navigator.clipboard.writeText(gameCode, urlDisplay);
        // Optionally, provide feedback to the user
        alert('URL copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy URL: ', err);
        // Handle error if copying to clipboard fails
      } finally {
        // Remove the textarea from the document body
        document.body.removeChild(textarea);
      }
    });
    closeButton.addEventListener('click', function () {
      // Redirect to index.html
      window.location.href = '../../index.html';
    });
  });
});


function redirectTo(url) {
  window.location.href = url;
}

function addQuestion() {
  const questionsDiv = document.getElementById("questions");
  const questionNumber = questionsDiv.children.length + 1;

  const newQuestionDiv = document.createElement("div");
  newQuestionDiv.classList.add("question");
  newQuestionDiv.dataset.questionNumber = questionNumber;
  newQuestionDiv.innerHTML = `
    <h3>Question ${questionNumber}</h3>
    <label for="question${questionNumber}">Question:</label><br>
    <input type="text" id="question${questionNumber}" name="question${questionNumber}" required><br>

    <label for="option1${questionNumber}">Option 1:</label><br>
    <input type="text" id="option1${questionNumber}" name="option1${questionNumber}" required><br>

    <label for="option2${questionNumber}">Option 2:</label><br>
    <input type="text" id="option2${questionNumber}" name="option2${questionNumber}" required><br>

    <label for="option3${questionNumber}">Option 3:</label><br>
    <input type="text" id="option3${questionNumber}" name="option3${questionNumber}" required><br>

    <label for="option4${questionNumber}">Option 4:</label><br>
    <input type="text" id="option4${questionNumber}" name="option4${questionNumber}" required><br>

    <label for="correctAnswer${questionNumber}">Correct Answer:</label><br>
    <div class="input-field">
      <select id="correctAnswer${questionNumber}" name="correctAnswer${questionNumber}" required>
        <option value="" disabled selected>Choose your option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>
    </div>
  `;

  questionsDiv.appendChild(newQuestionDiv);
  M.FormSelect.init(newQuestionDiv.querySelector("select"));
}

async function submitForm() {
  const quizName = document.getElementById("quizname").value;
  // const url = generateRandomCode();
  let questions = [];

  document.querySelectorAll(".question").forEach((questionDiv, index) => {
    const questionText = document.getElementById(`question${index + 1}`).value;
    const options = {
      option1: document.getElementById(`option1${index + 1}`).value,
      option2: document.getElementById(`option2${index + 1}`).value,
      option3: document.getElementById(`option3${index + 1}`).value,
      option4: document.getElementById(`option4${index + 1}`).value,
    };
    const correctAnswerSelect = document.getElementById(
      `correctAnswer${index + 1}`
    );
    const correctAnswer =
      correctAnswerSelect.options[correctAnswerSelect.selectedIndex].value;

    questions.push({
      questionText,
      options,
      correctAnswer,
    });
  });

  // try {
  //   const docRef = await addDoc(collection(db, 'games'), {
  //     quizname: quizName,
  //     questions: questions,
  //     url: url,
  //   });
  //   console.log('Document written with ID: ', docRef.id);
  //   window.location.href = 'showquestions.html'; // Redirect after successful submission
  // } catch (error) {
  //   console.error('Error adding document: ', error);
  // }
}

// function generateRandomCode() {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let code = '';

//   for (let i = 0; i < 8; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     code += characters.charAt(randomIndex);
//   }

//   return code;
// }

// // Example usage
// const randomCode = generateRandomCode();
// console.log(randomCode); // Output will be a random 8-character code
