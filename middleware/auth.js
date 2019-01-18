export default function ({ store, redirect, route }) {

    // Handle redirection based on logged in status
    const userIsLoggedIn = !!store.state.user.isLoggedIn;
    const isPublic = /^\/forgot(\/.*|$)|^\/login(\/|$)|^\/signup(\/|$)|^\/unavailable(\/|$)/.test(route.fullPath);

    if (!userIsLoggedIn && !isPublic) {
        return redirect("/login");
    }
    if (userIsLoggedIn && isPublic) {
        return redirect("/dashboard");
    }

    // Do whatever nothings if we got here
    return Promise.resolve();

}
