import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between mx-auto max-w-xl px-8 py-12 md:px-6">
      <div className="flex flex-col">
        <Link href="/" className="font-semibold text-neutral-50">
          Javier Lo
        </Link>
        <span className="text-sm text-neutral-400 md:text-base">
          Product Design Lead
        </span>
      </div>
      <nav className="flex gap-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/blog">Writing</Link>
      </nav>
    </header>
  );
};

export default Navbar;
