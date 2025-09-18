import {Skeleton} from '../../components/ui/Skeleton/Skeleton';
import {useAuth} from '../../context/Auth/useAuth';
import styles from './Invoices.module.scss';
import {InvoicesContent} from './InvoicesContent';

export function Invoices() {

  const {user} = useAuth();

  return (
    <div className={styles['invoices-wrapper']}>
      {!user ? (
        <>
          <Skeleton className={styles['skeleton-invoices']} />
          <Skeleton className={styles['skeleton-invoices']}/>
          <Skeleton className={styles['skeleton-invoices']}/>
        </>
      ) : (
        <InvoicesContent user={user}/>
      )}
    </div>
  )

}
