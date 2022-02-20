import PlaylistCard from "./PlaylistCard";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Playlist } from "@prisma/client";

const ContextMenu = ({ playlists, tracks }: any): JSX.Element => {
  return (
    <>
      <div className="w-full">
        <div className="border-2 border-200 border-round p-3">
          <span className="font-bold">Overview</span>
          <div className="flex justify-content-between">
            <span>Playlists</span>
            <span>{playlists.length}</span>
          </div>
          {/* <div className="flex justify-content-between">
            <span>Songs</span>
            <span>{tracks.length}</span>
          </div> */}
          <div className="flex flex-grow text-sm">
            <Link href="/">
              <a className="flex ml-auto align-items-center font-bold">
                View more <ArrowSmRightIcon width="1.6rem" />
              </a>
            </Link>
          </div>
        </div>
        {playlists.sort((a: Playlist, b: Playlist) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((playlist: any) => (
          <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
            <a>
              <PlaylistCard playlist={playlist} tracks={tracks}/>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ContextMenu;
