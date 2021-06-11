# Running Postgres Database
Currently I am running postgres using docker. Make sure you have Docker and docker-compose to run the database.

Use the command
```
docker-compose up -d
```
Once the database is running in docker execute to the container and run psql.
```
docker exec -it <container_id> bash
```

Connect to Postgres:
```
psql --host=database --username=unicorn_user --dbname=my_ads
```
The password is `magical_password`. Once in the database run the `structure.sql` file to add tables and populate some tables.