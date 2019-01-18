import api from "~/api";
import { setAuthToken, resetAuthToken } from "~/utils/auth";
import cookies from "js-cookie";

import * as types from "~/store/mutation_types";

// Base state to ensure we don't get weird undefineds
// const baseState =

export const state = () => ({
    user: null,
    isLoggedIn: (cookies.get("x-access-token") !== undefined)
});

export const getters = {

};

export const mutations = {
    [types.SET_USER](store, data) {
        store.isLoggedIn = true;
        store.user = data;
    },
    [types.RESET_USER](store) {
        store.isLoggedIn = false,
        store.user = null
    }
};

export const actions = {

    /**
     * Fetch user data using access setAuthToken
     * @return {object}       server response object
     */
    fetch ({ dispatch, commit }) {
        return api.auth.me()
            .then(response => {
                commit(types.SET_USER, response.data.user);
                if (response.data.account) commit('account/' + types.SET_ACCOUNT, response.data.account, { root: true });
                if (response.data.usage) commit('account/' + types.SET_USAGE, response.data.usage, { root: true });
                return response;
            })
            .catch(error => {
                console.log(error);
                dispatch('clearAll', null, {root: true});
                return error;
            });
    },

    /**
     * Login user
     * @param  {object} data     form input data
     * @return {object}          returns server response object
     */
    login ({ dispatch, commit }, data) {
        return api.auth.login(data)
            .then(response => {
                dispatch('setSession', response.data);
                return response;
            });
    },

    /**
     * New account creation
     * @param  {object} data     form input data
     * @return {object}          returns server response object
     */
    signup({ dispatch, commit }, data) {
        return api.user.signup(data)
            .then(response => {
                dispatch('setSession', response.data);
                return response;
            })
    },

    /**
     * Update user account
     * @param  {object} data     form input data
     * @return {object}          returns server response object
     */
    update({ dispatch, commit }, data) {
        return api.user.update(data)
            .then(response => {
                // Update session (which commits account and user objects)
                dispatch('setSession', response.data);
                return response;
            })
    },

    /**
     * Request reset-password token (via email)
     * @param  {object} data     form input data
     * @return {object}          returns server response object
     */
    forgot({ dispatch, commit }, data) {
        return api.auth.forgot.token(data)
    },

    /**
     * Validate reset-password token
     * @param  {object} data     form input data
     * @return {object}          returns server response object
     */
    forgotValidate({ dispatch, commit }, data) {
        return api.auth.forgot.validate(data)
            .then(response => {
                // TODO Make sure success message gets proc'd
                return Promise.resolve();
            })
    },

    /**
     * Validate reset-password token
     * @param  {object} data     form input data
     * @return {object}          returns server response object
     */
    forgotUpdate({ dispatch, commit }, data) {
        return api.auth.forgot.update(data)
            .then(response => {
                dispatch('setSession', response.data);
                return Promise.resolve();
            })
    },

    /**
     * Clear user for logging out or failed token authentication
     */
    reset ({ dispatch, commit }) {
        commit(types.RESET_USER);
        resetAuthToken();
        // BUG: In some cases, this cookie is not truly being removed somehow. It no longer
        // BUG: shows up in the dev console, but still exists using get from the regular
        // BUG: cookie library (not using js-cookie there for some reason).
        cookies.remove("x-access-token", { path: '' });
        return Promise.resolve();
    },

    /**
     * Set user's 'session' - cookie, axios defaults, and store user data
     * @param {object} data   data object from server response
     */
    setSession ({ commit }, data) {
        commit(types.SET_USER, data.user);
        if (data.account) commit('account/' + types.SET_ACCOUNT, data.account, { root: true });
        if (data.usage) commit('account/' + types.SET_USAGE, data.usage, { root: true });

        setAuthToken(data.token);
        cookies.set("x-access-token", data.token, { expires: 7, path: '' }); // TODO: Secure cookie
    }
};
