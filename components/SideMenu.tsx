import Link from "next/link";
import { HomeIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/outline";

const SideMenu = (): JSX.Element => {
  return (
    <div
      className="flex flex-column w-5rem align-items-center border-round-right shadow-6"
      style={{
        backgroundColor: "var(--primary-color)",
        color: "var(--surface-a)",
      }}
    >
      <div className="flex align-items-center h-6rem">
        <div className="text-sm text-center font-bold">
          <div>CLUB</div>
          <div>HOUSE</div>
        </div>
      </div>

      <div className="flex flex-column mt-3" style={{ gap: "1.7em" }}>
        <Link href="/">
          <a>
            <HomeIcon color="var(--surface-a)" width="1.8rem" />
          </a>
        </Link>
        <Link href="/users">
          <a>
            <UserIcon color="var(--surface-a)" width="1.8rem" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
