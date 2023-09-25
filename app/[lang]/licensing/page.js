import { getDictionary } from "../dictionaries";
import H1 from "../components/ui/H1";

export default async function Licensing({ params: { lang } }) {
  const { Licensing } = await getDictionary(lang);
  return (
    <div>
      <H1 name={Licensing.title} />
    </div>
  );
}
