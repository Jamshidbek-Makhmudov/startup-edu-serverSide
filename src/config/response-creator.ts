export class ResponseCreator {
    constructor(
        public readonly response: number | string | any[] | {},
        public readonly status: number,
        public readonly message: string
    ) { };

    toString() {
        return JSON.stringify({
            response: this.response,
            status: this.status,
            message: this.message
        });
    };

};

