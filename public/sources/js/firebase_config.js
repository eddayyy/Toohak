// // firebase_init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let _url = generateRandomCode();

//call only if the hmtl file calling it is createquiz.html
if (window.location.pathname.endsWith("createquiz.html")) {
  addGameForm();
}


document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("showquestions.html")) {
    fetchAndDisplayQuizzes();
  }
});

function addGameForm() {
  document
    .getElementById("addGameForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission
      const formData = new FormData(document.getElementById("addGameForm"));
      console.log("Form Data:", formData);

      // Extract URL and quiz name
      const quizName = formData.get("quizname");
      const url = _url;
      console.log("URL:", url);
      console.log("Quiz Name:", quizName);

      // Create an array to store questions
      const questions = [];

      console.log("Question1:", formData.get("question1"));

      // Loop through question inputs
      document.querySelectorAll(".question").forEach((questionDiv) => {
        const questionNumber = questionDiv.dataset.questionNumber;
        console.log("Question Number:", questionNumber);

        const questionText = formData.get(`question${questionNumber}`);
        const option1 = formData.get(`option1${questionNumber}`);
        const option2 = formData.get(`option2${questionNumber}`);
        const option3 = formData.get(`option3${questionNumber}`);
        const option4 = formData.get(`option4${questionNumber}`);
        const correctAnswer = formData.get(`correctAnswer${questionNumber}`);
        console.log("Question Text:", questionText);
        console.log("Option 1:", option1);
        console.log("Option 2:", option2);
        console.log("Option 3:", option3);
        console.log("Option 4:", option4);
        console.log("Correct Answer:", correctAnswer);

        // Add question data to array
        questions.push({
          questionText,
          options: {
            option1,
            option2,
            option3,
            option4,
          },
          correctAnswer,
        });
      });

      // Create a new document in Firebase Firestore with auto-generated ID
      try {
        const docRef = await addDoc(collection(db, "games"), {
          url: url,
          quizname: quizName,
          questions: questions, // Append questions data
        });
        console.log("Document written with ID:", docRef.id);

        // Clear form inputs
        document.getElementById("addGameForm").reset();
      } catch (error) {
        console.error("Error adding document:", error);
      }
    });
}

async function fetchAndDisplayQuizzes() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get("room");

  if (!encodedData) {
    console.error("No room data provided in the URL.");
    return;
  }

  const quizContainer = document.getElementById("quizContainer");
  try {
    const querySnapshot = await getDocs(query(collection(db, "games"), where("url", "==", encodedData)));
    querySnapshot.forEach((doc) => {
      const gameData = doc.data();
      const questions = gameData.questions; // Assuming 'questions' is an array of question objects
      questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.innerHTML = `
                  <h4>Question ${index + 1}: ${question.questionText}</h4>
                  <div>Options:</div>
                  <ul>
                      ${Object.keys(question.options)
                        .map((key) => `<li>${question.options[key]}</li>`)
                        .join("")}
                  </ul>
                  <div>Correct Answer: ${
                    question.options[question.correctAnswer]
                  }</div>
              `;
        quizContainer.appendChild(questionElement);
      });
    });
  } catch (error) {
    console.error("Error fetching games: ", error);
    quizContainer.innerHTML = `<p>Error loading games.</p>`;
  }
}

function generateRandomCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

// Example usage
const randomCode = generateRandomCode();
//console.log(randomCode); // Output will be a random 8-character code

console.log(_url + " :sending");
export const gameCode = _url;
