import Swal from 'sweetalert2'
import { ROLE_ACCESS_LEVELS } from "./consts";

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

export function mergeName(user) {
    if (!user) return '';

    return user.name + ' ' + user.lastName;
}

export function getUserAccessLevel(user) {
    if (!user || !user?.role?.name) {
        return 0;
    }

    return ROLE_ACCESS_LEVELS[user.role.name];
}