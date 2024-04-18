export const DEFAULT_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export const MAX_LOGGED_SIZE_BYTES = 1024 * 1024 * 50;
export const MAX_ANON_SIZE_BYTES = 1024 * 1024 * 30;
export const OG_IMAGE_URL = new URL(
  "https://dagrxagqkexvgylcbiqz.supabase.co/storage/v1/object/public/opengraph/website-og.png"
);
