"use client"
import React from 'react';
import axios, { type AxiosResponse,  } from 'axios';
import { resolve } from 'url';
import settings from '@/settings';


export type APIErrorPayload = {
  message: string;
  details: Record<string, string[]>;
  code: number;
  timestamp: Date;
};

export type PayloadSingle<
  Instance extends Record<string, any>
> = {
  data: Instance;
};

export type PayloadMany<
  Instance extends Record<string, any>
> = {
  items: Instance[];
  cursor: string | null;
  hasMore: boolean;
};

export type ResponsePayloadStatus = 'idle' | 'loading' | 'success' | 'error' | 'canceled' | 'timeout';

export type ResponsePayload<
  Payload extends PayloadSingle<any> | PayloadMany<any> | null = PayloadSingle<any> | PayloadMany<any> | null,
> = (
  // DEPRECATED
  {
    status: 'idle'
    payload: Payload;
    error: null;
    version: number;
  } |
  {
    status: 'loading',
    payload: Payload,
    error: null,
    version: number;
  } | {
    status: 'success',
    payload: Exclude<Payload, null>,
    error: null,
    version: number;
  } | {
    status: 'error',
    payload: Payload,
    error: APIErrorPayload,
    version: number;
  } | {
    // TODO: Add support for canceled and timeout statuses
    status: 'canceled',
    payload: Payload,
    error: null,
    version: number;
  } | {
    status: 'timeout',
    payload: Payload,
    error: null,
    version: number;
  }
);

export type RequestParameters = (string | number |  bigint | boolean | undefined | null)[];

export type RequestCallbackOptions = {
  resolveURL: (path: string) => string;
};

export type RequestCallback<
  Payload extends PayloadSingle<any> | PayloadMany<any> | null,
  Parameters extends RequestParameters = RequestParameters,
> = (
    parameters: Parameters, 
    options: RequestCallbackOptions
  ) => Promise<AxiosResponse<any, any>>

export function useRequest<
  Payload extends PayloadSingle<any> | PayloadMany<any> | null,
  Parameters extends RequestParameters = RequestParameters,
> (
  label: string,
  parameters: Parameters,
  request: RequestCallback<Payload, Parameters>,
  defaultPayload: Payload,
): ResponsePayload<Payload> 
{
  const [responsePayload, setResponsePayload] = React.useState<ResponsePayload<Payload>>({
    status: 'loading',
    payload: defaultPayload,
    error: null,
    version: 0
  });

  React.useEffect(() => {
    (async () => {
      setResponsePayload((prev) => ({
        status: 'loading',
        payload: defaultPayload,
        error: null,
        version: prev.version,
      }));

      const response: AxiosResponse<any, any> = await request(parameters, {
        resolveURL: resolveURL,
      });

      if (response.status >= 200 || response.status < 300) {
        setResponsePayload((prev) => ({
          status: 'success',
          payload: response.data,
          error: null,
          version: prev.version + 1,
        }));
      } else {
        setResponsePayload((prev) => ({
          status: 'error',
          payload: defaultPayload,
          error: response.data,
          version: prev.version + 1,
        }));
      }
    })();
  }, parameters);

  return responsePayload;
}

/******************************************************************************
 * Request variations
 *****************************************************************************/

export function useGetQuery<
  Instance extends Record<string, any>,
  Parameters extends RequestParameters = RequestParameters,
> (
  label: string,
  parameters: Parameters,
  request: RequestCallback<PayloadSingle<Instance> | null, Parameters>,
  defaultPayload: PayloadSingle<Instance> | null = null,
): ResponsePayload<PayloadSingle<Instance> | null>
{
  return useRequest<PayloadSingle<Instance> | null, Parameters>(
    label,
    parameters,
    request,
    defaultPayload,
  );
}

export function useMutate<
  Instance extends Record<string, any>,
  Parameters extends RequestParameters = RequestParameters,
> (
  label: string,
  parameters: Parameters,
  request: RequestCallback<PayloadSingle<Instance> | null, Parameters>,
  defaultPayload: PayloadSingle<Instance> | null = null,
): ResponsePayload<PayloadSingle<Instance> | null> 
{
  return useRequest<PayloadSingle<Instance> | null, Parameters>(
    label,
    parameters,
    request,
    defaultPayload,
  );
}

export type PayloadPaginatedMany<
  Instance extends Record<string, any>,
> = {
  items: Instance[];
  pages: { 
    items: Instance[];
    cursor: string | null;
  }[];
  cursor: string | null;
  hasMore: boolean;
};

export type CursorType = string | null;

export function usePaginatedQuery<
  Instance extends Record<string, any>,
  Parameters extends RequestParameters = RequestParameters,
> (
  label: string,
  parameters: Parameters,
  request: RequestCallback<PayloadMany<Instance>, [CursorType, ...Parameters]>,
): ResponsePayload<PayloadPaginatedMany<Instance>> & {
  loadMore: () => void;
}
{
  const [cursor, setCursor] = React.useState<CursorType>(null);
  const [responsePayload, setResponsePayload] = React.useState<ResponsePayload<PayloadPaginatedMany<Instance>>>({
    status: 'loading',
    payload: {
      items: [],
      pages: [],
      cursor: null,
      hasMore: false,
    },
    error: null,
    version: 0
  });
  const sourcePayload = useRequest<PayloadMany<Instance>, [CursorType, ...Parameters]>(
    label,
    [cursor, ...parameters],
    request,
    {
      items: [],
      cursor: null,
      hasMore: false,
    },
  );

  const loadMore = React.useCallback(() => {
    if (responsePayload.payload.cursor === null || responsePayload.payload.hasMore === false) {
      return;
    }

    setCursor(sourcePayload.payload.cursor);
  }, [
    responsePayload.payload.cursor,
    responsePayload.payload.hasMore,
    sourcePayload.payload.cursor,
  ]);

  React.useEffect(() => {
    setResponsePayload((prev) => ({
      ...prev,
      status: 'loading',
      payload: {
        items: [],
        pages: [],
        cursor: null,
        hasMore: false,
      },
      error: null,
    }));
    setCursor(null);
  }, [...parameters]);

  React.useEffect(() => {
    if (
      sourcePayload.status === 'success' 
      // Check if the cursor is not already in the pages
      && responsePayload.payload.pages.find((page) => page.cursor === cursor) === undefined
    ) {
      setResponsePayload((prev) => ({
        status: sourcePayload.status,
        error: sourcePayload.error,
        version: sourcePayload.version,
        payload: {
          ...prev.payload,
          items: [...prev.payload!.items, ...sourcePayload.payload.items],
          pages: [...prev.payload!.pages, {
            items: sourcePayload.payload.items,
            cursor: cursor,
          }],
          cursor: sourcePayload.payload.cursor,
          hasMore: sourcePayload.payload.hasMore,
        },
      }));
    } else {
      setResponsePayload((prev) => ({
        ...prev,
        status: sourcePayload.status,
        error: sourcePayload.error,
        version: sourcePayload.version,
      } as ResponsePayload<PayloadPaginatedMany<Instance>>));
    }
  }, [sourcePayload.version, ...parameters]);

  return {
    ...responsePayload,
    loadMore,
  };
}


/******************************************************************************
 * Utils
 *****************************************************************************/

function resolveURL(path: string) {
  let baseAPI = settings.baseAPI;
  if (baseAPI.endsWith('/')) {
    baseAPI = baseAPI.slice(0, -1);
  }
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  return resolve(settings.baseAPI, path);
}