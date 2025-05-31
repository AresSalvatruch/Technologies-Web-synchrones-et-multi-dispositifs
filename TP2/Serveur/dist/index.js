"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: "http://localhost:5173" },
});
exports.io = io;
const eventQuestions = {
    event1: [],
    event2: [],
    event3: [],
};
let userCounter = 1;
const socketIdToUsername = new Map();
io.on("connection", (socket) => {
    const userName = `user${userCounter++}`;
    socketIdToUsername.set(socket.id, userName);
    console.log(` Client connecté: ${socket.id} | Nom attribué: ${userName}`);
    socket.emit("assignedUsername", userName);
    // Attend que le client rejoigne un événement spécifique
    socket.on("joinEvent", (eventId) => {
        socket.join(eventId);
        console.log(`Socket ${socket.id} rejoint la room ${eventId}`);
        // Envoie les questions spécifiques à cet event au client
        socket.emit("questions", eventQuestions[eventId] || []);
    });
    socket.on("newQuestion", (question) => {
        const eventId = question.eventId;
        if (!eventQuestions[eventId])
            eventQuestions[eventId] = [];
        const questions = eventQuestions[eventId];
        console.log('Sending questions to clients:', questions);
        io.to(eventId).emit('questions', questions);
        eventQuestions[eventId].push(question);
        io.to(eventId).emit("questions", eventQuestions[eventId]);
    });
    // Like question avec eventId
    socket.on("likeQuestion", ({ eventId, questionId }) => {
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
        if (!eventQuestions[eventId])
            return;
        eventQuestions[eventId] = eventQuestions[eventId].filter((q) => q.id !== questionId);
        io.to(eventId).emit("questions", eventQuestions[eventId]);
    });
    socket.on("action", (action) => {
        var _a;
        console.log("Reçu action :", action);
        const eventId = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.eventId;
        if (eventId) {
            io.to(eventId).emit("action", action);
        }
        else {
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
