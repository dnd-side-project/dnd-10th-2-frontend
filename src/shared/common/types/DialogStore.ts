import { Dialog } from './Dialog';

export interface DialogStore {
  dialog: Dialog;
  openDialog: () => void;
  closeDialog: () => void;
}
