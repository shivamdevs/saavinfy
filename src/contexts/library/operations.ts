import React from "react";
import { ContextType } from "./context";
import { LibraryCache } from "@/types/library";
import crypt from "@/lib/crypt";
import { setCookie } from "cookies-next";
import { uuid } from "@/lib/utils";

function useOps(data: LibraryCache) {
    const [libraryData, setLibraryData] = React.useState<LibraryCache>(data);

    React.useEffect(() => {
        console.log("Library Data updated", libraryData);

        setCookie("aPlD", crypt.encrypt(libraryData), {
            maxAge: 60 * 60 * 24 * 365 * 100,
        });

        setCookie("aPlDvD", libraryData, {
            maxAge: 60 * 60 * 24 * 365 * 100,
        });
    }, [libraryData]);

    const addSearch = React.useCallback(
        (query: string, type: string) => {
            // Check if the search already exists
            // If it does, update the timestamp

            const search = libraryData.searches.find(
                (search) => search.query === query && search.type === type
            );

            if (search) {
                setLibraryData((prev) => ({
                    ...prev,
                    searches: prev.searches.map((s) =>
                        s.id === search.id ? { ...s, date: Date.now() } : s
                    ),
                }));
            } else {
                setLibraryData((prev) => ({
                    ...prev,
                    searches: [
                        ...prev.searches,
                        {
                            id: uuid(),
                            query,
                            type,
                            date: Date.now(),
                        },
                    ],
                }));
            }
        },
        [libraryData]
    );

    const removeSearch = React.useCallback(
        (id: string) => {
            setLibraryData((prev) => ({
                ...prev,
                searches: prev.searches.filter((search) => search.id !== id),
            }));
        },
        [libraryData]
    );

    return {
        log: libraryData,

        searches: libraryData.searches,
        addSearch,
        removeSearch,
    } as ContextType;
}

export default useOps;
