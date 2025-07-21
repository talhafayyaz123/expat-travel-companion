import { io } from "socket.io-client";

// You may need to update config.SocketUrl to match your backend socket server URL
const SOCKET_URL = "http://localhost:3004";

// Export a single socket instance for use throughout the app
export const socket = io(SOCKET_URL, {
  autoConnect: false, // Connect manually to control when socket connects
  transports: ["websocket"],
});

// Helper to connect with userId (or any identifier) if needed
export function connectSocketWithUserId(userId) {
  if (userId) {
    socket.auth = { userId };
  }
  if (!socket.connected) {
    socket.connect();
  }

   socket.emit("register-user", { userId });
}

// Helper to send regulatory compliance registration event
export function sendRegulatoryCompliance(data) {
  socket.emit("regulatory-compliance-registered", data);
}


// Send a custom notification to a specific user
export function sendNotificationToUser({ to, type }) {
  if (!to) return;
  socket.emit("compliance-status-update", {
    to,
    type
  });
}

