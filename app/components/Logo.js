import Image from "next/image";
// import Avare from "../assets/avareink.svg";
import logo from "../assets/logo2.png";

export default function Logo() {
  return (
    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <a
        className="pointer-events-none flex place-items-center gap-2 p-16 lg:pointer-events-auto lg:p-0"
        href="/"
        rel="noopener noreferrer"
      >
        <div className="relative flex place-items-center before:absolute before:h-[50px] before:w-[50px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[150px] after:w-[150px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <Image
            // className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src={logo}
            alt="AvareInk Logo"
            width={200}
            height={37}
            priority
          />
        </div>
      </a>
    </div>
  );
}
