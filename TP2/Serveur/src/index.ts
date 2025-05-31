import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import {
  Question,
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types";

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: { origin: "http://localhost:5173" },
});

const eventQuestions: Record<string, Question[]> = {
  event1: [],
  event2: [],
  event3: [],
};

let userCounter = 1;
const socketIdToUsername = new Map<string, string>();

io.on("connection", (socket) => {
  const userName = `user${userCounter++}`;
  socketIdToUsername.set(socket.id, userName);

  console.log(` Client connecté: ${socket.id} | Nom attribué: ${userName}`);
  socket.emit("assignedUsername", userName);

  // Attend que le client rejoigne un événement spécifique
  socket.on("joinEvent", (eventId: string) => {
    socket.join(eventId);
    console.log(`Socket ${socket.id} rejoint la room ${eventId}`);

    // Envoie les questions spécifiques à cet event au client
    socket.emit("questions", eventQuestions[eventId] || []);
  });

  socket.on("newQuestion", (question) => {
  const eventId = question.eventId;
  if (!eventQuestions[eventId]) eventQuestions[eventId] = [];
  const questions = eventQuestions[eventId];
  console.log('Sending questions to clients:', questions);
  io.to(eventId).emit('questions', questions);
  eventQuestions[eventId].push(question);
  io.to(eventId).emit("questions", eventQuestions[eventId]);
});

  // Like question avec eventId
  socket.on("likeQuestion", ({ eventId, questionId }: { eventId: string; questionId: string }) => {
    const questions = eventQuestions[eventId];
    if (questions) {
      const q = questions.find(q => q.id === questionId);
      if (q) {
        q.likes++;
        io.to(eventId).emit("questions", questions);
      }
    }
  });

 socket.on("deleteQuestion", ({ eventId, questionId }) => {
  console.log("Suppression reçue:", eventId, questionId); // 

  if (!eventQuestions[eventId]) return;
  eventQuestions[eventId] = eventQuestions[eventId].filter(
    (q) => q.id !== questionId
  );

  io.to(eventId).emit("questions", eventQuestions[eventId]);
});

socket.on("action", (action) => {
  console.log("Reçu action :", action);

  const eventId = action.payload?.eventId;
  if (eventId) {
    io.to(eventId).emit("action", action);
  } else {
    socket.broadcast.emit("action", action);
  }
});



  socket.on("disconnect", () => {
    console.log(` Client déconnecté: ${socket.id} | Nom: ${socketIdToUsername.get(socket.id)}`);
    socketIdToUsername.delete(socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log(" Server listening on http://localhost:3001");
});

export { io };
