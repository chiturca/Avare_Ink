import { getDictionary } from "../dictionaries";

export default async function Contact({ params: { lang } }) {
  const { Contact } = await getDictionary(lang);
  return (
    <div>
      <h1>{Contact.title}</h1>
      <p>
        If you have any request or question, don not hasitate to contact us
        using below form!
      </p>
      <div>
        <form className="flex flex-col">
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea name="message" placeholder="Your Message" required />
          <input
            type="submit"
            value="Send"
            className="px-7 py-2.5 bg-sky-200 text-sky-900 font-medium text-xl text-shadow-[0 0 50px #bae6fd] 
             rounded-full shadow-md ease-in duration-300 hover:bg-sky-900 hover:text-sky-200 hover:shadow-lg hover:scale-110"
          />
        </form>
      </div>
    </div>
  );
}
