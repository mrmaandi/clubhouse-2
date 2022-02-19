const TopBar = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-wrap align-items-center px-5 h-5rem" style={{ gap: 10 }}>
        <div>
          <h2 className="my-0">Playlists</h2>
        </div>
        <div>
          Searchbox
        </div>
      </div>
    </>
  );
};

export default TopBar;
