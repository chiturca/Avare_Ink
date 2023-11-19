import { getDictionary } from "../dictionaries";
import Client from "./Client";

export default async function Profile({ params: { lang } }) {
  const { Profile } = await getDictionary(lang);

  return (
    <div>
      <h1 className="hidden">{Profile.title}</h1>
      <Client />
    </div>
  );
}
