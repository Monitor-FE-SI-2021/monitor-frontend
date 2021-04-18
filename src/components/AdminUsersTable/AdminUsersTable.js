import './AdminUsersTable.scss';
import { connect } from "react-redux";
import { Edit } from "@material-ui/icons";
import React, { useState } from "react";
import CustomTable, { TableSlot } from "../CustomTable/CustomTable";
import { selectUser } from "../../store/modules/users/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

const AdminUsersTable = ({users, selectUser, push, allGroups}) => {

    const editUser = (user) => {
        selectUser(user);
        push(RouteLink.ManageUser);
    }


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

    
    // const groupArray = getGroupArray(allGroups);
    // let groupMap = new Map(groupArray.map(group => [group.groupId, group]));



    return (
        <div className='admin-users-table'>
            <CustomTable data={users}
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
            {/*
                <CustomPagination totalCount={deviceTable.totalCount}
                                  page={deviceTable.page}
                                  perPage={deviceTable.perPage}
                                  handleChangePage={handleChangePage}
                                  handleChangePerPage={handleChangePerPage}
                /> */}
        </div>
    )
}
export default connect(state => ({allGroups: state.groups.groups,}), {selectUser, push})(AdminUsersTable);
