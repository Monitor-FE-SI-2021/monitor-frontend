import DeviceSubGroup from './DeviceSubGroup/DeviceSubGroup';
import './DeviceGroup.scss';
import DeviceTable from '../DeviceTable/DeviceTable';

const DeviceGroup = ({grupa}) => {


    //Uređaji koji nemaju subgrupu
    
    //select * uredjaji where grupaId == grupa.grupaId && grupaParent == grupa.parent
    // && grupa.parent==null

    let devicesData = [
        {
            deviceId: 1,
            name: "Uredjaj 1",
            location: 'Sarajevo',
            locationLongitude: 44.13,
            locationLatitude: 18.2,
            status: true,
            lastTimeOnline: Date.now()
        },
        {
            deviceId: 2,
            name: "Uredjaj 2",
            location: 'Sarajevo',
            locationLongitude: 44.13,
            locationLatitude: 18.2,
            status: true,
            lastTimeOnline: Date.now()
        },
        {
            deviceId: 3,
            name: "Uredjaj 3",
            location: 'Sarajevo',
            locationLongitude: 44.13,
            locationLatitude: 18.2,
            status: true,
            lastTimeOnline: Date.now()
        },

    ]


    //Subgrupe kojima je parentId jednak proslijedjenom groupId

    //Select * from grupe where parentId == grupa.grupaId

    let subGroupsData = [
            {
                grupaid: 4,
                name: "SubGrupa 1",
                parentGroup: grupa.grupaid
            },
            {
                grupaid: 5,
                name: "SubGrupa 2",
                parentGroup: grupa.grupaid
            },
            {
                grupaid: 6,
                name: "SubGrupa 3",
                parentGroup: grupa.grupaid
            }
    ];

    let subGroups = subGroupsData.map(subGrupa => {
        return <DeviceSubGroup grupa={subGrupa} key={subGrupa.grupaid}/>
    });




    return (
        <div className='group'>
            <h2>{grupa.name}</h2>
            <DeviceTable devices={devicesData} />
            {subGroups}
        </div>
    )
}

export default DeviceGroup;