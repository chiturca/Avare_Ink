import Scheduler from "../components/Calendar/Scheduler";
import { getDictionary } from "../dictionaries";

export default async function Book({ params: { lang } }) {
  const { Book } = await getDictionary(lang);
  return (
    <div className="min-h-screen">
      <h1>{Book.h2}</h1>
      <p className="text-center mb-4">
        {Book.p1}
        <br />
        {Book.p2}
      </p>
      <div className="min-h-screen">
        <Scheduler />
      </div>
    </div>
  );
}
