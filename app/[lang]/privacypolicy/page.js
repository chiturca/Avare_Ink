import { getDictionary } from "../dictionaries";

export default async function PrivacyPolicy({ params: { lang } }) {
  const { PrivacyPolicy } = await getDictionary(lang);
  return (
    <div>
      <h1>{PrivacyPolicy.title}</h1>
    </div>
  );
}
