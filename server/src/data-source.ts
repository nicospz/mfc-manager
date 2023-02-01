import 'reflect-metadata';
import type { DataSourceOptions, EntityTarget, Repository } from 'typeorm';
import { DataSource } from 'typeorm';

const devConfig: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.CONFIG_DIRECTORY
    ? `${process.env.CONFIG_DIRECTORY}/db/db.sqlite3`
    : './config/db/db.sqlite3',
  synchronize: false,
  migrationsRun: true,
  logging: false,
  enableWAL: true,
  entities: ['dist/entities/**/*{.js,.ts}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
  subscribers: ['dist/subscribers/**/*{.js,.ts}'],
};

const prodConfig: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.CONFIG_DIRECTORY
    ? `${process.env.CONFIG_DIRECTORY}/db/db.sqlite3`
    : 'config/db/db.sqlite3',
  synchronize: false,
  migrationsRun: true,
  logging: false,
  enableWAL: true,
  entities: ['dist/entities/**/*{.js,.ts}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
  subscribers: ['dist/subscribers/**/*{.js,.ts}'],
};

export const dataSourceConfig =
  process.env.NODE_ENV !== 'production' ? devConfig : prodConfig;

const dataSource = new DataSource(
  process.env.NODE_ENV !== 'production' ? devConfig : prodConfig,
);

export const getRepository = <Entity extends object>(
  target: EntityTarget<Entity>,
): Repository<Entity> => {
  return dataSource.getRepository(target);
};

export default dataSource;
