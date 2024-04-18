import { ShareNowButton } from './share-now-button';

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <section className="py-8 pt-24">
        <h1 className="sr-only">Share your files with ease</h1>
        <p
          style={{
            background:
              'linear-gradient(to left bottom, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0.38)) text',
          }}
          className="text-5xl text-transparent lg:text-6xl !leading-tight mx-auto max-w-xl text-center"
        >
          Where
          <span className="font-bold"> sharing</span> meets
          <span className="font-bold"> simplicity</span>
        </p>

        <div className="flex justify-center items-center pt-12">
          <ShareNowButton />
        </div>
      </section>
    </div>
  );
}
