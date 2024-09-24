export default class Searcher {
    public static encode(value: string): string {
        value = value.trim();
        value = value.replace(/\s+/g, "+");

        return value;
    }

    public static decode(value: string): string {
        value = decodeURIComponent(value);
        value = value.replace(/\+/g, " ");

        return value;
    }

    public static recode(value: string): string {
        return Searcher.encode(Searcher.decode(value));
    }
}
