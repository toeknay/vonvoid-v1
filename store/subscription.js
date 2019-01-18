import api from "~/api";

import * as types from "~/store/mutation_types";

// const baseState =

export const state = () => ({
    subscription: null
});

export const getters = {
    subscription: state => state.subscription
};

export const mutations = {
    [types.SET_SUB](store, data) {
        store.subscription = data;
    },
    [types.RESET_SUB](store) {
        store.subscription = null;
    }
};

export const actions = {

    /**
     * Fetch Stripe subscription for current user
     * @return {object}       server response object
     */
    fetch ({ commit }) {
        return api.subscription.mine()
            .then(response => {
                commit(types.SET_SUB, response.data.subscription);
                return response;
            })
            .catch(error => {
                commit(types.RESET_SUB);
                return error;
            });
    },

    /**
     * Saving a new Stripe subscription
     * @param  {object} data     form input data
     * @return {object}          returns server response object
     */
    subscribe({ dispatch, commit }, data) {
        return api.subscription.subscribe(data)
        .then(response => {
            commit(types.SET_SUB, response.data.subscription);
            return response;
        });
    },

    /**
     * Ending current Stripe subscription
     * @param  {object} data     form input data
     * @return {object}          returns server response object
     */
    unsubscribe({ dispatch, commit }, data) {
        return api.subscription.unsubscribe(data)
        .then(response => {
            commit(types.SET_SUB, response.data.subscription);
            return response;
        })
        .catch(error => {
            commit(types.RESET_SUB);
            return error;
        });
    },

    /**
     * Clear store
     */
    reset ({ dispatch, commit }) {
        commit(types.RESET_SUB);
        return Promise.resolve();
    },
};
