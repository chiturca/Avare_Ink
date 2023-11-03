import { getDictionary } from "../dictionaries";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("../components/Map/Leaflet"), {
  ssr: false,
});

export default async function Contact({ params: { lang } }) {
  const { Contact } = await getDictionary(lang);
  return (
    <div className="flex flex-wrap flex-col lg:flex-row">
      <NoSSR />
      <div className="w-[30em] lg:ml-4">
        <h1>{Contact.directions}</h1>
      </div>
    </div>
  );
}
