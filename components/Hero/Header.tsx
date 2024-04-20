"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShareNowButton } from "./share-now-button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    color: "#ffffff",
    transition: {
      duration: 2,
    },
  },
  shown: {
    color: "unset",
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 500,
  },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <section className="py-8 pt-24">
        <h1 className="sr-only">Where sharing meets simplicity</h1>

        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="shown"
          onEnded={() => {}}
          style={{
            background:
              "linear-gradient(to left bottom, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0.38)) text",
          }}
          className="text-5xl lg:text-6xl !leading-tight mx-auto max-w-xl text-center"
        >
          <motion.span variants={wordVariants} className="inline-block">
            Where{" "}
          </motion.span>
          <motion.span
            variants={wordVariants}
            className="font-bold inline-block pl-2.5"
          >
            {" "}
            sharing
          </motion.span>{" "}
          <motion.span variants={wordVariants} className="inline-block">
            meets
          </motion.span>
          <motion.span
            variants={wordVariants}
            className="font-bold inline-block pl-2.5"
          >
            {" "}
            simplicity
          </motion.span>
        </motion.p>

        <motion.div
          className="flex flex-col justify-center items-center pt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <ShareNowButton />
          <div className="pt-2">
            <span className="text-sm">or download our </span>
            <Button className="p-0 h-auto" variant="link" asChild>
              <Link href="/download">desktop app</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
