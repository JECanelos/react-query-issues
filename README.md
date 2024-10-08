# React Query - Issues

List Git issues of the [React GitHub project](https://github.com/facebook/react) using [TanStack Query](https://tanstack.com/query/latest/) (formerly known as React Query).

## Features Used

- [`QueryClient`](https://tanstack.com/query/latest/docs/reference/QueryClient) / [useQueryClient](https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient)
  - `defaultOptions`
  - [`prefetchQuery`](https://tanstack.com/query/latest/docs/reference/QueryClient/#queryclientprefetchquery)
  - [`setQueryData`](https://tanstack.com/query/latest/docs/reference/QueryClient/#queryclientsetquerydata)
- [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)
  - `staleTime`
  - `enabled`
  - `initialData`
  - `placeholderData`
  - pagination
- [`useInfiniteQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery)
  - `staleTime`
  - `initialPageParam`
  - `getNextPageParam`
  - pagination

## Setup

Create a `.env.local` file and set the `VITE_GITHUB_TOKEN` environment variable.

To generate this token, go to [Fine-grained tokens](https://github.com/settings/tokens?type=beta) by logging into your GitHub account, navigating to *User > Settings > Developer settings > Personal access tokens > Fine-grained tokens* and clicking in *Generate new token*.

Use the following properties:

- Token name: curso-react-query
- Expiration: 30 days
- Repository access: Public Repositories (read-only)
- Permissions
  - Interactions limits: read-only
