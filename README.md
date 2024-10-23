# Web Application Setup

This is a web application that uses Vite for development and build processes. Follow the instructions below to set up and run the application locally.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (Node package manager, usually comes with Node.js)

## Getting Started

1. **Clone the Repository**

   Open your terminal and run:

   ```bash
   git clone git@github.com:karzanosman/film-browser.git
   cd film-browser
   ```

2. **Install Dependencies**

   Install the required packages by running:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory of the project and add the following lines:

   ```env
   VITE_API_BASE_URL=https://api.themoviedb.org/3
   VITE_ACCESS_TOKEN=you access token
   ```

   Make sure to replace `VITE_ACCESS_TOKEN` with a valid token if necessary.

4. **Running the Application**

   Start the development server by running:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000` (or the port specified in your Vite config).

5. **Building for Production**

   To create a production build, run:

   ```bash
   npm run build
   ```

6. **Previewing the Build**

   To preview the production build, run:

   ```bash
   npm run preview
   ```

7. **Linting the Code**

   To check the code for any linting issues, run:

   ```bash
   npm run lint
   ```

8. **Running Tests**

   To run the tests, use:

   ```bash
   npm run test
   ```

   To run tests in watch mode, use:

   ```bash
   npm run test:watch
   ```

   To check test coverage, run:

   ```bash
   npm run test:coverage
   ```
