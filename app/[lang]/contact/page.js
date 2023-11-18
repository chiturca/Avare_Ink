import { getDictionary } from "../dictionaries";
import Client from "./Client";

export default async function Contact({ params: { lang } }) {
  const { Contact } = await getDictionary(lang);

  return (
    <div>
      <h1>{Contact.title}</h1>
      <p>
        If you have any request or question, do not hasitate to contact us using
        below form.
      </p>
      <Client />
    </div>
  );
}
