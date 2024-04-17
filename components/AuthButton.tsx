import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getSessionServer } from '@/shared/get-session';
import { NavbarAuthButton } from './navbar-auth-button';

export default async function AuthButton() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['session'],
    queryFn: getSessionServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavbarAuthButton />
    </HydrationBoundary>
  );
}
