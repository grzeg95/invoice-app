import {cva} from 'class-variance-authority';
import type {ReactNode} from 'react';
import {BreakpointsDevices} from '../../../context/Breakpoints/breakpoints';
import {useBreakpoints} from '../../../context/Breakpoints/useBreakpoints';
import styles from './Button.module.scss';

type ButtonProps = {
  appearance?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'neutral';
  icon?: string;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}

const buttonStyles = cva(
  [styles['button']],
  {
    variants: {
      appearance: {
        primary: [styles['primary']],
        secondary: [styles['secondary']],
        tertiary: [styles['tertiary']],
        danger: [styles['danger']],
        neutral: [styles['neutral']],
      },
      icon: {
        true: [styles['icon']]
      },
      size: {
        small: [styles['small']],
        large: [styles['large']],
      }
    }
  }
);

export function Button({appearance = 'primary', icon, children, onClick, disabled = false}: ButtonProps) {

  const {activeBreakpoints} = useBreakpoints();
  const isMobile = !!activeBreakpoints.find((b) => b === BreakpointsDevices.mobile);

  return (
    <button
      className={buttonStyles({appearance, icon: !!icon, size: isMobile ? 'small' : 'large'})}
      onClick={() => !disabled && onClick?.()}
      disabled={disabled}
    >
      {
        icon && <div className={styles['icon-container']}>
          <img src={icon} alt=''/>
        </div>
      }
      {children}
    </button>
  );
}
