import { getDictionary } from "../dictionaries";

export default async function Aftercare({ params: { lang } }) {
  const { Aftercare } = await getDictionary(lang);
  return <div>{Aftercare.title}</div>;
}
