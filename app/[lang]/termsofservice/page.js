import { getDictionary } from "../dictionaries";

export default async function TermsOfService({ params: { lang } }) {
  const { Licensing } = await getDictionary(lang);
  return (
    <div>
      <h1>Terms of Service</h1>
      <p>
        By using our website, you agree to comply with and be bound by the
        following terms and conditions of use. If you disagree with any part of
        these terms, please do not use our website.
      </p>
      <h2>User Conduct</h2>
      <ul className="list-disc opacity-50">
        <li>You are solely responsible for your behavior and conduct on our website.</li>
        <li>You must not use our website for any unlawful purposes.</li>
        <li>Abusive, offensive, or harmful behavior towards other users is strictly prohibited.</li>
      </ul>
      <h2>Account Creation and Use</h2>
      <ul className="list-disc opacity-50">
        <li>You must provide accurate information when creating your account.</li>
        <li>Keep your login credentials secure, and do not share your account details with others.</li>
      </ul>
      <h2>Content Ownership and Rights</h2>
      <ul className="list-disc opacity-50">
        <li>You retain ownership of the content you create and share on our website.</li>
        <li>By sharing content on our website, you grant us a non-exclusive, royalty-free, worldwide license to use, display, and distribute that content.</li>
      </ul>
      <h2>Privacy and Data Collection</h2>
      <ul className="list-disc opacity-50">
        <li>Our use of your information is governed by our Privacy Policy.</li>
        <li>We collect and store data about your activity on our website to improve our services.</li>
      </ul>
      <h2>Dispute Resolution</h2>
      <ul className="list-disc opacity-50">
        <li>Any dispute arising from the use of our website will be resolved according to [your dispute resolution process].</li>
      </ul>
      <h2>Termination</h2>
      <ul className="list-disc opacity-50">
        <li>We reserve the right to terminate or suspend your account if you violate our Terms of Service.</li>
        <li>You may also choose to deactivate your account at any time.</li>
      </ul>
    </div>
  );
}
