import {type ReactNode, type RefObject, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import styles from './Menu.module.scss';

type StrategyName = 'bottom-center' | 'bottom-left-left' | 'bottom-left-right' | 'bottom-right-left' | 'bottom-right-right' | 'top-center' | 'top-left-left' | 'top-left-right' | 'top-right-left' | 'top-right-right' | 'left-center' | 'right-center';

export type StrategyOption = {
  name: StrategyName;
  offset?: {
    x?: number;
    y?: number;
  }
}

export type MenuProps = {
  children: ReactNode;
  triggerRef: RefObject<HTMLElement | null>;
  strategiesOptions: StrategyOption[];
  onOpen?: () => void;
  onClose?: () => void;
}

export function Menu({children, triggerRef, strategiesOptions, onOpen, onClose}: MenuProps) {

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {

    if (!triggerRef.current || !menuRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const getCords = (strategyOption: StrategyOption) => {

      let top: number;
      let left: number;

      const offsetX = strategyOption.offset?.x || 0;
      const offsetY = strategyOption.offset?.y || 0;

      switch (strategyOption.name) {
        case 'bottom-left-left':
          top = triggerRect.bottom;
          left = triggerRect.left;
          break;
        case 'bottom-left-right':
          top = triggerRect.bottom;
          left = triggerRect.left - menuRect.width;
          break;
        case 'bottom-center':
          top = triggerRect.bottom;
          left = triggerRect.left + (triggerRect.width / 2) - (menuRect.width / 2);
          break;
        case 'bottom-right-left':
          top = triggerRect.bottom;
          left = triggerRect.right;
          break;
        case 'bottom-right-right':
          top = triggerRect.bottom;
          left = triggerRect.right - menuRect.width;
          break;
        case 'top-left-left':
          top = triggerRect.top - menuRect.height;
          left = triggerRect.left;
          break;
        case 'top-left-right':
          top = triggerRect.top - menuRect.height;
          left = triggerRect.left - menuRect.width;
          break;
        case 'top-center':
          top = triggerRect.top - menuRect.height;
          left = triggerRect.left + (triggerRect.width / 2) - (menuRect.width / 2);
          break;
        case 'top-right-left':
          top = triggerRect.top - menuRect.height;
          left = triggerRect.right;
          break;
        case 'top-right-right':
          top = triggerRect.top - menuRect.height;
          left = triggerRect.right - menuRect.width;
          break;
        case 'left-center':
          top = triggerRect.top + (triggerRect.height / 2) - (menuRect.height / 2);
          left = triggerRect.left - menuRect.width;
          break;
        case 'right-center':
          top = triggerRect.top + (triggerRect.height / 2) - (menuRect.height / 2);
          left = triggerRect.right;
          break;
        default:
          top = triggerRect.bottom;
          left = triggerRect.left;
      }

      return {
        top: top + offsetY,
        left: left + offsetX
      };
    }

    let i = 0;
    for (; i < strategiesOptions.length - 1; ++i) {

      const strategyOption = strategiesOptions[i];
      const cords = getCords(strategyOption);

      const fitsHorizontally = cords.left + menuRect.width <= windowWidth;
      const fitsVertically = cords.top + menuRect.height <= windowHeight;

      if (strategyOption.name.includes('bottom') || strategyOption.name.includes('top')) {
        if (fitsVertically) {
          menuRef.current.style.top = `${cords.top}px`;
          menuRef.current.style.left = `${cords.left}px`;
          return;
        }
      }

      if (strategyOption.name.includes('left') || strategyOption.name.includes('right')) {
        if (fitsHorizontally) {
          menuRef.current.style.top = `${cords.top}px`;
          menuRef.current.style.left = `${cords.left}px`;
          return;
        }
      }

      if (fitsHorizontally && fitsVertically) {
        menuRef.current.style.top = `${cords.top}px`;
        menuRef.current.style.left = `${cords.left}px`;
        return;
      }
    }

    if (i === strategiesOptions.length - 1) {

      const strategy = strategiesOptions[i];
      const cords = getCords(strategy);

      menuRef.current.style.top = `${cords.top}px`;
      menuRef.current.style.left = `${cords.left}px`;
    }

  }, [strategiesOptions, triggerRef]);

  useEffect(() => {

    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    const handleClick = () => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    trigger.addEventListener('click', handleClick);

    return () => trigger.removeEventListener('click', handleClick);
  }, [triggerRef])

  useEffect(() => {

    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      }
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {

    if (isOpen) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  useEffect(() => {

    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, onClose, onOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div className={styles['menu-backdrop']} onClick={() => setIsOpen(false)}/>
      <div className={styles['menu']} ref={menuRef}>
        {children}
      </div>
    </>
    , document.getElementById('overlay-root')!);
}
