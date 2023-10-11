import { getDictionary } from "../dictionaries";
import H1 from "../components/ui/H1";
import Client from "./Client";

export default async function Profile({ params: { lang } }) {
  const { Profile } = await getDictionary(lang);

  return (
    <div>
      <H1 name={Profile.title} />
      <Client />
    </div>
  );
}
