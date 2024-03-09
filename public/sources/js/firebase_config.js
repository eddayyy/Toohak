// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// import {
//   getDatabase,
//   ref,
//   set,
//   get,
//   child,
// } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCFZZdU6tXJkw0jl0JBlPtXJWVz4R18Bgk",
//   authDomain: "toohak-a8f56.firebaseapp.com",
//   databaseURL: "https://toohak-a8f56-default-rtdb.firebaseio.com",
//   projectId: "toohak-a8f56",
//   storageBucket: "toohak-a8f56.appspot.com",
//   messagingSenderId: "897488009404",
//   appId: "1:897488009404:web:1063307bdc12e4b277f8b9",
//   measurementId: "G-K22LYRMT3G",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// //get ref to database services
// const db = getDatabase(app);

// document.getElementById("addGameForm").addEventListener("click", function (e) {
//   set(ref(db, "test/" + document.getElementById));
// });

////////////////////////////////////////////////////////////////
///////////////          REALTIME DB         ///////////////////
////////////////////////////////////////////////////////////////

// <script type="module">
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   push,
// } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCFZZdU6tXJkw0jl0JBlPtXJWVz4R18Bgk",
//   authDomain: "toohak-a8f56.firebaseapp.com",
//   databaseURL: "https://toohak-a8f56-default-rtdb.firebaseio.com",
//   projectId: "toohak-a8f56",
//   storageBucket: "toohak-a8f56.appspot.com",
//   messagingSenderId: "897488009404",
//   appId: "1:897488009404:web:1063307bdc12e4b277f8b9",
//   measurementId: "G-K22LYRMT3G",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get a reference to the database service
// const db = getDatabase(app);

// // Function to handle form submission
// document
//   .getElementById("addGameForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get form data
//     const urlInput = document.getElementById("url");
//     const quizNameInput = document.getElementById("quizname");

//     const url = urlInput.value;
//     const quizName = quizNameInput.value;

//     // Write data to Firebase Realtime Database
//     try {
//       const gamesRef = ref(db, "games");
//       push(gamesRef, {
//         url: url,
//         quizname: quizName,
//       });
//       console.log("Data written to Firebase");

//       // Clear form inputs
//       urlInput.value = "";
//       quizNameInput.value = "";
//     } catch (error) {
//       console.error("Error writing to Firebase:", error);
//     }
//   });
// </script>

////////////////////////////////////////////////////////////////
///////////////          REALTIME DB         ///////////////////
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
///////////////         FIRESTORE DB         ///////////////////
////////////////////////////////////////////////////////////////

// // Using firestore database
// <script type="module">
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCFZZdU6tXJkw0jl0JBlPtXJWVz4R18Bgk",
//   authDomain: "toohak-a8f56.firebaseapp.com",
//   databaseURL: "https://toohak-a8f56-default-rtdb.firebaseio.com",
//   projectId: "toohak-a8f56",
//   storageBucket: "toohak-a8f56.appspot.com",
//   messagingSenderId: "897488009404",
//   appId: "1:897488009404:web:1063307bdc12e4b277f8b9",
//   measurementId: "G-K22LYRMT3G",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Get a reference to the Firestore service
// const db = firebase.firestore();

// // Function to handle form submission
// document
//   .getElementById("addGameForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get form data
//     const urlInput = document.getElementById("url");
//     const quizNameInput = document.getElementById("quizname");

//     const url = urlInput.value;
//     const quizName = quizNameInput.value;

//     // Write data to Firebase Firestore
//     try {
//       const docRef = await db.collection("games").add({
//         url: url,
//         quizname: quizName,
//       });
//       console.log("Document written with ID:", docRef.id);

//       // Clear form inputs
//       urlInput.value = "";
//       quizNameInput.value = "";
//     } catch (error) {
//       console.error("Error adding document:", error);
//     }
//   });
// </script>

////////////////////////////////////////////////////////////////
///////////////         FIRESTORE DB         ///////////////////
////////////////////////////////////////////////////////////////
