/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AUTH0_SECRET: 'your-auth0-secret',
        AUTH0_BASE_URL: 'https://student-portal.example.com',
        AUTH0_ISSUER_BASE_URL: 'https://your-tenant.auth0.com',
        AUTH0_CLIENT_ID: 'your-student-portal-client-id',
        AUTH0_CLIENT_SECRET: 'your-student-portal-client-secret',
    },
};

module.exports = nextConfig;
