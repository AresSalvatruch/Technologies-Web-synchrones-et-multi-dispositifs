import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminView from "../Components/AdminView";
import ParticipantView from "../Components/ParticipantView";
import HomePage from "../Components/HomePage";
import EventPanel from "../Components/EventPanel";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/event/:eventId/participant" element={<ParticipantView />} />
        <Route path="/ParticipantView" element={<ParticipantView />} />

        <Route path="/event/:eventId/admin" element={<AdminView />} />
        <Route path="/admin/:eventId" element={<AdminView />} />
        <Route path="/participant/:eventId" element={<ParticipantView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

