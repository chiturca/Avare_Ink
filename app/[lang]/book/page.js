import Scheduler from "../components/Calendar/Scheduler";
import H1 from "../components/ui/H1";
import { getDictionary } from "../dictionaries";

export default async function Book({ params: { lang } }) {
  const { Book } = await getDictionary(lang);
  return (
    <div className="min-h-screen">
      <H1 name={Book.h2} />
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
