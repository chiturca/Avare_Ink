import { getDictionary } from "../dictionaries";

export default async function Licensing({ params: { lang } }) {
  const { Licensing } = await getDictionary(lang);
  return <div>{Licensing.title}</div>;
}
