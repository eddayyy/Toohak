// // firebase_init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

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


// document
//   .getElementById("addGameForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get form data
//     const formData = new FormData(event.target);
//     const url = formData.get("url");
//     const quizName = formData.get("quizname");

//     // Create an array to store questions
//     const questions = [];

//     // Loop through question inputs
//     document.querySelectorAll(".question").forEach((questionDiv) => {
//       const questionNumber = questionDiv.dataset.questionNumber;
//       const questionText = formData.get(`question${questionNumber}`);
//       const option1 = formData.get(`option1${questionNumber}`);
//       const option2 = formData.get(`option2${questionNumber}`);
//       const option3 = formData.get(`option3${questionNumber}`);
//       const option4 = formData.get(`option4${questionNumber}`);
//       const correctAnswer = formData.get(`correctAnswer${questionNumber}`);

//       // Add question data to array
//       questions.push({
//         questionText,
//         options: {
//           option1,
//           option2,
//           option3,
//           option4,
//         },
//         correctAnswer,
//       });


//     });

//     // Create a new document in Firebase Firestore with auto-generated ID
//     try {
//       const docRef = await addDoc(collection(db, "games"), {
//         url: url,
//         quizname: quizName,
//         questions: questions, // Append questions data
//       });
//       console.log("Document written with ID:", docRef.id);

//       // Clear form inputs
//       event.target.reset();
//     } catch (error) {
//       console.error("Error adding document:", error);
//     }
//   });

if (window.location.pathname.endsWith('createquiz.html')) {
  addGameForm();
}
function addGameForm() {


  document
    .getElementById("addGameForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission
      const formData = new FormData(document.getElementById("addGameForm"));
      console.log("Form Data:", formData);

      // Extract URL and quiz name
      const url = formData.get("url");
      const quizName = formData.get("quizname");
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
  const quizContainer = document.getElementById('quizContainer');
  try {
    const querySnapshot = await getDocs(collection(db, 'games'));
    querySnapshot.forEach((doc) => {
      const gameData = doc.data();
      const questions = gameData.questions; // Assuming 'questions' is an array of question objects
      questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
                  <h4>Question ${index + 1}: ${question.questionText}</h4>
                  <div>Options:</div>
                  <ul>
                      ${Object.keys(question.options).map(key => `<li>${question.options[key]}</li>`).join('')}
                  </ul>
                  <div>Correct Answer: ${question.options[question.correctAnswer]}</div>
              `;
        quizContainer.appendChild(questionElement);
      });
    });
  } catch (error) {
    console.error("Error fetching games: ", error);
    quizContainer.innerHTML = `<p>Error loading games.</p>`;
  }

}
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('showquestions.html')) {
    fetchAndDisplayQuizzes();
  }
});

// ////////////////////////////////////////////////////////////////
// ///////////////          REALTIME DB         ///////////////////
// ////////////////////////////////////////////////////////////////

// // <script type="module">
// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// // import {
// //   getDatabase,
// //   ref,
// //   push,
// // } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyCFZZdU6tXJkw0jl0JBlPtXJWVz4R18Bgk",
// //   authDomain: "toohak-a8f56.firebaseapp.com",
// //   databaseURL: "https://toohak-a8f56-default-rtdb.firebaseio.com",
// //   projectId: "toohak-a8f56",
// //   storageBucket: "toohak-a8f56.appspot.com",
// //   messagingSenderId: "897488009404",
// //   appId: "1:897488009404:web:1063307bdc12e4b277f8b9",
// //   measurementId: "G-K22LYRMT3G",
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);

// // // Get a reference to the database service
// // const db = getDatabase(app);

// // // Function to handle form submission
// // document
// //   .getElementById("addGameForm")
// //   .addEventListener("submit", function (event) {
// //     event.preventDefault(); // Prevent default form submission

// //     // Get form data
// //     const urlInput = document.getElementById("url");
// //     const quizNameInput = document.getElementById("quizname");

// //     const url = urlInput.value;
// //     const quizName = quizNameInput.value;

// //     // Write data to Firebase Realtime Database
// //     try {
// //       const gamesRef = ref(db, "games");
// //       push(gamesRef, {
// //         url: url,
// //         quizname: quizName,
// //       });
// //       console.log("Data written to Firebase");

// //       // Clear form inputs
// //       urlInput.value = "";
// //       quizNameInput.value = "";
// //     } catch (error) {
// //       console.error("Error writing to Firebase:", error);
// //     }
// //   });
// // </script>

// ////////////////////////////////////////////////////////////////
// ///////////////          REALTIME DB         ///////////////////
// ////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////
// ///////////////         FIRESTORE DB         ///////////////////
// ////////////////////////////////////////////////////////////////

// // // Using firestore database
// // <script type="module">
// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyCFZZdU6tXJkw0jl0JBlPtXJWVz4R18Bgk",
// //   authDomain: "toohak-a8f56.firebaseapp.com",
// //   databaseURL: "https://toohak-a8f56-default-rtdb.firebaseio.com",
// //   projectId: "toohak-a8f56",
// //   storageBucket: "toohak-a8f56.appspot.com",
// //   messagingSenderId: "897488009404",
// //   appId: "1:897488009404:web:1063307bdc12e4b277f8b9",
// //   measurementId: "G-K22LYRMT3G",
// // };

// // // Initialize Firebase
// // firebase.initializeApp(firebaseConfig);

// // // Get a reference to the Firestore service
// // const db = firebase.firestore();

// // // Function to handle form submission
// // document
// //   .getElementById("addGameForm")
// //   .addEventListener("submit", async function (event) {
// //     event.preventDefault(); // Prevent default form submission

// //     // Get form data
// //     const urlInput = document.getElementById("url");
// //     const quizNameInput = document.getElementById("quizname");

// //     const url = urlInput.value;
// //     const quizName = quizNameInput.value;

// //     // Write data to Firebase Firestore
// //     try {
// //       const docRef = await db.collection("games").add({
// //         url: url,
// //         quizname: quizName,
// //       });
// //       console.log("Document written with ID:", docRef.id);

// //       // Clear form inputs
// //       urlInput.value = "";
// //       quizNameInput.value = "";
// //     } catch (error) {
// //       console.error("Error adding document:", error);
// //     }
// //   });
// // </script>

// ////////////////////////////////////////////////////////////////
// ///////////////         FIRESTORE DB         ///////////////////
// ////////////////////////////////////////////////////////////////
