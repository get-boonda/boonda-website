"use client";

import Header from "@/components/Hero/Header";
import Image from "next/image";
import { Variants, motion, useAnimate } from "framer-motion";

const MotionImage = motion(Image);

const containerVariants: Variants = {
  hidden: {
    scale: 1,
    y: 0,
  },
  shown: {
    scale: [1, 0.94, 0.94, 1],
    y: 0,
    transition: {
      duration: 4.5,
      ease: "backOut",
    },
  },
};

export default function Index() {
  const [scope, animate] = useAnimate();

  function handleHover() {
    animate(scope.current, { filter: "blur(46px)", inset: -4 });
  }

  function handleRemoveHover() {
    animate(scope.current, { filter: "blur(32px)", inter: 0 });
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-0 items-center">
        <div className="animate-in flex flex-col gap-20 max-w-4xl px-3">
          <Header />
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
            className="rounded-lg relative"
            onMouseOver={handleHover}
            onMouseLeave={handleRemoveHover}
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
            <MotionImage
              variants={containerVariants}
              initial="hidden"
              animate="shown"
              alt="Project Preview"
              src="/landing.png"
              transition={{
                scale: { duration: 0.5 },
                rotateX: { duration: 2 },
              }}
              width={1370}
              height={776}
              priority={true}
              quality={100}
              className="border z-[1] bg-zinc-950 relative border-border rounded-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
