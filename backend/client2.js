import io from "socket.io-client";
const socket = io("http://localhost:5000", {
  auth: {
    // Replace with jwt token from local or session storage
    token: "eyJhbGciOiJIUzI1NiJ9.MTA.xS23FIoZ5PyjQqo2qPSvPxykbGNCTgHX9XesrAdO2_0", // Replace with jwt token from local or session storage
  },
});

socket.on("connect", () => {
  console.log("Connected to the server");

  // Emit a custom event or perform other actions upon connection
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");

  // Handle disconnect event
});

let userId;

socket.on("userConnected", (data) => {
  console.log("connected with ID:", data.userId);

  // Store the userId in a variable
  userId = data.userId;
});


socket.on("connect_error", (error) => {
  console.log("Connection error:", error.message);

  // Handle connection error due to token authentication failure
});

socket.on("mailReceived", (message) => {
  //log list length
  console.log( message.mails_list);
  // Handle received mails
  // Example: Update UI to display received mails
});

socket.on("mailSent", (response) => {
  console.log("Mail sent:", response.message);

  // Handle mail sent response
  // Example: Show success message to the user
});

// get mails list at the beginning
socket.emit("getMails");
