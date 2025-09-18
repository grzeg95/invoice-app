import {useInfiniteQuery} from '@tanstack/react-query';
import {QueryDocumentSnapshot} from 'firebase/firestore';
import {useState} from 'react';
import iconArrowRight from '../../assets/icon-arrow-right.svg';
import iconPlus from '../../assets/icon-plus.svg';
import illustrationEmpty from '../../assets/illustration-empty.svg';
import {StateFilter} from '../../components/StateFilter/StateFilter';
import {Button} from '../../components/ui/Button/Button';
import {Skeleton} from '../../components/ui/Skeleton/Skeleton';
import {useAuth} from '../../context/Auth/useAuth';
import {BreakpointsDevices} from '../../context/Breakpoints/breakpoints';
import {useBreakpoints} from '../../context/Breakpoints/useBreakpoints';
import {getInvoices} from '../../firebase/queries/getInvoices';
import type {InvoiceState} from '../../models/firestore/InvoiceState';
import type {UserInvoice} from '../../models/firestore/user-invoice';
import styles from './Invoices.module.scss';

const currencyFormater = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP'
});

export function Invoices() {

  const {user} = useAuth();

  const [selectedStates, setSelectedStates] = useState<InvoiceState[]>(() => {
    const options: InvoiceState[] = ['draft', 'pending', 'paid'];
    options.sort((a, b) => a.localeCompare(b));
    return options;
  });

  const {data, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['invoices', user?.uid, selectedStates],
    queryFn: ({pageParam}) => getInvoices(pageParam, selectedStates, user!.uid, 5),
    initialPageParam: null as QueryDocumentSnapshot<UserInvoice> | null,
    getNextPageParam: (lastPage) => lastPage.lastDocSnap,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    placeholderData: prev => prev
  });

  const {activeBreakpoints} = useBreakpoints();
  const isMobile = !!activeBreakpoints.find((b) => b === BreakpointsDevices.mobile);

  const userInvoices = data?.pages.map((page) =>
    page.invoices.map((invoiceQueryDocSnap) =>
      invoiceQueryDocSnap.data()
    )
  ).flat();

  return (
    <div className={styles['invoices-page']}>

      <div className={styles['invoices-header']}>
        <div className={styles['invoices-header-left']}>
          <div className={styles['invoices-header-title']}>Invoices</div>
          {user && <div className={styles['invoices-header-number-of-invoices']}>{user.numberOfInvoices} {((user.numberOfInvoices || 0) === 0 || (user.numberOfInvoices || 0) > 1) ? 'invoices' : 'invoice'}</div>}
        </div>
        <div className={styles['invoices-header-right']}>
          <div className={styles['invoices-header-filter']}>
            <StateFilter defaultSelectedOptions={selectedStates} onChange={(selectedOptions) => setSelectedStates(selectedOptions)}/>
          </div>
          <Button icon={iconPlus}>{isMobile ? 'New' : 'New Invoice'}</Button>
        </div>
      </div>

      {isMobile ? (
        <div className={`${styles['invoices-mobile']}`}>
          {userInvoices?.map((userInvoice) => (
            <a href='#' key={userInvoice.id} className={`${styles['invoice']} ${isFetching ? styles['fetching'] : ''}`}>
              <div className={styles['invoice-top']}>
                <div className={styles['invoice-id']}>
                  <span className={styles['invoice-id-hash']}>#</span>
                  <span>{userInvoice.id}</span>
                </div>
                <div className={styles['invoice-client']}>{userInvoice.clientName}</div>
              </div>
              <div className={styles['invoice-bottom']}>
                <div className={styles['invoice-bottom-left']}>
                  <div className={styles['invoice-date']}>
                    <span className={styles['invoice-date-due']}>Due </span>
                    <span className={styles['invoice-date-value']}>{new Date(userInvoice.paymentDue.seconds * 1000).toLocaleDateString()}</span>
                  </div>
                  <div className={styles['invoice-amount']}>{currencyFormater.format(userInvoice.totalPrice)}</div>
                </div>
                <div className={`${styles['invoice-status']} ${styles[userInvoice.state]}`}>
                  <div className={styles['invoice-status-label']}>{userInvoice.state}</div>
                </div>
              </div>
            </a>
          ))}
          {userInvoices?.length === 0 && isFetching && <Skeleton className={styles['invoice-skeleton']}/>}
        </div>
      ) : (
        <div className={`${styles['invoices-tablet-and-above']} ${isFetching ? styles['fetching'] : ''}`}>
          {userInvoices?.map((userInvoice) => (
            <a href='#' key={userInvoice.id} className={`${styles['invoice']} ${isFetching ? styles['fetching'] : ''}`}>
              <div className={styles['invoice-id']}>
                <span className={styles['invoice-id-hash']}>#</span>
                <span>{userInvoice.id}</span>
              </div>
              <div className={styles['invoice-date']}>
                <span className={styles['invoice-date-due']}>Due </span>
                <span className={styles['invoice-date-value']}>{new Date(userInvoice.paymentDue.seconds * 1000).toLocaleDateString()}</span>
              </div>
              <div className={styles['invoice-client']}>{userInvoice.clientName}</div>
              <div className={styles['invoice-amount']}>{currencyFormater.format(userInvoice.totalPrice)}</div>
              <div className={`${styles['invoice-status-wrapper']}`}>
                <div className={`${styles['invoice-status']} ${styles[userInvoice.state]}`}>
                  <div className={styles['invoice-status-label']}>{userInvoice.state}</div>
                </div>
              </div>
              <div>
                <img src={iconArrowRight} alt='Show More'/>
              </div>
            </a>
          ))}
          {userInvoices?.length === 0 && isFetching && <Skeleton className={styles['invoice-skeleton']}/>}
        </div>
      )}

      {!isFetching && (userInvoices?.length === 0 || !userInvoices) && (
        <div className={styles['not-found']}>
          <img src={illustrationEmpty} alt='' />
          <div className={styles['not-found-description']}>
            <div className={styles['not-found-title']}>There is nothing here</div>
            <div className={styles['not-found-subtitle']}>Create an invoice by clicking the <strong>New</strong> button and get started</div>
          </div>
        </div>
      )}

      {hasNextPage && (
        <div className={`${styles['load-more-button-wrapper']} ${isFetching ? styles['fetching'] : ''}`}>
          <Button appearance='primary' onClick={() => fetchNextPage()}>Load More</Button>
        </div>
      )}
    </div>
  );
}
