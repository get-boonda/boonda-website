import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { UploadButton } from './_components/upload-button';
import { UploadComponent } from './_components/upload-component';

export default async function UploadPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
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
            <UploadComponent />
            {/* <UploadButton /> */}
          </div>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        </div>
      </div>
    </div>
  );
}
