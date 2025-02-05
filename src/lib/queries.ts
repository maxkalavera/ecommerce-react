import { FetchInfiniteQueryOptions, FetchQueryOptions, QueryClient, QueryKey } from "@tanstack/react-query";


export class APIError extends Error {
  public code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "API ERROR";
    this.code = code;
    Object.setPrototypeOf(this, APIError.prototype);
  }
};

export async function fetchSSRQuery<
  TQueryFnData = unknown, 
  TError = APIError, 
  TData = TQueryFnData, 
  TQueryKey extends QueryKey = readonly unknown[], 
  TPageParam = never
>(
  options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>
): 
Promise<{
  data: TData | undefined,
  isSuccess: boolean,
  error: TError | undefined
}>
{
  const queryClient = new QueryClient();
  try {
    return {
      data: await queryClient.fetchQuery(options),
      isSuccess: true,
      error: undefined
    };
  } catch (error) {
    if (error instanceof APIError) {
      console.log('Error:', error.code)
      return {
        data: undefined,
        isSuccess: false,
        error: error as TError
      }
    }
    throw error;
  }
};
