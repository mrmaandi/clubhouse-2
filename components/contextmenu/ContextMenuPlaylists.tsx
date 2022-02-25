import { ArrowSmRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import PlaylistCard from "./ContextMenuPlaylistCard";

interface ComponentProps {
  playlists: PlaylistExtended;
  tracks?: TrackExtended;
}

const ContextMenuPlaylists = ({ playlists, tracks }: ComponentProps) => {
  return (
    <div>
      <div className="border-round p-3 surface-card shadow-1">
        <div className="flex justify-content-between align-items-center">
          <span className="text-2xl font-bold">Overview</span>
          <span>
            <Link href="/">
              <a className="flex align-self-end align-items-center font-bold text-sm uppercase">
                View more <ArrowSmRightIcon width="1.6rem" />
              </a>
            </Link>
          </span>
        </div>
        <div className="flex text-sm justify-content-between uppercase mt-2">
          <span style={{ backgroundColor: "var(--surface-0)" }}>Playlists</span>
          <span className="font-bold">{playlists.length}</span>
        </div>
      </div>

      <div className="">
        {playlists
          .sort(
            (a: PlaylistExtended, b: PlaylistExtended) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((playlist: PlaylistExtended) => (
            <Link href={`/playlists/${playlist.id}`} key={playlist.id}>
              <a>
                <PlaylistCard playlist={playlist} />
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ContextMenuPlaylists;
