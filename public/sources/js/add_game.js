// Ensure the Firestore database instance is available as `db`
// This line should already be in your firebase_config.js or similar file, make sure it's included in your HTML before this script
// const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Materialize components, if any specific initialization needed

  document.getElementById('addQuestion').addEventListener('click', addQuestion);

  document.getElementById('addGameForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    await submitForm(); // Make sure to await the async function
    redirectTo('../../ShowQuestions/showquestions.html');
  });
});


function redirectTo(url) {
  window.location.href = url;
}

function addQuestion() {
  const questionsDiv = document.getElementById('questions');
  const questionNumber = questionsDiv.children.length + 1;

  const newQuestionDiv = document.createElement('div');
  newQuestionDiv.classList.add('question');
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
  M.FormSelect.init(newQuestionDiv.querySelector('select'));
}

async function submitForm() {
  const quizName = document.getElementById('quizname').value;
  let questions = [];

  document.querySelectorAll('.question').forEach((questionDiv, index) => {
    const questionText = document.getElementById(`question${index + 1}`).value;
    const options = {
      option1: document.getElementById(`option1${index + 1}`).value,
      option2: document.getElementById(`option2${index + 1}`).value,
      option3: document.getElementById(`option3${index + 1}`).value,
      option4: document.getElementById(`option4${index + 1}`).value,
    };
    const correctAnswerSelect = document.getElementById(`correctAnswer${index + 1}`);
    const correctAnswer = correctAnswerSelect.options[correctAnswerSelect.selectedIndex].value;

    questions.push({
      questionText,
      options,
      correctAnswer,
    });
  });

  try {
    const docRef = await addDoc(collection(db, 'games'), {
      quizname: quizName,
      questions: questions,
    });
    console.log('Document written with ID: ', docRef.id);
    window.location.href = 'showquestions.html'; // Redirect after successful submission
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}