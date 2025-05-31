import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../src/types";

console.log("🌐 Création de la connexion socket…");

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

// Récupération du nom utilisateur en localStorage, sinon on attend le serveur
let username = localStorage.getItem("username");

socket.on("connect", () => {
  console.log(" Socket connecté, ID =", socket.id, "Nom utilisateur =", username);
});

// Quand le serveur envoie un nom d'utilisateur assigné, on le stocke s'il n'existe pas déjà
socket.on("assignedUsername", (serverAssignedUsername) => {
  if (!username) {
    username = serverAssignedUsername;
    localStorage.setItem("username", username);
    console.log("💾 Username reçu du serveur et enregistré :", username);
  } else {
    console.log("🔑 Username déjà en localStorage :", username);
  }
});

socket.on("disconnect", (reason) => {
  console.log(" Socket déconnecté, raison =", reason);
});

export default socket;
export { username };
