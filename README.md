# Where'dItGo? - Personal Finance OS

Where'dItGo? is a full-stack MERN application designed to be a central dashboard for all your personal finances. It provides a clean, at-a-glance overview of your accounts, transactions, and financial goals, helping you track your spending and manage your money effectively.

## Core Features

*   **Secure User Authentication:** JWT-based authentication ensures that each user's financial data is kept private and secure.
*   **Account Aggregation:** Add and track balances for all your financial accounts, including bank accounts, savings, and payment platforms.
*   **Transaction Management:** Log income and expenses, categorize them, and see them reflected in your account balances instantly.
*   **Financial Summary:** A high-level overview of your total balance, monthly income, and monthly expenses.
*   **(In Progress) Full CRUD Functionality:** The application is built with a modular structure to easily support full Create, Read, Update, and Delete operations for all financial modules.

## Tech Stack

This project is built on the MERN stack with a few other key libraries to enhance functionality.

#### Backend:
*   **Node.js:** JavaScript runtime environment
*   **Express.js:** Web framework for building the API
*   **MongoDB:** NoSQL database for storing all user data
*   **Mongoose:** ODM for modeling and interacting with MongoDB data
*   **JSON Web Token (JWT):** For secure user authentication
*   **bcrypt.js:** For hashing user passwords

#### Frontend:
*   **React.js:** Library for building the user interface
*   **React Router:** For client-side routing
*   **Styled Components:** For component-level CSS styling
*   **Axios:** For making API requests to the backend
*   **React Toastify:** For user-friendly notifications

## Getting Started

Follow these instructions to get a local copy of the project up and running on your machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. You will also need a MongoDB database instance. You can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/whereditgo.git
    cd whereditgo
    ```

2.  **Install Backend Dependencies:**
    Navigate to the `server` directory and install the required npm packages.
    ```sh
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    From the root directory, navigate to the `client` directory and install its packages.
    ```sh
    cd ../client
    npm install
    ```

4.  **Set Up Environment Variables:**
    The backend requires a few environment variables to connect to the database and manage authentication. Create a file named `.env` in the `server` directory and add the following:

    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key_for_jwt
    ```
    *   Replace `your_mongodb_connection_string` with your actual connection string from MongoDB Atlas.
    *   Replace `your_super_secret_key_for_jwt` with any long, random string.

### Running the Application

You will need two separate terminals to run the backend and frontend servers concurrently.

1.  **Run the Backend Server:**
    In a terminal at the `server` directory:
    ```sh
    npm run server
    ```
    The API server should start running on `http://localhost:5000`.

2.  **Run the Frontend Client:**
    In a second terminal at the `client` directory:
    ```sh
    npm start
    ```
    The React development server will start, and the application will open automatically in your browser at `http://localhost:3000`.

You should now be able to register a new user, log in, and use the application!

## API Endpoints

The backend Express server exposes the following API endpoints. All routes (except for login/register) are protected and require a valid JWT token.

*   `POST /api/users/register` - Register a new user
*   `POST /api/users/login` - Log in a user and get a token
*   `GET /api/accounts` - Get all accounts for the logged-in user
*   `POST /api/accounts` - Add a new account
*   `GET /api/transactions` - Get all transactions for the user
*   `POST /api/transactions` - Add a new transaction
*   `DELETE /api/transactions/:id` - Delete a transaction

*(...and so on for other modules like goals, loans, etc.)*
