import { CalendarIcon, MusicNoteIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "primereact/badge";
import React from "react";
import { AMAZON_URL } from "../pages/_app";

const PlaylistCard = ({ playlist, tracks }: any) => {
  return (
    <div className="relative mt-4">
      <p
        className="absolute z-2 bottom-0 mx-4 mb-3 text-3xl font-semibold"
        style={{ color: "white" }}
      >
        {playlist.name}
      </p>
      <div className="absolute z-2 top-0 right-0 mt-3 mx-3">
        <div className="flex flex-column align-items-end" style={{ gap: 8 }}>
          <Badge
            value={
              <span className="flex align-items-center" style={{ gap: 5 }}>
                <CalendarIcon height="1rem" />
                {format(new Date(playlist.date), "yyyy-MM-dd")}
              </span>
            }
            className="bg-white font-normal"
            style={{ color: "var(--text-color)" }}
          />
          <Badge
            value={
              <span className="flex align-items-center" style={{ gap: 5 }}>
                <MusicNoteIcon height="1rem" /> {playlist._count.tracks}
              </span>
            }
            className="bg-white font-normal"
            style={{ color: "var(--text-color)" }}
          />
        </div>
      </div>
      <div
        className="z-1 absolute h-full w-full border-round shadow-4"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.6) 140%)",
        }}
      ></div>
      <Image
        src={`${AMAZON_URL}/${playlist.sampleflipId}/${playlist.covers[0]?.fileName}`}
        width="100%"
        height="56rem"
        layout="responsive"
        objectFit="cover"
        alt="cover"
        className="border-round"
      />
    </div>
  );
};

export default PlaylistCard;
