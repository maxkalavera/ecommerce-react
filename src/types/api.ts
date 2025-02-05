import { QueryFunction } from "@tanstack/react-query";

/******************************************************************************
 * Utilities 
 */

export interface APIError {
  message: string;
  code: string;
}

export type APIQueryFunction<Response, Params extends any[]=[], PageParam=never> = 
  QueryFunction<Response, readonly [string, ...Params] | readonly (string | Params[number])[], PageParam>;

/******************************************************************************
 * Instance Query 
 */

export type InstanceResponse<Model> = {
  instance: Model;
};

export type InstanceQueryFunction<Model, Params extends any[]=[]> = 
  APIQueryFunction<InstanceResponse<Model>, Params>;

/******************************************************************************
 * Many Query 
 */

export type ManyResponse<Model> = {
  items: Model[];
};

export type ManyQueryFunction<Model, Params extends any[]=[]> = 
  APIQueryFunction<ManyResponse<Model>, Params>;

/******************************************************************************
 * Paginated Query 
 */

export type PageParam = string | null;

export interface PaginatedResponse<Model> extends ManyResponse<Model> {
  total: number;
  page: number;
  limit: number;
};

export type PaginatedQueryFunction<Model, Params extends any[]=[]> = 
  APIQueryFunction<PaginatedResponse<Model>, Params, PageParam>;

/******************************************************************************
 * Cursor Paginated Query 
 */

export type CursorParam = string | null;

export interface CursorPaginatedResponse<Model> extends ManyResponse<Model> {
  nextCursor: PageParam;
};

export type CursorPaginatedQueryFunction<Model, Params extends any[]=[]> = 
  APIQueryFunction<CursorPaginatedResponse<Model>, Params, CursorParam>;