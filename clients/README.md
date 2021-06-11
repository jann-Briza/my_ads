# Running the Client

To run the client install the dependency first using:
```bash
npm install
```
OR
```
yarn install
```
Once its installed start the application using:
```
npm start
```
OR
```
yarn start
```

To make sure we will not encounter a CORS issue since we're running the API and Client with the same origin install:
```
npm i local-cors-proxy
```

Run the cors proxy to proxy the API using
```
lcp --proxyUrl  http://127.0.0.1:5000
```
The URL of the API will be proxied and be `http://localhost:8010/proxy/`