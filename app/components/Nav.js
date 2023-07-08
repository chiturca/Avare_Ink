import Link from "next/link";

export default function Nav() {
  return (
    <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex">
      <nav className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tattoes">Tattoes</Link>
          </li>
          <li>
            <Link href="/tattoocare">Tattoo Care</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/book">Book</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
