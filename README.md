# Description
Simple API

# Features
This API developed with Node js, Typescript, Postgresql, Docker, Prisma, JWT
 
# Tech Used
 ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![AdonisJS](https://img.shields.io/badge/adonisjs-%23220052.svg?style=for-the-badge&logo=adonisjs&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) 
      
# Getting Start:
Before you running the program, make sure you've run this command:
- `npm install`
-  create `.env`
- `docker compose up -d`

### Database setup:
- Create your own database, and put the credential in env file
- Run the migration with `node ace migration:run`

### Run the program
`node ace server --watch`

The program will run on http://localhost:2555



### API Route List
| Method | URL                                      | Description           | 
| ------ | ---------------------------------------- | --------------------- | 
| GET    | localhost:2555/api/categories            | Get All Category      |  
| POST   | localhost:2555/api/categories            | Create Category       | 
| PATCH  | localhost:2555/api/categories/:id        | Update Category       |
| GET    | localhost:2555/api/categories/:id        | Get Category Details  |  
| DELETE | localhost:2555/api/categories/:id        | Delete Category       |  
| GET    | localhost:2555/api/articles              | Get All Articles      |  
| POST   | localhost:2555/api/articles              | Create Articles       |  
| PATCH  | localhost:2555/api/articles/:id          | Update Articles       |  
| GET    | localhost:2555/api/articles/:id          | Get Articles Details  |  
| DELETE | localhost:2555/api/articles/:id          | Delete Articles       | 


      
<!-- </> with 💛 by readMD (https://readmd.itsvg.in) -->
