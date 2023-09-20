import Image from "next/image";
import logo from "../../assets/logo2.png";

export default function Logo() {
  return (
    <div className="static bottom-0 left-0 flex lg:h-auto lg:w-auto">
      <a
        className="flex place-items-center gap-2 pointer-events-auto"
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
