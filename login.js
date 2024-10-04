const apiUrl = 'http://localhost:8080/login'; // Altere o endpoint conforme necessário

async function login(username, password) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Armazena o token JWT no localStorage
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export default login;
