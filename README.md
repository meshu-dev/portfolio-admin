# Portfolio Admin app

An app used to manage portfolio data.

This is a Nuxt.js project which retrieves and updates data from the Portfolio API.

## Setup

This project requires the portfolio-api app to work.

### Dev Setup

- Install packages

```
npm install
```
-  Copy env file

```
cp .env.example .env.local
```
-  Add API url to the following env variable

```
NUXT_PUBLIC_API_URL
```
-  Run on local

```
npm run dev
```

### Static Site Hosting

- Run the following command to generate static site

```
npm run generate
```
