import { push } from 'connected-react-router';
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { increment } from "./store/modules/counter";

function App({ push, brojac, increment }) {
    return (
        <div className="App">
            <div>
                <button onClick={() => push('/')}>Idi na home</button>
                <button onClick={() => push('/about-us')}>Idi na about us</button>
            </div>

            <h1>
                Trenutni broj: {brojac}
            </h1>

            <button onClick={increment}>Povecaj broj</button>

            <Route exact path="/" component={() => <h1>Home</h1>}/>
            <Route path="/about-us" component={() => <h1>About</h1>}/>
        </div>
    );
}

export default connect(state => ({
    brojac: state.counterReducer.count,
}), { push, increment })(App);

