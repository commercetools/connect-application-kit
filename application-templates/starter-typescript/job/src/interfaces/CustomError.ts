type ErrorItem = {
  code: string;
  message: string;
  referencedBy?: string;
};

class CustomError extends Error {
  status: string;
  message: string;
  errors?: ErrorItem[];
  constructor(status: string, message: string, errors?: ErrorItem[]) {
    super(message);
    this.status = status;
    this.message = message;
    if (errors) {
      this.errors = errors;
    }
  }
}
export default CustomError;
