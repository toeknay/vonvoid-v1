import api from "~/api";

import * as types from "~/store/mutation_types";

// Base state
// const baseState =

export const state = () => ({
    account: null,
    domains: null,
    consentItems: null,
    usage: null
});


export const getters = {
    // subscription: state => state.subscription
};

export const mutations = {
    [types.SET_ACCOUNT](store, data) {
        store.account = data;
    },
    [types.SET_USAGE](store, data) {
        store.usage = data;
    },

    [types.SET_DOMAINS](store, data) {
        store.domains = data;
    },
    [types.DELETE_DOMAIN](store, data) {
        // Remove the domain from the store
        let removeIndex = store.domains.map(item => item.id).indexOf(data.id);
        store.domains.splice(removeIndex, 1);
    },
    [types.ADD_DOMAIN](store, data) {
        store.domains.push(data);
    },

    [types.SET_CONSENTITEMS](store, data) {
        store.consentItems = data;
    },
    [types.DELETE_CONSENTITEM](store, data) {
        // Remove the consentItems from the store
        let removeIndex = store.consentItems.map(item => item.id).indexOf(data.id);
        store.consentItems.splice(removeIndex, 1);
    },
    [types.ADD_CONSENTITEM](store, data) {
        store.consentItems.push(data);
    },
    [types.PATCH_CONSENTITEM](store, data) {
        store.consentItems = store.consentItems.reduce((arr, item) => {
            arr.push(item.id == data.id ? data : item)
            return arr
        }, [])
    },

    [types.DECREMENT_CONTACTCOUNT](store) {
        if(store.usage)
            store.usage.contact_count = store.usage.contact_count - 1;
    },

    [types.RESET_ACCOUNT](store) {
        store.account = null;
        store.domains = null;
        store.consentItems = null;
        store.usage = null;
    },
};

export const actions = {

    /**
     * Fetch domains and consentItems for the current account
     * @return {object}       server response object
     */
    fetch ({ commit }) {
        return api.settings.get()
            .then(response => {
                commit(types.SET_DOMAINS, response.data.domains);
                commit(types.SET_CONSENTITEMS, response.data.consentItems);
                return response;
            });
    },

    /**
     * Update the account-level settings
     * @return {object}       server response object
     */
    update ({ commit }, data ) {
        return api.settings.update(data)
            .then(response => {
                commit(types.SET_ACCOUNT, response.data.account);
                return response;
            });
    },

    /**
     * Remove a domain from an account
     * @return {object}       server response object
     */
    removeDomain ({ commit }, data ) {
        return api.settings.domain.delete(data)
            .then(response => {
                commit(types.DELETE_DOMAIN, data);
                return response;
            });
    },

    /**
     * Create a new domain for an account
     * @return {object}       server response object
     */
    addDomain ({ commit }, data ) {
        return api.settings.domain.add(data)
            .then(response => {
                commit(types.ADD_DOMAIN, response.data.domain);
                return response;
            });
    },

    /**
     * Updates the Zap webhook settings
     * @return {object}       server response object
     */
    zapier ({ commit }, data ) {
        return api.integrations.update(data)
            .then(response => {
                commit(types.SET_ACCOUNT, response.data.account);
                return response;
            });
    },

    /**
     * Remove a consentItem from an account
     * @return {object}       server response object
     */
    deleteConsentItem ({ commit }, data ) {
        return api.settings.consentItem.delete(data)
            .then(response => {
                commit(types.DELETE_CONSENTITEM, data);
                return response;
            });
    },

    /**
     * Creates a new account consentItem
     * @return {object}       server response object
     */
    addConsentItem ({ commit }, data ) {
        return api.settings.consentItem.add(data)
            .then(response => {
                commit(types.ADD_CONSENTITEM, response.data.consentItem);
                return response;
            });
    },

    /**
     * Updates an account consentItem
     * @return {object}       server response object
     */
    updateConsentItem ({ commit }, data ) {
        return api.settings.consentItem.update(data)
            .then(response => {
                commit(types.PATCH_CONSENTITEM, response.data.consentItem);
                return response;
            });
    },


};
