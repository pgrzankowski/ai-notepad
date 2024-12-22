# AI Notepad

**To properly setup the project follow instructions written in README files inside both client and server folders.**

## Overview

AI Notepad is a simple web application designed to enhance your note-taking experience. Leveraging the power of modern web technologies, this app allows users to create and manage personal notes securely and interactively. Built using React-Vite for the frontend and FastAPI with SQLite for the backend, AI Notepad offers a simple interface and intuitive usage.

## Features

- **Secure Account Creation:** Users can create private accounts to ensure their notes and conversations are securely stored and accessible only to them.
- **Interactive Note Management:** Create, store, and manage your notes with ease. The intuitive interface makes note-taking and organization simple and effective.
- **Assistant Interaction:** Chat with assistant about your notes insted of scrolling through them trying to find something. This feature uses the local llama3.2 model. It's responses aren't the best but enough to present main idea behind this project.
- **Robust Backend:** The FastAPI backend with SQLite database ensures fast and reliable access to your notes, with secure authentication mechanisms in place to protect your data.

## Technologies

- **Frontend:** The application's frontend is developed using React-Vite, utilizing the latest web development practices for speedy development cycles and optimal performance.
- **Backend:** FastAPI serves as the backend framework, providing a lightweight yet powerful solution for server-side logic and API development. SQLite is used as the database, offering a simple, efficient, and reliable storage solution for user data.
- **Ollama Integration:** The assistant feature is powered by the Ollama llama3.2 local model, enabling frustrating interactions.

## Getting Started

To get started with AI Notepad, follow these steps:

1. **Clone the Repository:** Clone the project to your local machine using Git.

    ```
    git clone https://github.com/pgrzankowski/ai-notepad.git
    ```

2. **Install Dependencies:** To properly setup dependencies for both frontend and backend follow the instructions inside `client` and `server` directories.

3. **Download Ollama Model:** Ensure you have an Ollama and their model downloaded. It can be downloaded from official website: `https://ollama.com/`.

4. **Start the Application:**
    - Launch the frontend application. Go to `client` folder and run:
    
        ```
        npm run dev
        ```
      
    - In a separate terminal go to `server` and start the FastAPI backend:
    
        ```
        fastapi run app.py
        ```

5. **Access the Application:** Open your web browser and navigate to `http://localhost:5173` to start using AI Notepad.

## License

AI Notepad is released under the MIT License. For more details, see the LICENSE file included with the source code.

Enjoy exploring and enhancing your note-taking experience with AI Notepad!
