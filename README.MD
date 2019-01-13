## Frontend
Based on React + Redux

Scaffolded by *create-react-app*

#### Commands
- Local development ```npm start``` or ```yarn start```

## Backend
Node js server based on `koa` framework with typescript
- ORM - `sequelize` + `sequelize-typescript`

### Run local
1. `cd backend && npm install` Move to backend directory and install project's dependencies
2. `npm run db:sync` Initialize database scheme
3. `npm run dev` Run development server

#### Commands
- Local Development ```npm run dev```

#### Environment variables
Variable | Default | Description
--- | --- | ---
PORT | 8000 | Server port
DB_PORT | 5433 | Postgres port
DB_NAME | tt-as | Database name
DB_USER | postgres | Database user
DB_PASSWORD | 123123 | Database password