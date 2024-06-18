Here's a corrected version of the markdown code for better formatting and completeness:

```markdown
# SQLTest

## Overview
SQLTest is a Node.js application that provides a RESTful API to interact with a SQL Server database. This application uses Express.js for handling HTTP requests and `mssql` for database interactions. The app also utilizes environment variables for configuration management.

## Features
- Connect to a SQL Server database.
- Retrieve all movies.
- Retrieve movies by title.
- Retrieve movies by year.
- Add a new movie.

## Prerequisites
- Node.js (>=14.x.x)
- NPM (>=6.x.x)
- SQL Server database

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/sqltest.git
   cd sqltest
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your database configuration:
   ```plaintext
   DB_USER=myusername
   DB_PASSWORD=Yearup2024!
   DB_SERVER=yearup.database.windows.net
   DB_DATABASE=yearupdemo
   ```

4. Start the server:
   ```sh
   npm start
   ```
   The API will be running at `http://localhost:3000`.

## API Endpoints

### Get all movies
- **URL:** `/movies`
- **Method:** `GET`
- **Description:** Retrieves a list of all movies.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Movie Title",
      "director": "Director Name",
      "year": 2020,
      "length_minutes": 120
    }
  ]
  ```

### Get movies by title
- **URL:** `/movies/title/:title`
- **Method:** `GET`
- **Description:** Retrieves movies that match the given title.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Matching Movie Title",
      "director": "Director Name",
      "year": 2020,
      "length_minutes": 120
    }
  ]
  ```

### Get movies by year
- **URL:** `/movies/year/:year`
- **Method:** `GET`
- **Description:** Retrieves movies released in the specified year.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Movie Title",
      "director": "Director Name",
      "year": 2020,
      "length_minutes": 120
    }
  ]
  ```

### Add a new movie
- **URL:** `/movies`
- **Method:** `POST`
- **Description:** Adds a new movie to the database.
- **Request Body:**
  ```json
  {
    "title": "New Movie",
    "director": "Director Name",
    "year": 2020,
    "length_minutes": 120
  }
  ```
- **Response:**
  ```json
  {
    "message": "Movie added successfully"
  }
  ```

## License
This project is licensed under the ISC License - see the LICENSE file for details.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements
- Express.js
- mssql
- dotenv
```

This revision includes proper code block closures, organized section titles, and improved formatting for readability.