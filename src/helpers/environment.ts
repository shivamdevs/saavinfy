export default class Env {
    private env: Record<string, string | undefined>;

    constructor(env: Record<string, string | undefined> = process.env) {
        this.env = Object.assign({}, env);

        // if env starts with NEXT_PUBLIC_ and not already in env, add it
        Object.keys(this.env).forEach((key) => {
            const sub = key.substring(12);
            if (key.startsWith("NEXT_PUBLIC_") && !this.env[sub]) {
                this.env[sub] = process.env[key];
            }
        });

        // convert to camelCase for non NEXT_PUBLIC_ keys, attach _ as prefix
        Object.keys(this.env).forEach((key) => {
            if (!key.startsWith("NEXT_PUBLIC_") && !key.startsWith("_")) {
                const camelCase = key
                    .toLowerCase()
                    .replace(/_([a-z])/g, (g) => g[1].toUpperCase());
                this.env[`_${camelCase}`] = this.env[key];
            }
        });
    }

    get instance() {
        return this.env;
    }

    get mode() {
        return this.get("NODE_ENV");
    }

    get isProduction() {
        return this.mode === "production";
    }

    get isDevelopment() {
        return this.mode === "development";
    }

    get isStaging() {
        return this.mode === "staging";
    }

    get(key: string): string {
        return this.env[key] || "";
    }

    getAs<T>(key: string, fallback: T): T {
        return (this.env[key] as T) || fallback;
    }

    getAsNumber(key: string, fallback: number): number {
        const value = parseInt(this.get(key), 10);

        return isNaN(value) ? fallback : value;
    }

    getAsBoolean(key: string): boolean {
        const value = this.get(key);

        if (value === "true" || value === "1") {
            return true;
        }

        return false;
    }

    set(key: string | Record<string, string | undefined>, value?: string) {
        if (typeof key === "object") {
            Object.entries(key).forEach(([k, v]) => {
                this.env[k] = v;
            });
        } else {
            this.env[key] = value;
        }
    }

    static from(env: Record<string, string | undefined>) {
        return new Env(env);
    }
}
