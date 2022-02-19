import Link from "next/link";

const SideMenu = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-column">
        <h1>CH</h1>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/users">
          <a>Users</a>
        </Link>
      </div>
    </>
  );
};

export default SideMenu;
