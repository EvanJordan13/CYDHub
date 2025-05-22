import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired({
  returnTo: '/api/auth/login',
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/programs/:path*',
    '/assignments/:path*',
    '/materials/:path*',
    '/onboarding/:path*',
    '/feedback/:path*',
  ],
};
