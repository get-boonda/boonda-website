import { ShareNowButton } from './share-now-button';

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <section className="py-8 pt-12">
        <h1 className="sr-only">Share your files fast with Boonda</h1>
        <p className="text-5xl lg:text-6xl !leading-tight mx-auto max-w-xl text-center">
          Share your files
          <span className="font-bold"> fast</span> with{' '}
          <span className="font-bold">Boonda</span>
        </p>
      </section>

      <div className="flex justify-center items-center">
        <ShareNowButton />
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
