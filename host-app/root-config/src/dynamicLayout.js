// These helpers adapted from https://github.com/single-spa/single-spa/issues/1054

const appendApp = (key, element) => {
    const defaultRoute = document.createElement('route');
    defaultRoute.setAttribute('default', '');

    const appElement = document.createElement('application');
    appElement.setAttribute('name', key);

    defaultRoute.appendChild(appElement);
    element.appendChild(defaultRoute);
};

const getOrCreateRoute = (parent, attribute) => {
    let element = Array.from(parent.childNodes)
        .filter((node) => node.nodeName === 'ROUTE')
        .find((element) => element.getAttribute('path') === attribute);

    if (!element) {
        element = document.createElement('route');
        element.setAttribute('path', attribute);
        parent.appendChild(element);
    }

    return element;
};

/**
 * Build some routing xml for single-spa-layout
 * @returns {string} xml e.g. '<route path="mfe3"><application name="@oat-sa/mfe3"></application></route>'
 */
export const buildAppRouting = apps => {
    const keys = Object.keys(apps);
    const xml = document.createElement('temp');
    xml.setAttribute('id', 'content-routes');

    keys.forEach(key => {
        const paths = apps[key].routes ? apps[key].routes : [];

        paths.forEach(path => {
            const parts = path.split('/');
            parts.forEach((part, index) => {
                const elements = [xml];
                [...Array(parts.length)].forEach((_, x) => {
                    elements.push(getOrCreateRoute(elements[x], parts[x]));
                });

                if (index === parts.length - 1) {
                    appendApp(key, elements[index + 1]);
                }
            });
        });
    });
    // console.log('xml', xml);

    Array.from(xml.getElementsByTagName('route'))
        .filter(route => route.children.length === 0)
        .forEach(element => element.remove());

    return xml.innerHTML;
};
