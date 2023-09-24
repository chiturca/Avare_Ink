import { getDictionary } from "../dictionaries";

export default async function PrivacyPolicy({ params: { lang } }) {
  const { PrivacyPolicy } = await getDictionary(lang);
  return <div>{PrivacyPolicy.title}</div>;
}
