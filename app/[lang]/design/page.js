import { getDictionary } from "../dictionaries";

export default async function Design({ params: { lang } }) {
  const { Design } = await getDictionary(lang);
  return <div>{Design.title}</div>;
}
