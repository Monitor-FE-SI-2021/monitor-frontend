import React, {useState} from "react";
import CustomTable, {TableSlot} from "../CustomTable/CustomTable";
import {CastConnected, Edit} from "@material-ui/icons";
import dayjs from "dayjs";


const AdminUsersTable = () => {


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
            slot: true,
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
        <>
        <h1>USERSI ADMINOVI MAJCIN SINE</h1>
        <React.Fragment>
            <CustomTable data={users}
                         async={async}
                         fields={tableFields}
            <TableSlot slot='actions' render={dataRow => (
                <div className='actions'>
                    {canConnectToDevice(dataRow) && (
                        <CastConnected className='connect-btn'
                                       onClick={() => connectDevice(dataRow)}/>
                    )}
                    <Edit className='edit-btn' onClick={() => editDevice(dataRow)}/>
                </div>
            )}/>
            </CustomTable>
        </React.Fragment>
        </>

    )

}

export default AdminUsersTable;
