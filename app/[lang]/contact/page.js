import Map from "../components/Map/Map";
import { getDictionary } from "../dictionaries";

export default async function Contact({ params: { lang } }) {
  const { Contact } = await getDictionary(lang);
  return (
    <div className="flex flex-wrap flex-col lg:flex-row">
      <Map />
      <div className="w-[30em] lg:ml-4">
        <h1>{Contact.directions}</h1>
      </div>
    </div>
  );
}
