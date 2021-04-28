import './AdminUsersTable.scss';
import { connect } from "react-redux";
import { Edit } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import CustomTable, { TableSlot } from "../CustomTable/CustomTable";
import {
    fetchAllUsers,
    selectUser,
    setUsersPage,
    setUsersPerPage,
    setUsersSort
} from "../../store/modules/users/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import CustomPagination from "../CustomTable/components/CustomPagination";
import { debounce } from "lodash/function";
import { fetchAllGroupsForAdmin } from "../../store/modules/groups/actions";
import request, { roles } from "../../service";

const AdminUsersTable = ({
                             users,
                             selectUser,
                             push,
                             allGroups,
                             page,
                             perPage,
                             totalCount,
                             setUsersPage,
                             setUsersPerPage,
                             async,
                             sortField,
                             sortOrder,
                             searchText,
                             setUsersSort,
                             fetchAllUsers,
                             fetchAllGroupsForAdmin
                         }) => {

    const [allRoles, setAllRoles] = useState([])
    const [rolesAsync, setRolesAsync] = useState(false);

    const fetchData = () => fetchAllUsers();

    const fetchDataDebounced = useCallback(
        debounce(fetchData, 400),
        []
    );

    useEffect(() => {
        fetchAllGroupsForAdmin();

        setRolesAsync(true);
        request(roles + `/GetRoles`, 'GET')
            .then(response => response.data)
            .then(r => {
                setAllRoles(r.data)
            })
            .finally(() => {
                setRolesAsync(false);
            })
    }, [])

    useEffect(() => {
        fetchAllUsers();
    }, [page, perPage, sortField, sortOrder])

    useEffect(() => {
        fetchDataDebounced();
    }, [searchText])

    const [tableFields] = useState([
        {
            name: 'name',
            title: 'Ime',
            sort: true,
        },
        {
            name: 'lastname',
            title: 'Prezime',
            sort: true,
        },
        {
            name: 'email',
            title: 'E-mail',
            sort: true,
        },
        {
            name: 'groupId',
            title: 'Grupa',
            slot: 'group',
        },
        {
            name: 'actions',
            title: 'Akcije',
            width: '20%',
            align: 'right',
            slot: 'actions'
        }]
    );

    // TODO, SIMPLIFY THIS --------------

    const getGroupArray = groups => {
        if (!groups || JSON.stringify(allGroups) === '{}') return [];
        let output = [];
        if (!groups.parentGroupId) {
            output = [...output, groups];
        }
        groups.subGroups.forEach(group => {
            output = [...output, group, ...getGroupArray(group)];
        })
        return output;
    }

    const groupArray = getGroupArray(allGroups);
    let groupMap = new Map(groupArray.map(group => [group.groupId, group]));

    const getUserGroupPath = (groupId, path, groups) => {
        if (!groups.get(groupId)?.parentGroupId && Array.isArray(path)) {
            return path.map((item, index) => {
                return <span key={index}>{item}</span>
            })
        }
        if (path === '') {
            path = [<b>{groups.get(groupId)?.name}</b>];
        } else {
            path = [groups.get(groupId)?.name + ' / ', ...path];
        }
        return getUserGroupPath(groups.get(groupId)?.parentGroupId, path, groups);
    }

    // TODO --------------


    const editUser = (user) => {
        selectUser(user);
        push(RouteLink.ManageUser);
    }

    const handleSort = (field, order) => {
        setUsersSort({ sortField: field, sortOrder: order });
    }

    const getRoleName = (user) => {
        return allRoles.find(r => r.roleId === user.roleId)
    }

    return (
        <div className='admin-users-table'>
            <CustomTable data={users}
                         async={async || rolesAsync}
                         activeSortField={sortField}
                         activeSortOrder={sortOrder}
                         handleSort={handleSort}
                         fields={tableFields}>
                <TableSlot slot='group' render={user => (
                    <span className="path">
                            {getUserGroupPath(user.groupId?.[0] || user.groupId, '', groupMap)}
                        </span>)}/>
                <TableSlot slot='actions' render={dataRow => (
                    <div className='actions'>
                        <Edit className='edit-btn' onClick={() => editUser(dataRow)}/>
                    </div>
                )}/>


            </CustomTable>
            <CustomPagination totalCount={totalCount}
                              page={page}
                              perPage={perPage}
                              handleChangePage={setUsersPage}
                              handleChangePerPage={setUsersPerPage}
            />
        </div>
    )
}
export default connect(state => {

    const { users, totalCount, page, perPage, async, sortField, sortOrder, searchText } = state.users;

    return {
        allGroups: state.groups.groups,
        users,
        totalCount,
        page,
        perPage,
        async,
        sortField,
        sortOrder,
        searchText
    }
}, {
    selectUser,
    push,
    setUsersPage,
    setUsersPerPage,
    fetchAllUsers,
    setUsersSort,
    fetchAllGroupsForAdmin
})(AdminUsersTable);
