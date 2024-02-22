# Backend

To properly setup flask server part of the project follow this steps:

## 1. Create conda environment

Go to flask-server directory and create conda environment.

```bash
conda create --prefix ./env python
conda activate ./env
```


## 2. Install dependencies
After the environment is created install required packages. You can do this runnig following commands:

```bash
conda install pip
pip install -r requirements.txt
```

## 3. Create `.env` file

Inside flask-server directory create `.env` file and fill it using a following template:

```bash
SECRET_KEY=""
SQLALCHEMY_TRACK_MODIFICATIONS=False
FLASK_APP=run
FLASK_CONFIG=DevConfig
OPENAI_API_KEY="Your openai api key"
```

## 4. Create a local database

