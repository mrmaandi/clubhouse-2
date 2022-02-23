import { PrismaClient } from "@prisma/client";
import type { NextPage } from "next";
import ContextMenu from "../components/ContextMenu";
import Image from "next/image";

const prisma = new PrismaClient();

const Home: NextPage = ({ playlists }: any) => {
  const WelcomeCard = () => (
    <div className="surface-card shadow-1 border-round my-4 py-7 overflow-y-auto">
      <div className="flex flex-column container" style={{ gap: 35 }}>
        <div className="grid" style={{ gap: 25 }}>
          <div className="col">
            <h1 className="my-0">Welcome to the clubhouse</h1>
            <p className="line-height-3 text-justify text-500 text-lg mt-5">
              Hello folks and welcome to the clubhouse! The site has received a
              refresh with new design (unfinished). This is still a
              work in progress though — new features will be added (ex: search,
              dark-mode switch, mobile-friendly design, etc) and any issues will
              be fixed. So please bear with me while these things will be added.
              Any suggestions are also welcome (DM me on Discord: VilleM#6257).
              Also, currently the web layout is not very mobile-friendly.
            </p>
          </div>
          <div className="col relative">
            <Image
              src="/img/undraw_party_re_nmwj.svg"
              layout="fill"
              objectFit="contain"
              alt="cover"
              className="border-round"
            />
          </div>
        </div>
        <div className="grid" style={{ gap: 25 }}>
          <div className="col relative">
            <Image
              src="/img/undraw_compose_music_ovo2.svg"
              layout="fill"
              objectFit="contain"
              alt="cover"
              className="border-round"
            />
          </div>
          <div className="col">
            <h2>Sample Flips</h2>
            <p className="line-height-3 text-justify text-500 text-lg mt-5">
              All the previous sample flips are still here. I&apos;m not sure about
              adding any new sample flip files, since it&apos;s manual labour to
              download files from Discord, upload them to storage and pair them
              to the correct user in the site&apos;s database. It takes time and there are more optimal solutions for the problem.
            </p>
          </div>
        </div>

        <div>
          <h2>About the project</h2>
          <p className="line-height-3 text-justify text-500 text-lg mt-5">
            I kind of needed to overhaul the infrastructure to save on costs and
            I also wanted to move away from pure React and Kotlin and instead
            wanted to learn more about NextJS and wanted to practice web design
            — so this is why it took on this project. Anyway, here will be some
            other texts once the site is completed.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full">
      <div className="w-24rem">
        <ContextMenu playlists={playlists} />
      </div>

      <div className="flex flex-column flex-1">
        <div className="flex flex-column h-screen">
          <div className="flex align-items-end h-1rem pl-2 pr-5">
            <div className="text-4xl font-bold text-primary uppercase">
              {/* <div>
                <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText defaultValue="" placeholder="Search" />
                </span>
              </div> */}
            </div>
          </div>
          <div className="flex flex-column flex-1 pl-2 pt-3 pr-5 overflow-y-auto">
            <WelcomeCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const playlists = await prisma.playlist.findMany({
    include: { covers: true, _count: { select: { tracks: true } } },
  });

  return {
    props: {
      playlists: JSON.parse(JSON.stringify(playlists)),
    },
  };
}

export default Home;
