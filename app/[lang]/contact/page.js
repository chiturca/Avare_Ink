import { getDictionary } from "../dictionaries";

export default async function Contact({ params: { lang } }) {
  const { Contact } = await getDictionary(lang);
  return (
    <div>
      <h1>{Contact.title}</h1>
    </div>
  );
}
