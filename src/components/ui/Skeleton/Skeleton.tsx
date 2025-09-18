import {cva} from 'class-variance-authority';
import styles from './Skeleton.module.scss';

type SkeletonProps = {
  width?: number,
  height?: number,
  className?: string
}

export function Skeleton({className}: SkeletonProps) {
  return (
    <div className={cva([styles['skeleton'], className])()}/>
  );
}
