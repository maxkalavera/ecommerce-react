"use client"
import React from 'react';
import lodash from 'lodash';
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
  Payload extends PayloadSingle<any> | PayloadMany<any> = PayloadSingle<any> | PayloadMany<any>,
> = (
  {
    status: 'idle'
    payload: Payload | null;
    error: null;
  } | {
    status: 'loading',
    payload: Payload | null,
    error: null,
  } | {
    status: 'success',
    payload: Payload,
    error: null,
  } | {
    status: 'error',
    payload: Payload | null,
    error: APIErrorPayload,
  } | {
    // TODO: Add support for canceled and timeout statuses
    status: 'canceled',
    payload: Payload | null,
    error: null,
  } | {
    status: 'timeout',
    payload: Payload | null,
    error: null,
  }
);

export type ResponseObject<
  Payload extends PayloadSingle<any> | PayloadMany<any>,
  Parameters extends RequestParameters,
> = ResponsePayload<Payload> & {
  reset: () => void;
  fetch: (parameters: Parameters) => void;
  onSuccess: (callback: () => void) => void;
  onFailure: (callback: () => void) => void;
};

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

export type RequestOptions<
  Payload extends PayloadSingle<any> | PayloadMany<any>,
> = {
  initialParameters: RequestParameters;
  initialStatus: ResponsePayloadStatus,
  initialPayload: Payload | null,
  sendRequestMode: 'onMount' | 'onUpdate',
};

export function useRequest<
  Payload extends PayloadSingle<any> | PayloadMany<any>,
  Parameters extends RequestParameters = RequestParameters,
> (
  label: string,
  _parameters: Parameters,
  request: RequestCallback<Payload, Parameters>,
  _options: Partial<RequestOptions<Payload>> = {},

): ResponseObject<Payload, Parameters>
{
  const initialParametersRef = React.useRef(_parameters);
  const options: RequestOptions<Payload> = lodash.defaults(_options, {
    initialStatus: 'idle',
    initialPayload: null,
    initialParameters: initialParametersRef.current,
    sendRequestMode: 'onMount',
  } as RequestOptions<Payload>);
  const [parameters, setParameters] = React.useState<[number, ...Parameters]>([0, ..._parameters]);
  const [responsePayload, setResponsePayload] = React.useState<ResponsePayload<Payload>>({
    status: options.initialStatus as any,
    payload: options.initialPayload,
    error: null,
  });

  React.useEffect(() => {
    if (lodash.isEqual(_parameters, parameters.slice(1))) {
      return;
    }
    setParameters([parameters[0] + 1, ..._parameters]);
  }, [..._parameters]);

  React.useEffect(() => {
    const asyncCall = async () => {
      setResponsePayload((prev) => ({
        ...prev,
        status: 'loading',
        error: null,
      }));

      try {
        const response: AxiosResponse<any, any> = await request(
          parameters.slice(1) as Parameters, 
          { resolveURL: resolveURL }
        );
        if (response.status >= 200 || response.status < 300) {
          setResponsePayload((prev) => ({
            ...prev,
            status: 'success',
            payload: response.data,
            error: null,
          }));
        }
      } catch(error) {
        if (axios.isAxiosError(error)) {
          setResponsePayload((prev) => ({
            ...prev,
            status: 'error',
            error: error.response?.data as APIErrorPayload,
            payload: prev.payload as any,
          }));
        } else {
          setResponsePayload((prev) => ({
            ...prev,
            status: 'error',
            error: {
              message: 'An unexpected error occurred',
              details: {},
              code: 500,
              timestamp: new Date(),
            },
          }));
        }
      }
    };

    if (options.sendRequestMode === 'onUpdate' && parameters[0] === 0) {
      return; // Skip the effect on first render
    }

    asyncCall();
  }, parameters);

  React.useEffect(() => {
    const { status } = responsePayload;
    if (status === 'success') {
      for (const callback of onSuccessCallbacksRef.current) {
        callback();        
      }
    } else if (status === 'error') {
      for (const callback of onFailureCallbacksRef.current) {
        callback();        
      }
    }
  }, [responsePayload.status]);

  /* Methods */
  /***********/

  const fetch = React.useCallback((fetchParameters: Parameters) => {
    setParameters((prev) => [prev[0] + 1, ...fetchParameters]);
  }, [setParameters]);

  const reset = React.useCallback(() => {
    setResponsePayload({
      status: options.initialStatus as any,
      payload: options.initialPayload,
      error: null,
    });
    setParameters([0, ...initialParametersRef.current]);
  }, []);

  const onSuccessCallbacksRef = React.useRef<Set<(() => void)>>(new Set());
  const onSuccess = React.useCallback((callback: () => void) => {
    onSuccessCallbacksRef.current.add(callback);
  }, [onSuccessCallbacksRef]);

  const onFailureCallbacksRef = React.useRef<Set<(() => void)>>(new Set());
  const onFailure = React.useCallback((callback: () => void) => {
    onFailureCallbacksRef.current.add(callback);
  }, [onFailureCallbacksRef]);

  return {
    ...responsePayload,
    reset,
    fetch,
    onSuccess,
    onFailure,
  };
}

/******************************************************************************
 * Request variations
 *****************************************************************************/

/*
 * Get request
 *****************************************************************************/

export function useGetQuery<
  Instance extends Record<string, any>,
  Parameters extends RequestParameters = RequestParameters,
> (
  label: string,
  parameters: Parameters,
  request: RequestCallback<PayloadSingle<Instance> | null, Parameters>,
  initialPayload: PayloadSingle<Instance> | null = null,
  initialStatus: ResponsePayloadStatus = 'loading',
): ResponseObject<PayloadSingle<Instance>, Parameters>
{
  return useRequest<PayloadSingle<Instance>, Parameters>(
    label,
    parameters,
    request,
    { 
      initialStatus,
      initialPayload,
    }
  );
}

/*
 * Mutate (Add, remove, update) request
 *****************************************************************************/

export function useMutate<
  Instance extends Record<string, any>,
  Parameters extends RequestParameters = RequestParameters,
> (
  label: string,
  request: RequestCallback<PayloadSingle<Instance> | null, Parameters>,
  initialParameters: Parameters,
): ResponseObject<PayloadSingle<Instance>, Parameters> & {}
{
  const [parameters, setParameters] = React.useState<Parameters>(initialParameters);

  /*
  const execute = React.useCallback((parameters: Parameters) => {
    setParameters(parameters);
  }, []);
  */

  const requestObject = useRequest<PayloadSingle<Instance>, Parameters>(
    label,
    parameters,
    request,
    {
      initialStatus: 'idle',
      initialPayload: null,
      sendRequestMode: 'onUpdate',
    }
  );

  return {
    ...requestObject,
    //execute,
  }
}

/*
 * Paginated (list) request
 *****************************************************************************/

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
): ResponseObject<PayloadPaginatedMany<Instance>, [CursorType, ...Parameters]> & {
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
  });
  const sourcePayload = useRequest<PayloadMany<Instance>, [CursorType, ...Parameters]>(
    label,
    [cursor, ...parameters],
    request,
    {
      initialStatus: 'loading',
      initialPayload: {
        items: [],
        cursor: null,
        hasMore: false,
      },
    }
  );

  const loadMore = React.useCallback(() => {
    if (
      sourcePayload.payload === null
      || responsePayload.payload?.cursor === null 
      || responsePayload.payload?.hasMore === false
    ) {
      return;
    }

    setCursor(sourcePayload.payload.cursor);
  }, [
    responsePayload.payload?.cursor,
    responsePayload.payload?.hasMore,
    sourcePayload.payload?.cursor,
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
      // Check if the cursor is not already in pages
      && (responsePayload.payload?.pages ?? []).find((page) => page.cursor === cursor) === undefined
    ) {
      setResponsePayload((prev) => ({
        status: sourcePayload.status,
        error: sourcePayload.error,
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
      } as ResponsePayload<PayloadPaginatedMany<Instance>>));
    }
  }, [sourcePayload.status, ...parameters]);

  const reset = React.useCallback(() => {
    setResponsePayload({
      status: 'loading',
      payload: {
        items: [],
        pages: [],
        cursor: null,
        hasMore: false,
      },
      error: null,
    });
    sourcePayload.reset();
  }, [sourcePayload.reset]);

  return {
    ...sourcePayload,
    ...responsePayload,
    loadMore,
    reset
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