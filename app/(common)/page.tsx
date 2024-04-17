import Header from '@/components/Hero/Header';

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-0 items-center">
        <div className="animate-in flex flex-col gap-20 max-w-4xl px-3">
          <Header />
        </div>
        <div className="w-full container relative pt-24">
          <div
            style={{
              background:
                'conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)',
            }}
            className="blur-[160px] opacity-35 w-full h-full absolute inset-0 top-12 pointer-events-none"
          />

          <div className="w-[1370px] max-w-full h-[542px] bg-zinc-900 rounded-lg mx-auto relative z-[1] border border-border"></div>
          {/* <Image
          alt="Project Preview"
          src="/landing-image.webp"
          width={1370}
          height={776}
          priority={true}
          quality={100}
          className="border z-[1] relative border-border rounded-lg mx-auto"
        /> */}
        </div>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
