import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="relative h-15rem">
        <div className="container">
          <p
            className="absolute z-2 bottom-0 mb-5 text-5xl font-semibold"
            style={{ color: "white" }}
          >
            Playlist Title
          </p>
        </div>
        <div
          className="z-1 absolute h-full w-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.6) 140%)",
          }}
        ></div>
        <Image
          src={`/img/kqrgm3h.png`}
          width="100%"
          height="100%"
          layout="fill"
          objectFit="cover"
          alt="cover"
        />
      </div>
      <div className="container">
        <h1>Something coming here</h1>
        <p>Playlist songs etc</p>
      </div>
    </div>
  );
};

export default Home;
