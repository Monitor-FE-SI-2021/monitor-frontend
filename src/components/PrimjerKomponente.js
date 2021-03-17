import { push } from 'connected-react-router';
import { connect } from "react-redux";
import { increment } from "../store/modules/counter";

function PrimjerKomponente({ push, brojac, increment }) {
    return (
        <div className="page primjer-komponente">
            <h1>
                Trenutni broj: {brojac}
            </h1>

            <button style={{ width: 'fit-content' }} onClick={increment}>Povecaj broj</button>
        </div>
    );
}

export default connect(state => ({
    brojac: state.counter.count,
}), { push, increment })(PrimjerKomponente);

