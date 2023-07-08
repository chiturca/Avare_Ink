import { CardList } from "./helpers/CardList";
import Card from "./components/Card";
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import img from "./assets/img.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-screen flex-col items-center justify-between p-16">
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex">
        <Nav />
        <Logo />
      </div>

      <div className="pt-32 pb-16 lg:pt-0 lg:pb-0 justify-center">
        <div>
          <Image
            className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] w-full"
            src={img}
            alt="Test"
          />
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left lg:pt-0">
          {CardList.map((item, index) => {
            return (
              <Card
                key={index}
                href={item.href}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
