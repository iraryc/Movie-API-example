# Movies API

This is a Node.js and Express API for managing movies in an Azure SQL Database. The API allows you to retrieve all movies, search movies by title or year, and add new movies.

## Prerequisites

- Node.js installed
- An Azure SQL Database
- An SQL table named `movies` with the following schema:

  
Movies API
This API allows you to interact with a database of movies, providing functionalities to retrieve existing movies and add new ones.

Installation
Clone the Repository:

git clone https://github.com/yourusername/movies-api.git
cd movies-api
Install Dependencies:

npm install
Configuration:

Update the config object in server.js with your Azure SQL Database credentials. Replace the placeholders with your actual values:

JavaScript
const config = {
    user: "your_azure_sql_username", // Update me
    password: "your_azure_sql_password", // Update me
    server: "your_azure_sql_server_name.database.windows.net", // Update me
    database: "your_azure_sql_database_name", // Update me
    options: {
        encrypt: true,
    },
};
Wees voorzichtig met code.
content_copy
Running the Server
Start the server with:

npm start
The server will be accessible at http://localhost:3000.

API Endpoints
1. Get All Movies:

Endpoint: /movies

Method: GET

Description: Retrieves all movies from the database.

Example:

curl http://localhost:3000/movies
2. Get Movies by Title:

Endpoint: /movies/title/:title (Replace :title with the desired movie title)

Method: GET

Description: Retrieves movies matching the specified title (case-sensitive).

Example:

curl http://localhost:3000/movies/title/Inception
3. Get Movies by Year:

Endpoint: /movies/year/:year (Replace :year with the desired year)

Method: GET

Description: Retrieves movies released in the specified year.

Example:

curl http://localhost:3000/movies/year/2004
4. Add a New Movie:

Endpoint: /movies

Method: POST

Description: Adds a new movie to the database. Provide the movie data in JSON format.

Example:

curl -X POST http://localhost:3000/movies -H "Content-Type: application/json" -d '{
    "id": 28,
    "title": "The Adventures of ChatGPT",
    "director": "Your Name",
    "year": 2024,
    "length_minutes": 130
}'
License
This project is licensed under the MIT License.

Additional Notes:

Make sure you have Node.js and npm (or yarn) installed on your system before proceeding.
For security reasons, avoid storing sensitive database credentials directly in your code. Consider using environment variables or a secure configuration management system.
If you encounter any errors during installation or usage, refer to the project's code or consult online resources for troubleshooting.
By following these steps and understanding the API endpoints, you can effectively interact with the Movies API!