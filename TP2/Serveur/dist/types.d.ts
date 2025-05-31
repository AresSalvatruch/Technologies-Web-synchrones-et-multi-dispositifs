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
    newQuestion: (question: Question) => void;
    deleteQuestion: (payload: {
        eventId: string;
        questionId: string;
    }) => void;
    likeQuestion: (payload: {
        eventId: string;
        questionId: string;
    }) => void;
    joinEvent: (eventId: string) => void;
    action: (action: any) => void;
}
export interface ServerToClientEvents {
    questions: (questions: Question[]) => void;
    assignedUsername: (username: string) => void;
    action: (action: any) => void;
}
//# sourceMappingURL=types.d.ts.map