import Link from "next/link";
import { HomeIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/outline";

const SideMenu = (): JSX.Element => {
  return (
    <div className="flex flex-column w-6rem align-items-center">
      <h1 className="mb-6">CH</h1>
      <div className="flex flex-column" style={{ gap: "1.7em" }}>
        <Link href="/">
          <a>
            <HomeIcon width="1.8rem" />
          </a>
        </Link>
        <Link href="/users">
          <a>
            <UserIcon width="1.8rem" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
