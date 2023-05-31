import io from "socket.io-client";
const socket = io("http://localhost:5000", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiJ9.OQ.Km_f4eZcqT8DVQBeXP0lmow9pKllRheHd2xzOOvJpPE", // Replace with jwt token from local or session storage
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
  console.log("Received mails Count:", message.mails_list.length);
  // Handle received mails
  // Example: Update UI to display received mails
});

socket.on("mailSent", (response) => {
  console.log("Mail sent:", response.message);

  // Handle mail sent response
  // Example: Show success message to the user
});

// Send a mail every 5 seconds
setInterval(() => {
  const mailData = {
    to: "jssdf@example.com", //client 2
    subject: "Hello",
    message: "This is a test email",
    date_time: new Date().toISOString(),

  };
  // Use the userId stored in the variable
  socket.emit("sendMail", mailData );
}, 5000);

// get mails list at the beginning
socket.emit("getMails");