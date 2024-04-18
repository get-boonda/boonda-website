import { DEFAULT_URL } from '@/lib/constants';

export const metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: 'Boonda - Learn more',
  description: 'Learn more about boonda.',
};

export default function More() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="py-6">
        <h1 className="sr-only">Share your files with ease</h1>
        <p className="text-5xl w-full lg:text-6xl !leading-tight mx-auto max-w-xl text-center">
          Nothing to see here
        </p>
        <p className="w-full text-center">Just a file uploader</p>
      </div>

      <div className="container">
        <div className="rounded-lg border border-border overflow-clip">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            allow="autoplay"
            width="100%"
            height="500"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
