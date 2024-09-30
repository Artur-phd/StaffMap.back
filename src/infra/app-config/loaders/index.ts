import { appLoader } from './app.loader';
import { databaseLoader } from './database.loader';

export * from './app.loader';
export * from './database.loader';

export const loaders = [appLoader, databaseLoader]