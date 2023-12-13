import { getDictionary } from "../dictionaries";
import DesignSlider from "../components/Slider/DesignSlider";

export default async function Design({ params: { lang } }) {
  const { Design } = await getDictionary(lang);
  return (
    <div>
      <h1>{Design.title}</h1>
      <DesignSlider />
    </div>
  );
}
