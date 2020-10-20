import './database/SQL/connection';

import { _env, ENV } from '@env/config-env';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import errorHandler from './errors/handler';
import { authRoutes, machineRoutes } from './routes';
import './cronJobs';

console.info(`Initialize backend server port ${ENV.PORT}`, { env_init: _env.parsed ? true : false, NODE_ENV: process.env.NODE_ENV });

const app = express(); // Instance express app.

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes); // Initialize auth routes.
app.use('/machines', machineRoutes); // Initialize machine internal api router.

app.use(errorHandler); // Error Handler

app.listen(ENV.PORT); // Listen server in specific port
