export type Question = {
  id: string;
  content: string;
  author: string;
  likes: number;
  eventId: string;
  socketId: string;
  isAnswered: boolean;
};

export interface ClientToServerEvents {
  joinEvent: (eventId: string) => void;
  newQuestion: (question: Question) => void;
  likeQuestion: (data: { eventId: string; questionId: string }) => void;
  deleteQuestion: (data: { eventId: string; questionId: string }) => void;
}

export interface ServerToClientEvents {
  questions: (questions: Question[]) => void;
  newQuestion: (question: Question) => void;
  deleteQuestion: (data: { eventId: string; questionId: string }) => void;  // <-- corrigé ici
  likeQuestion: (id: string) => void;
  assignedUsername: (username: string) => void;
}

////events 
export interface Event {
  id: string;
  name: string;
  date: string;
  questions: Record<string, Question>;
}

export const ListEvents: Event[] = [
  {
    id: "event1",
    name: "Conférence IA",
    date: "2025-06-01",
    questions: {},
  },
  {
    id: "event2",
    name: "Web Dev Meetup",
    date: "2025-07-15",
    questions: {},
  },
  {
    id: "event3",
    name: "Hackathon Sécurité",
    date: "2025-08-20",
    questions: {},
  },
];
