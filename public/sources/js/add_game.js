// // Import Firestore instance from firebase_config.js
// // Import Firestore instance from firebase_config.js
// import { db } from "firebase_config";
// import { collection, addDoc } from "firebase/firestore";

// // Function to handle form submission
// document
//   .getElementById("addGameForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get form data
//     const formData = new FormData(event.target);
//     const url = formData.get("url");
//     const quizName = formData.get("quizname");

//     // Create a new document in Firebase Firestore with auto-generated ID
//     try {
//       const docRef = await addDoc(collection(db, "games"), {
//         url: url,
//         quizname: quizName,
//       });
//       console.log("Document written with ID:", docRef.id);

//       // Clear form inputs
//       event.target.reset();
//     } catch (error) {
//       console.error("Error adding document:", error);
//     }
//   });
