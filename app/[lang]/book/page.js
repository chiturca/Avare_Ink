import Scheduler from "../components/Calendar/Scheduler";
import { getDictionary } from "../dictionaries";

export default async function Book({ params: { lang } }) {
  const { Book } = await getDictionary(lang);
  return (
    <div className="min-h-screen">
      <h2 className="text-center text-3xl font-bold mb-2">{Book.h2}</h2>
      <p className="text-center mb-4">
        {Book.p1}
        <br />
        {Book.p2}
      </p>
      <div className="mb-64">
        <Scheduler />
      </div>
    </div>
  );
}
