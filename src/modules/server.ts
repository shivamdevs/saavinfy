export class ServerResponse<T = unknown> {
    success: true = true;
    data: T;
    message?: string;

    constructor(data: T, message?: string) {
        this.data = data;
        this.message = message;
    }
}

export class ServerError {
    code?: string;
    status: number;
    success: false = false;
    message: string;
    data: unknown;

    constructor(
        message: string,
        data: unknown,
        status: number = 404,
        code?: string
    ) {
        this.status = status;
        this.message = message;
        this.data = data;

        if (code) {
            this.code = code;
        }
    }

    with(code: string) {
        this.code = code;

        return this;
    }
}
