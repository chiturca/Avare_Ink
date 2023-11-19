import Link from "next/link";
import { getDictionary } from "../dictionaries";

export default async function TermsOfService({ params: { lang } }) {
  const { ToS } = await getDictionary(lang);
  return (
    <div>
      <h1>{ToS.title}</h1>
      <div className="w-max">
        <hr />
        <span className="text-sky-500 opacity-50 px-3">
          {ToS.lastUpdated}
          {ToS.lastUpdated1}
        </span>
        <hr />
      </div>
      <p>{ToS.p}</p>
      <h2>{ToS.UserConduct}</h2>
      <ul className="list-disc opacity-50">
        <li>{ToS.UserConduct1}</li>
        <li>{ToS.UserConduct2}</li>
        <li>{ToS.UserConduct3}</li>
      </ul>
      <h2>{ToS.AccountCreation}</h2>
      <ul className="list-disc opacity-50">
        <li>{ToS.AccountCreation1}</li>
        <li>{ToS.AccountCreation2}</li>
      </ul>
      <h2>{ToS.ContentOwnership}</h2>
      <ul className="list-disc opacity-50">
        <li>{ToS.ContentOwnership1}</li>
        <li>{ToS.ContentOwnership2}</li>
      </ul>
      <h2>{ToS.PrivacyDataCollection}</h2>
      <ul className="list-disc opacity-50">
        <li>{ToS.PrivacyDataCollection1}</li>
        <li>{ToS.PrivacyDataCollection2}</li>
      </ul>
      <h2>{ToS.DisputeResolution}</h2>
      <ul className="list-disc opacity-50">
        <li>{ToS.DisputeResolution1}</li>
        <li>
          {ToS.DisputeResolution2}
          <Link href={`/${lang}/contact`}>{ToS.DisputeA}</Link>
        </li>
        <li>{ToS.DisputeResolution3}</li>
      </ul>
      <h2>{ToS.Termination}</h2>
      <ul className="list-disc opacity-50">
        <li>{ToS.Termination1}</li>
        <li>{ToS.Termination2}</li>
      </ul>
    </div>
  );
}
