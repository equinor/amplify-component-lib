import { QueryFilters } from '@tanstack/react-query';

export const ACTIVE_USERIMPERSONATION = 'activeImpersonationUser';
export const CREATE_IMPERSONATION = 'createImpersonation';
export const SET_ACTIVE_IMPERSONATION = 'setActiveImpersonation';
export const GET_ALL_IMPERSONATIONS = 'getImpersonationUsers';
export const CAN_IMPERSONATE = 'canImpersonate';
export const STOP_IMPERSONATION = 'stopImpersonation';
export const AVAILABLE_ROLES = 'availableRoles';

const ALL_IMPERSONATE_QUERIES = [
  ACTIVE_USERIMPERSONATION,
  CREATE_IMPERSONATION,
  SET_ACTIVE_IMPERSONATION,
  GET_ALL_IMPERSONATIONS,
  CAN_IMPERSONATE,
  STOP_IMPERSONATION,
  AVAILABLE_ROLES,
] as const;

// Ignoring this because it would essentially test that react-query works as expected
/* v8 ignore start */
export const IMPERSONATE_QUERY_FILTER: QueryFilters = {
  predicate: (query) => {
    for (const key of query.queryKey) {
      if (ALL_IMPERSONATE_QUERIES.some((i) => i === key)) {
        return false;
      }
    }
    return true;
  },
};
/* v8 ignore end */
