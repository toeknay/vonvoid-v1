export default function ({ store, redirect, route }) {

    // First run sub fetch
    return store.dispatch('subscription/fetch').then(function(response) {

        // Handle redirection based on subscription
        const isSubscribed = (response.data.subscription && response.data.subscription.id);
        if (isSubscribed) {
            return redirect("/account");
        } else {
            return Promise.resolve();
        }

    });

}
