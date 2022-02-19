const TopBar = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-wrap align-items-center" style={{ gap: 10 }}>
        <div>
          <h1>Playlists</h1>
        </div>
        <div>
          Searchbox
        </div>
      </div>
    </>
  );
};

export default TopBar;
