# BackEnd - Auth DB NoSQL - Store data SQL

An express example application with auth and db.

# How to configure

Insert file `.env` in `src/app/env`.

#### Initial model env:
```env
// External api
EXT_API_LOGIN=
EXT_API_PASS=
EXT_API_URL_BASE=
// Auth
JWT_SECRET=
MAIL_HOST=
MAIL_PASS=
MAIL_PORT=
MAIL_USER=
MONGO_DB=
// Server options
PORT=
```

# Scripts

    npm install     // Install all dependencies 

    npm run dev     // Start dev server

    npm run lint    // Lint check code

    npm run build   // Build project of prod

    npm start       // Run project in prod mode

# Routes

## Auth
    ${SERVER_URL}/${PORT}/auth/register
    ${SERVER_URL}/${PORT}/auth/login
    ${SERVER_URL}/${PORT}/auth/forgot-pass
    ${SERVER_URL}/${PORT}/auth/reset-pass

## SQL API
### AWS MACHINES INTERNAL API
    ${SERVER_URL}/${PORT}/machines/list

# CRON JOBS

    `0 */5 * * * *` 5 in 5 minutes     // Search data from the external server list api, process this data and save it to the bank.

## License

MIT

---

