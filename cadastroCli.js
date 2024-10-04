const apiUrl = 'http://localhost:8080/cadastro'; // Endpoint de cadastro de cliente

async function registerClient(clientData) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'), // JWT para autenticação, se necessário
            },
            body: JSON.stringify(clientData),
        });

        if (!response.ok) {
            throw new Error('Failed to register client');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering client:', error);
        return null;
    }
}

export default registerClient;
