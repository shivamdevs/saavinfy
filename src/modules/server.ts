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
    status: number;
    success: false = false;
    message: string;
    data: unknown;

    constructor(message: string, data: unknown, status: number = 404) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
