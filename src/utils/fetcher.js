const fetcher = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the data.');
        error.info = await response.json();
        error.status = response.status;
        throw error;
    }

    return response.json();
};

export default fetcher;