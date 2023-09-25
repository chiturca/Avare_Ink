import H1 from "../components/ui/H1";
import { getDictionary } from "../dictionaries";

export default async function About({ params: { lang } }) {
  const { About } = await getDictionary(lang);
  return (
    <div>
      <H1 name={About.title} />
    </div>
  );
}
