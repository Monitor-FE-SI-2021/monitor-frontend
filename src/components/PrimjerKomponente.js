import { push } from 'connected-react-router';
import { connect } from "react-redux";
import { increment } from "../store/modules/counter";

// Definicija funkcije uz pobrojavanje svih "props" (parametara) funkcije, u to spadaju dole mapirani propovi (mapState i mapActions)

// proizvoljanParametar je samo primjer navodjenja parametra (prop-a) koji se moze poslati iz parent componente

function PrimjerKomponente({ push, brojac, increment, proizvoljanParametar }) {
    return (
        <div className="page-primjer-komponente">
            <h1>
                Trenutni broj: {brojac}
            </h1>

            <button style={{ width: 'fit-content', padding: '15px', margin: '22px' }} onClick={increment}>Povecaj broj</button>
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

