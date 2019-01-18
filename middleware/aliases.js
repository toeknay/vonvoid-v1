export default function ({params, route, redirect}) {

    // Paginated routes - redirect to page 1
    const hasPagination = /^\/contacts(\/?$)/gm.test(route.fullPath);
    if(hasPagination) redirect('301',
        route.fullPath + (route.fullPath.slice(-1) == '/' ? '1' : '/1')
    );

    // Send root to /dashboard. auth.js will redirect to /login if needed
    if(route.fullPath == '/') redirect('301', '/dashboard');
}
