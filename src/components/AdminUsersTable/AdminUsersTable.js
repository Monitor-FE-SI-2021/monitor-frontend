import './AdminUsersTable.scss';
import { connect } from "react-redux";
import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
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
                             setUsersSort,
                             fetchAllUsers
                         }) => {

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers, page, perPage, sortField, sortOrder])

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
            name: 'phone',
            title: 'Telefon',
        },
        {
            name: 'groupId',
            title: 'Grupa',
            // slot: 'group',
        },
        {
            name: 'actions',
            title: 'Akcije',
            width: '20%',
            align: 'right',
            slot: 'actions'
        }]
    );

    // const getDevicePath = (groupId,path,groups) =>{
    //     if(!groups.get(groupId).parentGroupId) {
    //         return path.map((item,index) => {
    //             return <span key={index}>{item}</span>
    //         })
    //     }
    //     if(path === ''){
    //         path = [<b>{groups.get(groupId).name}</b>];
    //     } else {
    //         path = [groups.get(groupId).name + ' / ' ,...path];
    //     }
    //     return getDevicePath(groups.get(groupId).parentGroupId,path,groups);
    // }

    // const getGroupArray = groups => {
    //     if(!groups) return [];
    //     let output = [];
    //     if(!groups.parentGroupId){
    //         output = [...output,groups];
    //     }
    //     groups.subGroups.forEach(group => {
    //         output = [...output, group, ...getGroupArray(group)];
    //     })
    //     return output;
    // }


    const editUser = (user) => {
        selectUser(user);
        push(RouteLink.ManageUser);
    }

    // const groupArray = getGroupArray(allGroups);
    // let groupMap = new Map(groupArray.map(group => [group.groupId, group]));

    const handleSort = (field, order) => {
        setUsersSort({ sortField: field, sortOrder: order });
    }

    return (
        <div className='admin-users-table'>
            <CustomTable data={users}
                         async={async}
                         activeSortField={sortField}
                         activeSortOrder={sortOrder}
                         handleSort={handleSort}
                         fields={tableFields}>
                {/* { <TableSlot slot='group' render={user => (
                        <span className="path">
                            {getDevicePath(user.groupId,'',groupMap)}
                        </span>)}/>              } */}
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

    const { users, totalCount, page, perPage, async, sortField, sortOrder } = state.users;

    return {
        allGroups: state.groups.groups,
        users,
        totalCount,
        page,
        perPage,
        async,
        sortField,
        sortOrder
    }
}, { selectUser, push, setUsersPage, setUsersPerPage, fetchAllUsers, setUsersSort })(AdminUsersTable);
