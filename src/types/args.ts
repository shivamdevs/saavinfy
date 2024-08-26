export type SearchParams = {
    [key: string]: string | string[] | undefined;
};

export type PageProps = {
    params: SearchParams;
    searchParams?: SearchParams;
};
