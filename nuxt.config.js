require('dotenv').config({path: '../.env'})

const localProxy = () => {

    let proxySettings = {
        "/api": {
            target: "http://localhost:" + process.env.API_PORT,
            pathRewrite: { '^/api' : '' }
        }
    }

    return (process.env.NODE_LOCAL === 'true' ? proxySettings : {})
}

module.exports = {

    /*
    ** Headers of the page
    */
    head: {
        title: 'Consentiful',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'GDPR Consent Made Simple' },

            /**
            * Set Open Graph Tags
            */
            {
                'hid': 'og:title',
                'property': 'og:title',
                'content': 'Consentiful',
                'template': chunk => `${chunk} - GDPR Consent Made Simple` //or as string template: '%s - My page'
            },
            {
                'hid': 'og:url',
                'property': 'og:url',
                'content': '//consentiful.com'
            },
            {
                'hid': 'og:type',
                'property': 'og:type',
                'content': 'application'
            },
            {
                'hid': 'og:image',
                'property': 'og:image',
                'content': '//consentiful.com/img/og-facebook.png-3.png'
            },
            {
                'hid': 'og:description',
                'property': 'og:description',
                'content': 'We help online businesses simplify consent collection without impacting conversion rates, sales, or time spent managing everything. GDPR consent, truly made easy.'
            },
            {
                'hid': 'og:site_name',
                'property': 'og:site_name',
                'content': 'Consentiful | GDPR Consent Made Simple'
            },
            {
                'hid': 'og:locale',
                'property': 'og:locale',
                'content': 'en_US'
            }
        ],

        /**
        * Set Favicons
        */
        link: [
            { rel: 'apple-touch-icon', type: 'image/png', href: '/img/favicons/apple-touch-icon.png', sizes: '180x180' },
            { rel: 'icon', type: 'image/png', href: '/img/favicons/favicon-128x128.png', sizes: '128x128' },
            { rel: 'icon', type: 'image/png', href: '/img/favicons/favicon-64x64.png', sizes: '64x64' },
            { rel: 'icon', type: 'image/png', href: '/img/favicons/favicon-32x32.png', sizes: '32x32' },
            { rel: 'icon', type: 'image/png', href: '/img/favicons/favicon-16x16.png', sizes: '16x16' },
            { rel: 'icon', type: 'image/png', href: '/img/favicons/favicon.png' },
        ]
    },

    /**
    * Stylesheets/CSS
    */
    css: [
        "@/assets/css/main.scss"
    ],

    /*
    ** Progress bar color
    */
    loading: { color: '#c88ce7' },

    /**
    * Define plugins
    */
    plugins: [
        // Our 3rd party  stuff
        { src: '@/plugins/drift.js', ssr: false },
        { src: '@/plugins/ga.js', ssr: false },
        '@/plugins/notifications.js',

        // Our stuff
        "@/plugins/global_components.js", // load global components
        "@/plugins/global_methods.js", // load global methods
        "@/plugins/global_filters.js", // load global filters
        "@/api/init.js",
    ],

    router: {
        middleware: ["auth", "aliases"],
    },

    /*
    ** Modules
    */
    modules: [
        ['@nuxtjs/dotenv', { path: '../', only: [
            'STRIPE_PUBLIC_API_KEY',
            'BASE_URL'
        ] }],
        ["bootstrap-vue/nuxt", { css: false }],
        "@nuxtjs/axios",
        "@nuxtjs/proxy",
        '@nuxtjs/sentry',
    ],

    /*
    ** Proxies
    */
    proxy: {
        ...localProxy(),
    },

    /*
    ** Logger Defaults
    */
    sentry: {
        config: {
            logger: 'nuxt',
            environment: process.env.NODE_ENV,
        }
    },

    /*
    ** Build configuration
    */
    build: {

        /*
        ** Run ESLint on save
        */
        // extend (config, { isDev, isClient }) {
        //     if (isDev && isClient) {
        //         config.module.rules.push({
        //             enforce: 'pre',
        //             test: /\.(js|vue)$/,
        //             loader: 'eslint-loader',
        //             exclude: /(node_modules)/
        //         })
        //     }
        // }
    }
}
