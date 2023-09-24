import { getDictionary } from "../dictionaries";

export default async function Profile({ params: { lang } }) {
  const { Profile } = await getDictionary(lang);
  return <div>{Profile.title}</div>;
}
