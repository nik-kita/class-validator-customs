import { anny } from './anny.type';

export type ValueByKeyType<T extends Record<string, anny>, S extends keyof T> = T[S];
