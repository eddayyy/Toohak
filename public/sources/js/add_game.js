function addQuestion() {
  const questionsDiv = document.getElementById("questions");
  const questionNumber = questionsDiv.children.length + 1;

  const newQuestionDiv = document.createElement("div");
  newQuestionDiv.classList.add("question");
  newQuestionDiv.dataset.questionNumber = questionNumber; // Set question number
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
      <div class="input-field"> <!-- Add input-field class for Materialize.css -->
      <select id="correctAnswer${questionNumber}" name="correctAnswer${questionNumber}" required>
        <option value="" disabled selected>Choose your option</option> <!-- Add this line for Materialize.css -->
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>
    </div>
    `;

  // Initialize Materialize select component
  questionsDiv.appendChild(newQuestionDiv);
  M.FormSelect.init(document.getElementById(`correctAnswer${questionNumber}`)
  );}


// Event listener to add question
document.getElementById("addQuestion").addEventListener("click", addQuestion);
