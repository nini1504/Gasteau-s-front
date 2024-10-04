import React, { useState } from 'react';
import Login from './login';
import RegisterClient from './cadastroCli';
import Reservation from './cadastroResv';

function App() {
    const [page, setPage] = useState('login');

    return (
        <div>
            <nav>
                <button onClick={() => setPage('login')}>Login</button>
                <button onClick={() => setPage('register')}>Register Client</button>
                <button onClick={() => setPage('reservation')}>Create Reservation</button>
            </nav>

            {page === 'login' && <Login />}
            {page === 'register' && <RegisterClient />}
            {page === 'reservation' && <Reservation />}
        </div>
    );
}

export default App;
