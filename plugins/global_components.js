import Vue from "vue";

// Creates a component name like
// hc-button or hc-list-item from components filename
const getComponentName = (path) => {
    const pathElements = path.split("/");
    let name = pathElements.pop();
    name = name.replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase()
        .slice(0, -4) // remove file extension
        .replace('_', '-') // underscores to dashes for DOM valid markup
    name = `csf-${name}`;

    return name;
};

// require all global components
const req = require.context("@/components/global/", true, /\.vue$/);

const globalComponents = {};
req.keys().forEach(path => {
    const component = req(path);
    const name = getComponentName(path);
    Vue.component(name, component.default);
});

export default (app) => (
    app.globalComponents = () => globalComponents
);
