export type SearchParams = {
    [key: string]: string | string[] | undefined;
};

export type PageProps<P = SearchParams> = {
    params: P;
    searchParams?: SearchParams;
};
