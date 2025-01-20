import { toast, ToastType } from "vue3-toastify";

export function toastify(msg: string, type: ToastType = "error") {
  
  toast(msg, { "theme": "auto", "type": type, position: toast.POSITION.BOTTOM_RIGHT })
}

export function errorHandler(error: any) {
  if(error instanceof Error) {
    toastify("Error: " + error.message)
  }

  if(error instanceof Response) {
    let message = '';
    switch (error.status) {
      case 400: 
        message = 'Error: You messed up.';
        break;
      case 401:
        message = 'Unauthorized: Access denied.';
        break;
      case 429:
        message = 'Timeout: Please come back in an hour.';
        break;
      case 499: 
        message = 'Aborted: Request was cancelled.';
        break;
      case 500:
        message = 'Error: We messed up.';
        break;
      default:
        message = 'Error: Unhandled exception.';
        break;
    }
    toastify(message)
  }

  console.error('Error', error)
}

export async function delay(amount: number): Promise<void> {
  return new Promise((accept, _) => {
    setTimeout(() => { accept() }, amount)
  })
}

export type Status = 'Pending' | 'Running' | 'Completed' | 'Failed' | 'Terminated'