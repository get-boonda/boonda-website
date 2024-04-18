import Header from '@/components/Hero/Header';
import Image from 'next/image';

export default async function Index() {
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
                'conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)',
            }}
            className="blur-[160px] opacity-35 w-full h-full absolute inset-0 top-12 pointer-events-none"
          />

          <div className="rounded-lg relative">
            <div
              style={{
                animationDuration: '20000ms',
                transitionDuration: '2000ms',
              }}
              className="absolute inset-0 bg-purple-600/50 blur-xl transition-all rounded-lg group-hover:blur-3xl animate-pulse opacity-50 group-hover:bg-purple-600/80"
            ></div>
            <Image
              alt="Project Preview"
              src="/landing.png"
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
