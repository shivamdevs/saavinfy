import { Config } from "@/config";
import { getCookie, setCookie } from "cookies-next";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import Limiter from "./limiter";
import crypt from "@/lib/crypt";
import { SavedLibrary, SavedPlayer } from "@/types/saves";

export default class Saves {
    public static getPlayer(cookies?: () => ReadonlyRequestCookies) {
        const bucket = getCookie(Config.cookies.keys.player, { cookies });

        if (!bucket) {
            return Limiter.fallbackPlayer;
        }

        const decrypted = crypt.decrypt(bucket);

        if (!decrypted) {
            return Limiter.fallbackPlayer;
        }

        return Limiter.parsePlayer(decrypted);
    }

    public static setPlayer(
        data: SavedPlayer,
        cookies?: () => ReadonlyRequestCookies
    ) {
        const toSave = Limiter.limitPlayer(data);

        const encrypted = crypt.encrypt(toSave);

        setCookie(Config.cookies.keys.player, encrypted, { cookies });

        setCookie(`${Config.cookies.keys.player}-raw`, JSON.stringify(data), {
            cookies,
        });
    }

    public static getLibrary(cookies?: () => ReadonlyRequestCookies) {
        const bucket = getCookie(Config.cookies.keys.library, { cookies });

        if (!bucket) {
            return Limiter.fallbackLibrary;
        }

        const decrypted = crypt.decrypt(bucket);

        if (!decrypted) {
            return Limiter.fallbackLibrary;
        }

        return Limiter.parseLibrary(decrypted);
    }

    public static setLibrary(
        data: SavedLibrary,
        cookies?: () => ReadonlyRequestCookies
    ) {
        const toSave = Limiter.limitLibrary(data);

        const encrypted = crypt.encrypt(toSave);

        setCookie(Config.cookies.keys.library, encrypted, { cookies });

        setCookie(`${Config.cookies.keys.library}-raw`, JSON.stringify(data), {
            cookies,
        });
    }
}
