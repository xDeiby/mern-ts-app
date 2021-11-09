// Components
import Loading from '../../loading';
import Welcome from '../welcome';
import StepperExperiment from '../stepper';
import { ApplicationState } from '../../../store';
import { loadExperimentElementsRequest } from '../../../store/ducks/executionExperiment';

// Librarys
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IExecutionProps {
    loginData: { idExp: string; username: string };
}

export default function Execution({ loginData }: IExecutionProps) {
    const [aceptedTerms, setAceptedTerms] = React.useState<boolean>(false);

    // Store Management
    const dispatch = useDispatch();
    const experiment_elements = useSelector(
        (state: ApplicationState) => state.execution_experiment
    );

    // Effects
    React.useEffect(() => {
        dispatch(loadExperimentElementsRequest(loginData.idExp));
    }, [dispatch, loginData.idExp]);

    // Constants
    const { surveys, quizzes, experiment } = experiment_elements.data;

    return aceptedTerms ? (
        <Loading isLoading={experiment_elements.loading}>
            {/* Forms of Execution Experiment */}
            <StepperExperiment
                username={loginData.username}
                elements={[...surveys, ...quizzes]}
            />
        </Loading>
    ) : (
        <Loading isLoading={experiment_elements.loading}>
            {/* Welcome and Terms and Conditions */}
            <Welcome
                username={loginData.username}
                experiment={experiment}
                setAceptedTerms={() => setAceptedTerms(true)}
            />
        </Loading>
    );
}
