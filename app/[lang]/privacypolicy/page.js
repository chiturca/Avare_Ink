import { getDictionary } from "../dictionaries";

export default async function PrivacyPolicy({ params: { lang } }) {
  const { PrivacyPolicy } = await getDictionary(lang);
  return (
    <div>
      <h1>{PrivacyPolicy.title}</h1>
      <div className="w-max">
        <hr />
        <span className="text-sky-500 opacity-50 px-3">
          {PrivacyPolicy.lastUpdated}
          {PrivacyPolicy.lastUpdated1}
        </span>
        <hr />
      </div>
      <p>{PrivacyPolicy.p}</p>
      <h2>{PrivacyPolicy.InformationWeCollect}</h2>
      <p>{PrivacyPolicy.p1}</p>
      <ul className="list-decimal ml-8">
        <li>
          <h4>{PrivacyPolicy.GoogleAuthentication}</h4>
          <p>{PrivacyPolicy.p2}</p>
        </li>
        <li>
          <h4>{PrivacyPolicy.GoogleCalendarIntegration}</h4>
          <p>{PrivacyPolicy.p3}</p>
        </li>
      </ul>
      <h2>{PrivacyPolicy.HowWeUseYourInformation}</h2>
      <p>{PrivacyPolicy.p4}</p>
      <ul className="list-decimal ml-8">
        <li>
          <h4>{PrivacyPolicy.UserAuthentication}</h4>
          <p>{PrivacyPolicy.p5}</p>
        </li>
        <li>
          <h4>{PrivacyPolicy.AppointmentReminders}</h4>
          <p>{PrivacyPolicy.p6}</p>
        </li>
      </ul>
      <br />
      <h3>{PrivacyPolicy.DisclosureofYourInformation}</h3>
      <p>{PrivacyPolicy.p7}</p>
      <h3>{PrivacyPolicy.AccessandControl}</h3>
      <p>{PrivacyPolicy.p8}</p>
      <h3>{PrivacyPolicy.ThirdpartyLinks}</h3>
      <p>{PrivacyPolicy.p9}</p>
      <h3>{PrivacyPolicy.GooglePrivacyPolicy}</h3>
      <p>
        {PrivacyPolicy.p10}
        <a href="https://policies.google.com/privacy">{PrivacyPolicy.a}</a>.
      </p>
      <h3>{PrivacyPolicy.Changes}</h3>
      <p>{PrivacyPolicy.p11}</p>
    </div>
  );
}
