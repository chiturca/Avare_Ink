import { getDictionary } from "../dictionaries";

export default async function About({ params: { lang } }) {
  const { About } = await getDictionary(lang);
  return <div>{About.title}</div>;
}
