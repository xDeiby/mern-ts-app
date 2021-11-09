// Components
import HomeRoute from './routes/home.route';
import ExperimentRoute from './routes/experiment.route';
import ExperimentsRoute from './routes/experiments.route';
import ExecutionRoute from './routes/execution.route';

// Librarys
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ExportRoute from './routes/export.route';
import ModifysRouter from './routes/modifys.route';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                {/* Home */}
                <HomeRoute />

                {/* Experiments Management */}
                <ExperimentsRoute />

                {/* Experiment components Manage */}
                <ExperimentRoute />

                {/* Execution Experiment */}
                <ExecutionRoute />

                {/* Simulator modelator */}
                {/* <SimulatorRoute /> */}

                {/* Export of experiments */}
                <ExportRoute />

                {/* Log Changes of experiment */}
                <ModifysRouter />
            </BrowserRouter>
        </div>
    );
}

export default App;
