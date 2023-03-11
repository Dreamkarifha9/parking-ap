import { v4 } from 'uuid';

export const random = (): string => {
  return v4().toString().replace(/-+/g, '');
};

export * from './clean-objects.helper';
export * from './coordinate.helper';
export * from './csv.helper';
export * from './export.helper';
export * from './log-file.helper';
export * from './typeorm-query.helper';
export * from './export-options';