import { CalendarIcon, MusicNoteIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { Badge } from "primereact/badge";
import React from "react";

const PlaylistCard = (props: { title: string; bg: string }) => {
  return (
    <div className="relative mt-4">
      <p className="absolute z-2 bottom-0 mx-4 mb-3 text-3xl font-semibold" style={{ color: "white" }}>{props.title}</p>
      <div className="absolute z-2 top-0 right-0 mt-3 mx-3">
        <div className="flex flex-column align-items-end" style={{ gap: 8 }}>
          <Badge
            value={
              <span className="flex align-items-center" style={{ gap: 5 }}>
                <CalendarIcon height="1rem" /> 12 Dec 2021
              </span>
            }
            className="bg-white font-normal"
            style={{ color: 'var(--text-primary)' }}
          />
          <Badge
            value={
              <span className="flex align-items-center" style={{ gap: 5 }}>
                <MusicNoteIcon height="1rem" /> 15
              </span>
            }
            className="bg-white font-normal"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>
      </div>
      <div
        className="z-1 absolute h-full w-full border-round"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.6) 140%)",
        }}
      ></div>
      <Image
        src={`/img/${props.bg}`}
        width="100%"
        height="55em"
        layout="responsive"
        objectFit="cover"
        alt="cover"
        className="border-round"
      />
    </div>
  );
};

export default PlaylistCard;
