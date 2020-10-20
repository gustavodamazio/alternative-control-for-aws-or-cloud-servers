module.exports = {
    type: 'sqlite',
    database: './src/database/SQL/database.sqlite',
    migrations: ['./src/database/SQL/migrations/*.ts'],
    entities: ['./src/app/models/entities/*.ts'],
    cli: {
        migrationsDir: './src/database/SQL/migrations'
    }
    //#region PROD CONFIG
    // type: 'sqlite',
    // database: './src/database/SQL/database.sqlite',
    // migrations: ['./dist/database/SQL/migrations/*.js'],
    // entities: ['./dist/app/models/entities/*.js'],
    // cli: {
    //     migrationsDir: './dist/database/SQL/migrations'
    // }
    //#endregion
};
