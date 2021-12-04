export class ErrorAdapter {
  constructor(
    // eslint-disable-next-line no-use-before-define
    public errorStatus: ErrorStatus = {
      statusCode: '',
      message: '',
    }
  ) {}
  // statusCode: number
  // message: string
  // constructor(init?: Partial<ErrorAdapter>) {
  //   Object.assign(this, init)
  // }
}

export type ErrorStatus = {
  statusCode: string | number
  message: string
}
