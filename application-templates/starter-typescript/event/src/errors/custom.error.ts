type ErrorItem = {
  statusCode: number;
  message: string;
  referencedBy?: string;
};

class CustomError extends Error {
  statusCode: number;
  message: string;
  errors?: ErrorItem[];

  constructor(statusCode: number, message: string, errors?: ErrorItem[]) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (errors) {
      this.errors = errors;
    }
  }
}

export default CustomError;
