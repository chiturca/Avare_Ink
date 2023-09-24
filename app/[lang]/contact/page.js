import Map from "../components/Map/Map";
import { getDictionary } from "../dictionaries";

export default async function Contact({ params: { lang } }) {
  const { Contact } = await getDictionary(lang);
  return (
    <div>
      <Map />
      <br />
      {Contact.directions}
    </div>
  );
}
