'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function ShareNowButton() {
  return <ShinyButton />;
}

const MotionLink = motion(Link);

// Credit to: https://www.youtube.com/watch?v=jcpLprT5F0I
const ShinyButton = () => {
  return (
    <MotionLink
      href="/upload"
      initial={{ '--x': '100%', scale: 1 }}
      animate={{ '--x': '-100%' }}
      whileTap={{ scale: 0.97, transition: { duration: 0.5 } }}
      whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0.25,
        type: 'spring',
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: 'spring',
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="px-6 py-2 rounded-md relative radial-gradient"
    >
      <span className="text-neutral-100 tracking-wide font-light h-full w-full block relative linear-mask">
        Start sharing
        <span>
          <ChevronRight className="inline-block ml-2 size-4" />
        </span>
      </span>
      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </MotionLink>
  );
};

export default ShinyButton;
