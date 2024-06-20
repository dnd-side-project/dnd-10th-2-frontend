import { Toast } from './Toast';

export interface ToastStore {
  toast: Toast;
  showToast: ({
    content,
    bottom
  }: {
    content: Toast['content'];
    bottom?: Toast['bottom'];
  }) => void;
}
