import { UnlockHigherLimits } from './_components/unlock-higher-limits';
import { UploadComponent } from './_components/upload-component';
import { DEFAULT_URL } from '@/lib/constants';

export const metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: 'Boonda - Upload and Share Files',
  description: 'Upload and share your files with Boonda.',
};

export default async function UploadPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <div className="flex flex-col gap-16 items-center">
          <section className="py-8 pt-24">
            <h1 className="sr-only">Share your files fast with Boonda</h1>
            <p className="text-5xl lg:text-6xl !leading-tight mx-auto max-w-xl text-center">
              Sharing made
              <span className="font-bold"> easy</span>
            </p>

            <div className="flex flex-col justify-center items-center relative pt-12">
              <div className="flex flex-col gap-16">
                <UploadComponent />
                <UnlockHigherLimits />
              </div>
              <div
                style={{
                  background:
                    'conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)',
                }}
                className="blur-[160px] opacity-70 w-full h-full absolute inset-0 pointer-events-none"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
