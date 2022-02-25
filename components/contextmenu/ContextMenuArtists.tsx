import Link from "next/link";
import React from "react";

interface ComponentProps {
  artists: UserExtended[];
}

const ContextMenuArtists = ({ artists }: ComponentProps) => {
  return (
    <div>
      <div className="flex flex-column text-lg" style={{ gap: 10 }}>
        {artists
          .sort((a: UserExtended, b: UserExtended) =>
            a.name.localeCompare(b.name)
          )
          .filter((user: UserExtended) => user._count.tracks > 0)
          .map((artist: UserExtended) => (
            <Link href={`/artists/${artist.id}`} key={artist.id}>
              <a>
                <div>
                  {artist.name} ({artist._count.tracks})
                </div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ContextMenuArtists;
