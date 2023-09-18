import Image from "next/image";
import logo from "../../assets/logo2.png";

export default function Logo() {
  return (
    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <a
        className="pointer-events-none flex place-items-center gap-2 p-16 lg:pointer-events-auto lg:p-0"
        href="/"
        rel="noopener noreferrer"
      >
        <div>
          <Image
            src={logo}
            alt="AvareInk Logo"
            width={100}
            height={100}
            priority
          />
        </div>
      </a>
    </div>
  );
}