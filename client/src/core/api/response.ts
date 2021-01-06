export interface ApiResponse<T> {
  raw: Response;
  value(): Promise<T>;
}

export interface ResponseMapper<T> {
  (json: any): T;
}

export class JSONApiResponse<T> implements ApiResponse<T> {
  constructor(
    public raw: Response,
    private mapper: ResponseMapper<T> = (json: any) => json
  ) {}

  async value(): Promise<T> {
    return this.mapper(await this.raw.json());
  }
}

export class VoidApiResponse implements ApiResponse<void> {
  constructor(public raw: Response) {}

  async value(): Promise<void> {
    return undefined;
  }
}

export class ApiError implements Error {
  constructor(public raw: { message: string; trace: string; error: string }) {}

  get message() {
    return this.raw.message;
  }
  get name() {
    return `[ApiError: ${this.raw.error}]`;
  }
  get stack() {
    return this.raw.trace;
  }
}
