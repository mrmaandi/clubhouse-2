import PlaylistCard from "./PlaylistCard";

const ContextMenu = (): JSX.Element => {
  return (
    <>
      <div className="p-4 w-23rem h-full">
        <div className="border-2 border-200 border-round p-3">
          <span className="font-bold">Overview</span>
          <div className="flex justify-content-between">
            <span>Playlists</span>
            <span>123</span>
          </div>
          <div className="flex justify-content-between">
            <span>Songs</span>
            <span>3456</span>
          </div>
          <span className="font-bold">View more</span>
        </div>
        <PlaylistCard title="Say You" bg="NH7E7Yb.png" />
        <PlaylistCard title="Don't Care Crown" bg="kqrgm3h.png" />
      </div>
    </>
  );
};

export default ContextMenu;
