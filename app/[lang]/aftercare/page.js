import { getDictionary } from "../dictionaries";

export default async function Aftercare({ params: { lang } }) {
  const { Aftercare } = await getDictionary(lang);
  return (
    <div>
      <h1>{Aftercare.title}</h1>
      <ul className="list-disc m-8">
        <li>
          <p>{Aftercare.li1}</p>
        </li>
        <li>
          <p>{Aftercare.li2}</p>
        </li>
        <li>
          <p>{Aftercare.li3}</p>
        </li>
        <li>
          <p>{Aftercare.li4}</p>
        </li>
        <li>
          <p>{Aftercare.li5}</p>
        </li>
        <li>
          <p>{Aftercare.li6}</p>
        </li>
        <li>
          <p>{Aftercare.li7}</p>
        </li>
        <li>
          <p>{Aftercare.li8}</p>
        </li>
        <li>
          <p>{Aftercare.li9}</p>
        </li>
        <li>
          <p>{Aftercare.li10}</p>
        </li>
        <li>
          <p>{Aftercare.li11}</p>
        </li>
      </ul>
    </div>
  );
}
