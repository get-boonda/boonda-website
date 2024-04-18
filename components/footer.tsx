import Link from 'next/link';
import { Button } from './ui/button';
import { GitHub } from './svgs/github';

export function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 text-xs">
      <div className="container gap-8 flex sm:items-center justify-between sm:flex-row flex-col">
        <Button asChild variant="link" className="p-0 h-auto">
          <Link
            href="https://github.com/nicholascostadev/boonda-website"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            <GitHub className="fill-white size-4 mr-2" />
            Boonda App
          </Link>
        </Button>
        <div className="flex md:flex-row flex-col items-center sm:items-end text-center sm:text-right md:items-center justify-end gap-8">
          <Button
            asChild
            variant="link"
            className="p-0 text-xs font-normal h-5"
          >
            <Link className="font-bold hover:underline" href="/more">
              More
            </Link>
          </Button>

          <p>
            Made for{' '}
            <Button asChild variant="link" className="p-0 h-auto">
              <Link
                href="https://supabase.com/blog/supabase-oss-hackathon"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Supabase OSS Hackathon 2024
              </Link>
            </Button>
          </p>

          <p>
            Powered by{' '}
            <Button asChild variant="link" className="p-0 h-auto">
              <Link
                href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Supabase
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </footer>
  );
}
