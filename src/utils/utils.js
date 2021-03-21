export function getDeepProp(obj, props) {
    return props.split('.').reduce(function (acc, p) {
        if (acc == null) return;
        return acc[p];
    }, obj);
}