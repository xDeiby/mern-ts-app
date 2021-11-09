// Components
import DashboardImage from '../../utils/images/dashboard.png';

// Librarys
import React from 'react';
import { useHistory } from 'react-router';
import { Button, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

export default function HomeContent() {
    // History of routes
    const history = useHistory();

    return (
        <div
            style={{
                height: '100vh',
                backgroundImage: `url(${DashboardImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    backgroundColor: `#0000008c`,
                    height: '100%',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    style={{ color: 'white', width: '50%' }}
                    gutterBottom
                >
                   MUSS - Model Understandability Survey System  

                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SettingsIcon />}
                    onClick={() => history.push('/experiments')}
                >
                    Administrar Experimentos
                </Button>
            </div>
            {/* Hero unit */}
        </div>
    );
}
