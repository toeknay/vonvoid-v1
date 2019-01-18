import * as types from "~/store/mutation_types";
import cookie from "cookie";
import { setAuthToken, resetAuthToken } from "~/utils/auth";

let initialState = {}

export const state = () => ({})

export const mutations = {
    [types.RESET_STATE](state) {
        state = initialState;
    }
}

export const actions = {

    nuxtServerInit ({ dispatch }, context) {
        return new Promise((resolve, reject) => {
            let cookies = cookie.parse(context.req.headers.cookie || "");
            if (Object.prototype.hasOwnProperty.call(cookies, "x-access-token")) {
                setAuthToken(cookies["x-access-token"]);
                dispatch("user/fetch")
                    .then(result => {
                        resolve(true)
                    })
                    .catch(error => {
                        dispatch("user/reset");
                        resolve(false);
                    });
            } else {
                dispatch("user/reset");
                resolve(false);
            }
        });
    },

    /**
     * Reset all stores/modules to base state
     */
    clearAll ({ dispatch }) {
        return dispatch("user/reset")
                .then(_ => dispatch("account/reset"))
                .then(_ => dispatch("subscription/reset"))
                .catch(err => console.log(err))
    }
};
