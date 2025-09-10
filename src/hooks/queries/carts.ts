
"use client"
import axios from 'axios';
import { useMutate, useGetQuery, usePaginatedQuery } from '@/lib/queries';
import { CartItem } from '@/types/carts';


export function useCartItemsQuery () 
{
  return usePaginatedQuery<CartItem>(
    'useCartItemsQuery', 
    [], 
    async ([], { resolveURL }) => {
    const response = await axios.get(resolveURL('carts/items'), {
      headers: {
        'accept': 'application/json',
      },
    });
    return response;
  });
}

export function useAddCartItemMutation ()
{
  return useMutate(
    'useAddCartItemMutation',
    async ([
      productKey,
      quantity,
    ], { resolveURL }) => {
      const response = await axios.post(resolveURL('carts/items'), {
        productKey: productKey,
        quantity: quantity,
      }, {
        headers: {
          'accept': 'application/json',
        },
      });
      return response;
    },
    ['', 1]
  );
}

export function useUpdateCartItemMutation ()
{
  return useMutate(
    'useUpdateCartItemMutation',
    async ([
      cartKey,
      quantity,
    ], { resolveURL }) => {
      const response = await axios.put(resolveURL(`carts/items/${cartKey}`), {
        quantity: quantity,
      }, {
        headers: {
          'accept': 'application/json',
        },
      });
      return response;
    },
    ['', 1]
  );
}

export function useDeleteCartItemMutation ()
{
  return useMutate(
    'useDeleteCartItemMutation',
    async ([cartKey], { resolveURL }) => {
      const response = await axios.delete(resolveURL(`carts/items/${cartKey}`), {
        headers: {
          'accept': 'application/json',
        },
      });
      return response;
    },
    ['']
  );
}

export function useGetCartItemsCountQuery () {
  return useGetQuery(
    'useGetCartItemsCount',
    [],
    async ([], { resolveURL }) => {
      const response = await axios.get(resolveURL('carts/items/count'), {
        headers: {
          'accept': 'application/json',
        },
      });
      return response;
    },
  );
}