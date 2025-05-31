import { Link } from "react-router-dom";
import { Event } from "../types";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <Link to={`/event/${event.id}/participant`}>
      <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition max-w-md">
        <h2 className="text-xl font-semibold">{event.name}</h2>
      </div>
    </Link>
  );
}
