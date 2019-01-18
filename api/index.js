import axios from "axios";

export default {

    // Authentication
    auth: {
        me: () => axios.get("/api/user"),
        login: (data) => axios.post("/api/login", data),

        // Password Retrieval
        forgot: {
            token: (data) => axios.post("/api/forgot", data),
            validate: (data) => axios.get("/api/forgot/" + data.token),
            update: (data) => axios.post("/api/forgot/" + data.token, data)
        }
    },

    user: {
        signup: (data) => axios.post("/api/user", data),
        update: (data) => axios.put("/api/user", data)
    },

    // Account Setttings
    settings: {
        get: () => axios.get("/api/settings"),
        update: (data) => axios.put("/api/settings", data),

        // Domains
        domain: {
            add: (data) => axios.post("/api/settings/domain", data),
            delete: (data) => axios.delete("/api/settings/domain/" + data.id),
        },

        // Consent Items
        consentItem: {
            add: (data) => axios.post("/api/settings/consentitem", data),
            delete: (data) => axios.delete("/api/settings/consentitem/" + data.id),
            update: (data) => axios.put("/api/settings/consentitem", data),
        }
    },

    // Subscription/Payment
    subscription: {
        mine: () => axios.get("/api/subscription"),
        subscribe: (data) => axios.post("/api/subscription", data),
        unsubscribe: (data) => axios.delete("/api/subscription", data)
    },

    // Contacts
    contacts: {
        get: (pagination) =>
            pagination
            ? axios.get("/api/contacts/" + pagination.page + "/" + pagination.perPage)
            : axios.get("/api/contacts")
    },

    // Single Contact
    contact: {
        get: (data) => axios.get("/api/contact/" + data.id),
        delete: (data) => axios.delete("/api/contact/" + data.id)
    },

    // Integrations
    integrations: {
        update: (data) => axios.put("/api/integrations", data),
    },

    // Analytics
    analytics: {
        stat: (data) => axios.get("/api/data/stat", data),
        chart: (data) => axios.get("/api/data/chart", data)
    }

};
