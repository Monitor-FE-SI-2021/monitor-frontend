import DeviceTable from '../../DeviceTable/DeviceTable';
import './DeviceSubGroup.scss';


const DeviceSubGroup = ({grupa}) => {



    //Dohvati sve uređaje koji se nalaze u ovoj subgrupi

    //Select * from devices where group.groupid == groupid

    let devicesData = [
        {
            deviceId: 10,
            name: "Uredjaj 10",
            location: 'Sarajevo',
            locationLongitude: 44.13,
            locationLatitude: 18.2,
            status: true,
            lastTimeOnline: Date.now()
        },
        {
            deviceId: 11,
            name: "Uredjaj 20",
            location: 'Sarajevo',
            locationLongitude: 44.13,
            locationLatitude: 18.2,
            status: true,
            lastTimeOnline: Date.now()
        },
        {
            deviceId: 12,
            name: "Uredjaj 30",
            location: 'Sarajevo',
            locationLongitude: 44.13,
            locationLatitude: 18.2,
            status: true,
            lastTimeOnline: Date.now()
        },
    ]

    return (
        <div className="subGroup">
            <h3>{grupa.name}</h3>
            <DeviceTable devices={devicesData} />
        </div>
    ) 
}

export default DeviceSubGroup;