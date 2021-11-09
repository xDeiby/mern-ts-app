import * as React from 'react';
import { useParams } from 'react-router';
import Execution from './execution/Execution';
import { LoginExperiment } from './login/LoginExperiment';

export interface IExecutionExperimentProps {}

export function ExecutionExperiment(props: IExecutionExperimentProps) {
    const [isLogged, setIsLogged] = React.useState<boolean>(false);
    const [loginData, setLoginData] = React.useState<{
        idExp: string;
        username: string;
    }>({
        idExp: '',
        username: '',
    });

    const { id } = useParams<{ id: string }>();

    const login = () => setIsLogged(true);

    return isLogged ? (
        <Execution loginData={loginData} />
    ) : (
        <LoginExperiment
            model={id}
            data={loginData}
            setData={setLoginData}
            login={login}
        />
    );
}
