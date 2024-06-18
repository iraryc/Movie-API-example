async function addMovie(movie) {
    try {
        const response = await fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });

        const responseText = await response.text();
        console.log('Response status:', response.status);
        console.log('Response text:', responseText);

        if (response.ok) {
            const responseData = JSON.parse(responseText);
            console.log('Movie added successfully:', responseData);
        } else {
            console.error('Error adding movie:', responseText);
        }
    } catch (error) {
        console.error('Error adding movie:', error);
    }
}

const movie = {
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
    length_minutes: 148
};

addMovie(movie);
