import {cva} from 'class-variance-authority';
import {type ReactNode, type RefObject, useEffect, useImperativeHandle, useRef} from 'react';
import {createPortal} from 'react-dom';
import {useFocusTrap} from '../../../hooks/useFocusTrap';
import {mutationObserverScrollVisibility} from '../../../utils/mutationObserverScrollVisibility';
import {updateScrollVisibility} from '../../../utils/updateScrollVisibility';
import styles from './Dialog.module.scss';

let dialogIdCounter = 0;
const dialogStack: number[] = [];

export type DialogRef = {
  close: () => void;
};

export type DialogProps = {
  children: ReactNode;
  onClose?: () => void;
  isOpen: boolean;
  ref?: RefObject<DialogRef | null> | null;
  backdropClassName?: string
  wrapperClassName?: string
  paneClassName?: string
}

export function Dialog({children, onClose, isOpen, ref, backdropClassName, wrapperClassName, paneClassName}: DialogProps) {

  const dialogId = useRef(-1);

  const trapRef = useFocusTrap({
    active: isOpen
  });

  useImperativeHandle(ref, () => {
    return {
      close() {
        onClose?.();
      }
    };
  }, [onClose]);

  function isFirstDialog() {
    return dialogStack.indexOf(dialogId.current) === 0;
  }

  useEffect(() => {

    if (isOpen) {

      dialogId.current = ++dialogIdCounter;
      dialogStack.push(dialogIdCounter);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      let observer: MutationObserver;

      if (isFirstDialog()) {
        updateScrollVisibility();
        window.addEventListener('resize', updateScrollVisibility);
        observer = new MutationObserver(mutationObserverScrollVisibility);
        observer.observe(document.body, {childList: true, subtree: true});
      }

      return () => {

        if (isFirstDialog()) {
          window.removeEventListener('resize', updateScrollVisibility);
          document.body.style.paddingRight = '0px';
          document.body.style.overflow = 'auto';
          document.body.style.overflow = 'auto';
          observer?.disconnect();
        }

        window.removeEventListener('keydown', handleKeyDown);

        const index = dialogStack.indexOf(dialogIdCounter);
        dialogStack.splice(index, 1);

        if (dialogStack.length === 0) {
          dialogIdCounter = 0;
        }
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {

    if (!isOpen) {
      onClose?.();
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div className={cva([styles['dialog-backdrop'], backdropClassName])()} onClick={() => onClose?.()}/>
      <div className={cva([styles['dialog-wrapper'], wrapperClassName])()}>
        <div className={cva([styles['dialog-pane'], paneClassName])()} ref={trapRef}>
          {children}
        </div>
      </div>
    </>
    , document.getElementById('overlay-root')!);
}
