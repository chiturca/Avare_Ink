import { getDictionary } from "../dictionaries";

export default async function PrivacyPolicy({ params: { lang } }) {
  const { PrivacyPolicy } = await getDictionary(lang);
  return (
    <div>
      <h1>{PrivacyPolicy.title}</h1>
      <p>
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and disclose information from and about you when you use
        our website.
      </p>
      <br />
      <h2>Information We Collect</h2>
      <p>
        When you use our website, we may collect and store certain information
        from you. This information includes:
      </p>
      <ul className="list-decimal">
        <li>
          <h4>Google Authentication: </h4>
          <p>
            When you use Google Authentication to log in, we collect basic
            information such as your name and email address from your Google
            account.
          </p>
        </li>
        <li>
          <h4>Google Calendar Integration: </h4>
          <p>
            We use Google Calendar to create and manage appointments and
            reminders. We may access and store data, such as event details, on
            your Google Calendar for the purpose of sending appointment
            reminders.
          </p>
        </li>
      </ul>
      <h2>How We Use Your Information</h2>
      <p>We use the information collected for the following purposes:</p>
      <ul className="list-decimal">
        <li>
          <h4>User Authentication: </h4>
          <p>
            We use your Google account information to verify your identity and
            provide you with access to our website.
          </p>
        </li>
        <li>
          <h4>Appointment Reminders: </h4>
          <p>
            We use your Google Calendar to send appointment reminders. This may
            include creating events and sending notifications to your Google
            Calendar.
          </p>
        </li>
      </ul>
      <br />
      <h3>Disclosure of Your Information</h3>
      <p>
        We do not sell, trade, or otherwise transfer to outside parties your
        personally identifiable information. This does not include trusted third
        parties who assist us in operating our website or conducting our
        business, as long as those parties agree to keep this information
        confidential.
      </p>
      <h3>Access and Control</h3>
      <p>
        You may have control over your data on our website. You can disconnect
        your Google account at any time, which will stop our access to your
        Google Calendar data.
      </p>
      <h3>Third-party Links</h3>
      <p>
        Our website may contain links to third-party websites. Please be aware
        that we are not responsible for the privacy practices of such other
        websites. We encourage our users to be aware when they leave our site
        and to read the privacy statements of each and every website that
        collects personally identifiable information.
      </p>
      <h3>Google&apos;s Privacy Policy</h3>
      <p>
        Our use of Google services, such as Google Authentication and Google
        Calendar, is subject to Google&apos;s Privacy Policy. You can review
        Google&apos;s Privacy Policy{" "}
        <a href="https://policies.google.com/privacy">here</a>.
      </p>
      <h3>Changes to This Privacy Policy</h3>
      <p>
        We reserve the right to make changes to this Privacy Policy. The updated
        policy will be posted on this page with a revised &quot;last
        updated&quot; date.
      </p>
    </div>
  );
}
