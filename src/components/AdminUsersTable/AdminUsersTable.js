import './AdminUsersTable.scss';
import { connect } from "react-redux";
import { Edit } from "@material-ui/icons";
import React, { useState } from "react";
import CustomTable, { TableSlot } from "../CustomTable/CustomTable";
import { selectUser } from "../../store/modules/users/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

const AdminUsersTable = ({users, selectUser, push}) => {

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
            name: 'actions',
            title: 'Akcije',
            width: '20%',
            align: 'right',
            slot: 'actions'
        }]
    );


    return (
        <div className='admin-users-table'>
            <CustomTable data={users}
                         fields={tableFields}>
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
export default connect(state => ({}), {selectUser, push})(AdminUsersTable);
