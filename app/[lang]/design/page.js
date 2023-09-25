import { getDictionary } from "../dictionaries";
import H1 from "../components/ui/H1";

export default async function Design({ params: { lang } }) {
  const { Design } = await getDictionary(lang);
  return (
    <div>
      <H1 name={Design.title} />
    </div>
  );
}
