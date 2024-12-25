# AI Notepad

**To properly setup the project follow instructions written in README files inside both client and server folders.**

## Overview

AI Notepad is a simple web application designed to enhance your note-taking experience. This app allows users to create and manage notes in a traditional manual way, but also by leveraging power of llm agents. Built using React and FastAPI with SQLite.

## Features

- **Account Creation:** Users can create private accounts.
- **Note Management:** Users can create, store, and manage their notes using simple interface.
- **Assistant Interaction:** Manage your notes by chatting with assistant. It is able to convert user input into SQL queries which are then executed.s

## Technologies

- **Frontend:** React.
- **Backend:** FastAPI with SQLite.
- **Multi Agent system:** Pydantic AI with `gemini-1.5-flash` model.

## Getting Started

To get started with AI Notepad, follow these steps:

1. **Clone the Repository:** Clone the project to your local machine using Git.

    ```
    git clone https://github.com/pgrzankowski/ai-notepad.git
    ```

2. **Install Dependencies:** Setup dependencies for both `client` and `server`.

    - ### Client
        To install required node modules go to client directory and execute the following command. If you don't have npm installed follow this tutorial first https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04.

        ```bash
        npm install
        ```

    - ### Server
        To install dependencies create a virtual environment inside server directory:
        ```bash
        python -m venv .venv
        ```
        Then source it:
        ```bash
        source .venv/bin/activate
        ```
        Then install dependencies:
        ```bash
        pip install -r requirements.txt
        ```


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

6. **Security Remarks** Because in this project one of the llm agents has power to execute queries to the database, I've seen some security issues when developing this appliation. Mainly when user runs the prompt which tells agent to alter his user_id theres a chance that model will accept it and query 
notes another or all users. The only solution I can think of at the moment is by rejecting queries with different user_id then this of currently log user.
I will be fixing this problem in the near future.

## License

AI Notepad is released under the MIT License. For more details, see the LICENSE file included with the source code.

Enjoy exploring and enhancing your note-taking experience with AI Notepad!
