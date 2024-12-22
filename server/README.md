# Backend

To properly setup the backend, you need to install dependencies. It is prefered to do this in virtual environment. First create venv inside server directory:
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
Finally you can run the server:
```bash
fastapi run app.py
```

