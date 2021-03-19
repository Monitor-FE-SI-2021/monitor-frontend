import { push } from 'connected-react-router';
import { connect } from "react-redux";
import { increment } from "../store/modules/counter";
import CustomTable, { TableSlot } from "./CustomTable/CustomTable";
import { useState } from "react";
import { Delete } from "@material-ui/icons";

// Definicija funkcije uz pobrojavanje svih "props" (parametara) funkcije, u to spadaju dole mapirani propovi (mapState i mapActions)

// proizvoljanParametar je samo primjer navodjenja parametra (prop-a) koji se moze poslati iz parent componente

function PrimjerKomponente({ push, brojac, increment, proizvoljanParametar }) {

    const [tableData, setTableData] = useState([
        {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@doe.com',
            location: {
                city: 'Sarajevo',
                address: 'neka adresa'
            }
        },
        {
            id: 2,
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane@doe.com',
            location: {
                city: 'Mostar',
                address: 'neka adresa'
            }
        }
    ]);

    const deleteTableRow = (tableRow) => {
        console.log(tableRow);
    }

    const [tableFields, setTableFields] = useState([
        {
            name: 'first_name',
            title: 'Ime',
        },
        {
            name: 'last_name',
            title: 'Prezime',
        },
        {
            name: 'email',
            title: 'Email',
        },
        {
            name: 'city',
            title: 'Grad',
            width: '20%',
            accessor: 'location.city',
        },
        {
            name: 'actions',
            title: 'Akcije',
            width: '20%',
            align: 'right',
            slot: 'actions'
        }
    ])

    return (
        <div className="page primjer-komponente">
            <h1>
                Trenutni broj: {brojac}
            </h1>

            <button style={{ width: 'fit-content' }} onClick={increment}>Povecaj broj</button>

            <div style={{ margin: '15px 0' }}>Primjer tabele</div>

            <CustomTable data={tableData} fields={tableFields}>

                <TableSlot slot='actions' render={dataRow => (
                    <Delete onClick={() => deleteTableRow(dataRow)}/>
                )}/>

            </CustomTable>

        </div>
    );
}

// Ovako spajate komponentu na globalni state
export default connect(state => ({
    brojac: state.counter.count,            // Šablon je: proizvoljniAtribut: state.imeReducera.imeStateAtributaUnutarReducera
}), { push, increment })(PrimjerKomponente);

// export default connect(mapStateToProps, mapActionsToProps)(ImeKomponente)

// mapStateToProps (guglajte ovaj termin) = state => ({mapiranje})
// mapActionsToProps (guglajte ovaj termin) = {push, increment, itd...}        Ovdje idu funkcije iz reducera i jos neke kao sto su 'push' koja se veze za routing

