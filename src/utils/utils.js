import Swal from 'sweetalert2'

export function getDeepProp(obj, props) {
    return props.split('.').reduce(function (acc, p) {
        if (acc == null) return;
        return acc[p];
    }, obj);
}

export function showSwalToast(message, type = 'error') {
    return Swal.fire({
        toast: true,
        position: 'top-end',
        timer: 3500,
        title: message,
        icon: type,
        showConfirmButton: false,
    });
}

export function findParentGroup(childGroup, rootGroups) {

    for (const group of rootGroups) {
        if (group.subGroups.find(sg => sg.groupId === childGroup.groupId)) {
            return group;
        }

        return findParentGroup(childGroup, group.subGroups);
    }
}
