import './App.css';
import ResultPage from "./pages/ResultPage";
import PageBodyBye from "./pages/PageBodyBye";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const App = () => {
    return <Router>
        <div className="app">
            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/result-page">
                    <ResultPage/>
                </Route>
                <Route path="/bye">
                    <PageBodyBye />
                </Route>
                <Route path="/">
                    <ResultPage/>
                </Route>
            </Switch>
        </div>
    </Router>;
}

export default App;


