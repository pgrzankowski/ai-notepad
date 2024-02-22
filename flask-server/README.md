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
SECRET_KEY="Your secret key"
SQLALCHEMY_TRACK_MODIFICATIONS=False
FLASK_APP=run
FLASK_CONFIG=DevConfig
OPENAI_API_KEY="Your openai api key"
```
The secret key can be generated running this line in terminal:

```bash
python -c "import secrets; print(secrets.token_hex(12))"
```

## 4. Create a local database

To create a database go to `flask-server` and run those commands:

```bash
flask db upgrade
```

If you wish to make further changes to database, after making them run:

```bash
flask db migrate -m "Desciption of changes"
flask db upgrade
```