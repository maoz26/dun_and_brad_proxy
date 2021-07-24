import './App.css';
import PageBodyHello from "./pages/ResultPage";
import PageBodyBye from "./pages/PageBodyBye";

const App = () => {
    return <div className="app">
        <PageBodyHello/>
        <PageBodyBye/>
    </div>;
}

export default App;
