import { getDictionary } from "../dictionaries";

export default async function About({ params: { lang } }) {
  const { About } = await getDictionary(lang);
  return (
    <div>
      <h1>{About.title}</h1>
    </div>
  );
}
