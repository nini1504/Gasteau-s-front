const apiUrl = 'http://localhost:8080/reserva'; // Endpoint para criar reserva

async function createReservation(reservationData) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'), // JWT para autenticação
            },
            body: JSON.stringify(reservationData),
        });

        if (!response.ok) {
            throw new Error('Failed to create reservation');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating reservation:', error);
        return null;
    }
}

export default createReservation;
