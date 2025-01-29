import settings from '@/settings';
import { UseQueryOptions } from '@tanstack/react-query';

export const defaults: Omit<UseQueryOptions, "queryKey"> = {
  networkMode: settings.environment === "demo" ? "always" : "online"
};