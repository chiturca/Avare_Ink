import H1 from "../components/ui/H1";
import { getDictionary } from "../dictionaries";

export default async function Aftercare({ params: { lang } }) {
  const { Aftercare } = await getDictionary(lang);
  return (
    <div>
      <H1 name={Aftercare.title} />
    </div>
  );
}
