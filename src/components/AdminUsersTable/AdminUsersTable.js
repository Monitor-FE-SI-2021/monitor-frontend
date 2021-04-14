import { Edit } from "@material-ui/icons";
import React, { useState } from "react";
import CustomTable, { TableSlot } from "../CustomTable/CustomTable";

const AdminUsersTable = ({users}) => {
    /* const users = [
        {
            name:'Tarik',
            lastname:'Mehulić',
            email:'tmehulic1@etf.unsa.ba',
            phone:'1234566789'   
        },
        {
            name:'Berina',
            lastname:'Suljić',
            email:'bsuljic1@etf.unsa.ba',
            phone:'1234566789' 
        },
        { 
            name:'Lejla',
            lastname:'Mujić',
            email:'lmujic1@etf.unsa.ba',
            phone:'1234566789' 
        }
    ] */

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
        <React.Fragment>
                <CustomTable data={users}
                             fields={tableFields}>
                    <TableSlot slot='actions' render={dataRow => (
                        <div className='actions'>
                           
                            <Edit className='edit-btn' onClick={() => {console.log('Admin useres table actions')}}/>
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
            </React.Fragment>
    )
}

export default AdminUsersTable