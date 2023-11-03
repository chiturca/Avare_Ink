import { getDictionary } from "../dictionaries";

export default async function Licensing({ params: { lang } }) {
  const { Licensing } = await getDictionary(lang);
  return (
    <div>
      <h1>{Licensing.title}</h1>
    </div>
  );
}
