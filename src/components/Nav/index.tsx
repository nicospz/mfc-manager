import { usePathname } from "next/navigation";
import Link from "next/link";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full text-3xl text-slate-100">
      <ul className="flex flex-row justify-center gap-2">
        <li>
          <Link
            href="/"
            className={`${pathname === "/" ? "font-bold" : "font-normal"}`}
          >
            Ordered
          </Link>
        </li>
        <li>
          <Link
            href="/wished"
            className={`${
              pathname === "/wished" ? "font-bold" : "font-normal"
            }`}
          >
            Wished
          </Link>
        </li>
        <li>
          <Link
            href="/owned"
            className={`${pathname === "/owned" ? "font-bold" : "font-normal"}`}
          >
            Owned
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
