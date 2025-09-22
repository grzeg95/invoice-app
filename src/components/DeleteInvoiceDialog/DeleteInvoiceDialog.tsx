import type {Invoice} from '../../models/firestore/invoice';
import {Button} from '../ui/Button/Button';
import {Dialog} from '../ui/Dialog/Dialog';
import styles from './DeleteInvoiceDialog.module.scss';

type DeleteInvoiceDialogProps = {
  isOpen: boolean;
  onClose?: (result: boolean | undefined) => void;
  invoice: Invoice;
}

export function DeleteInvoiceDialog({isOpen, onClose, invoice}: DeleteInvoiceDialogProps) {

  return (
    <Dialog isOpen={isOpen} onClose={() => onClose?.(undefined)}>
      <div className={styles['dialog-content']}>
        <h2 className={styles['dialog-title']}>Confirm Deletion</h2>
        <p className={styles['dialog-description']}>Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.</p>
        <div className={styles['dialog-actions']}>
          <Button appearance='secondary' onClick={() => onClose?.(false)}>Cancel</Button>
          <Button appearance='danger' onClick={() => onClose?.(true)}>Delete</Button>
        </div>
      </div>
    </Dialog>
  )
}
