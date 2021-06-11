# Running the API
To run the API make sure you have:
- Python 3.8.7
- Poetry

Install the dependency first using:
```bash
poetry install
```
Once all the dependency are installed run the API using:
```bash
FLASK_APP=advertisements/__init__.py
flask run
```

By default the API will run on the hostname and portname: `http://127.0.0.1:5000`
