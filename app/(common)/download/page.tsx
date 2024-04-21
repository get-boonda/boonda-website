"use client";

import { Button } from "@/components/ui/button";
import { FaApple, FaWindows, FaLinux } from "react-icons/fa";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";

export default function DownloadPage() {
  const [scope, animate] = useAnimate();

  function handleHover() {
    animate(scope.current, { filter: "blur(46px)", inset: -4 });
  }

  function handleRemoveHover() {
    animate(scope.current, { filter: "blur(32px)", inter: 0 });
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="py-24">
        <h1 className="text-5xl">
          Get <span className="font-bold inline-block">Boonda</span> on your
          platform
        </h1>
      </div>
      <div className="flex gap-3">
        <Button className="flex justify-center gap-1" size="lg" asChild>
          <Link
            href="https://egadzpihqqykcwdpkjcg.supabase.co/storage/v1/object/public/general-public-files/boonda_universal.dmg"
            download
          >
            <FaApple size={24} /> MacOS
          </Link>
        </Button>
        <Button className="flex gap-3" size="lg" asChild>
          <Link
            href="https://egadzpihqqykcwdpkjcg.supabase.co/storage/v1/object/public/general-public-files/boonda.msi"
            download
          >
            <FaWindows size={24} />
            Windows
          </Link>
        </Button>
        <Button className="flex gap-3" size="lg" asChild>
          <Link
            href="https://github.com/get-boonda/boonda-desktop/releases/download/app-v0.0.1/boonda_0.0.1_amd64.AppImage"
            download
          >
            <FaLinux size={24} />
            Linux
          </Link>
        </Button>
      </div>
      <div className="w-full container relative pt-24 group">
        <div
          style={{
            background:
              "conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)",
          }}
          className="blur-[160px] opacity-35 w-full h-full absolute inset-0 top-12 pointer-events-none"
        />
        <div
          onMouseOver={handleHover}
          onMouseLeave={handleRemoveHover}
          className="rounded-lg relative"
        >
          <motion.div
            ref={scope}
            initial={{
              filter: "blur(28px)",
              opacity: 0.8,
              inset: 0,
            }}
            animate={{
              filter: "blur(36px)",
              opacity: 1,
              repeatCount: Infinity,
            }}
            transition={{
              duration: 2,
              ease: "backOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bg-purple-600/50 blur-xl transition-all rounded-lg opacity-50"
          ></motion.div>
          <motion.video
            initial="shown"
            src="https://egadzpihqqykcwdpkjcg.supabase.co/storage/v1/object/public/general-public-files/desktop_video.mp4"
            width={1370}
            height={776}
            autoPlay
            muted
            loop
            className="border z-[1] bg-zinc-950 relative border-border rounded-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
