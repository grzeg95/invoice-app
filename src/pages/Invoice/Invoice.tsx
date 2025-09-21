import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router';
import {Button} from '../../components/ui/Button/Button';
import {Skeleton} from '../../components/ui/Skeleton/Skeleton';
import {BreakpointsDevices} from '../../context/Breakpoints/breakpoints';
import {useBreakpoints} from '../../context/Breakpoints/useBreakpoints';
import {invoicesDelete} from '../../firebase/endpoints/invoicesDelete';
import {invoicesMarkAsPaid} from '../../firebase/endpoints/invoicesMarkAsPaid';
import {invoicesMarkAsPending} from '../../firebase/endpoints/invoicesMarkAsPending';
import {getInvoice} from '../../firebase/queries/getInvoice';
import styles from './Invoice.module.scss';
import type {Invoice} from '../../models/firestore/invoice';
import {BigNumber} from 'bignumber.js';

const currencyFormater = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP'
});

export function Invoice() {

  const {activeBreakpoints} = useBreakpoints();
  const isMobile = !!activeBreakpoints.find((b) => b === BreakpointsDevices.mobile);

  const navigate = useNavigate();

  const params = useParams();

  const queryClient = useQueryClient();

  const {data: invoice, isFetching, error} = useQuery({
    queryKey: ['invoices', params.id],
    queryFn: () => getInvoice(params.id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const {mutate: invoiceMarkAsPaidMutate, isPending: invoicesMarkAsPendingIsPaid} = useMutation({
    mutationFn: (invoiceId: string) => invoicesMarkAsPaid()({invoiceId}),
  });

  const {mutate: invoiceMarkAsPendingMutate, isPending: invoiceMarkAsPendingMutationIsPending} = useMutation({
    mutationFn: (invoiceId: string) => invoicesMarkAsPending()({invoiceId}),
  });

  const {mutate: invoiceDeleteMutate, isPending: invoiceDeleteMutationIsPending} = useMutation({
    mutationFn: (invoiceId: string) => invoicesDelete()({invoiceId}),
  });

  useEffect(() => {
    if (!isFetching) {
      queryClient.removeQueries({queryKey: ['invoice', params.id]});
    }
  }, [isFetching, params.id, queryClient]);

  useEffect(() => {
    if (invoice === null) {
      navigate('/');
    }
  }, [invoice, navigate]);

  function changeState(invoice: Invoice) {

    if (invoice.state === 'pending') {
      invoiceMarkAsPaidMutate(invoice.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['invoices', invoice.id]});
        }
      });
    }

    if (invoice.state === 'draft') {
      invoiceMarkAsPendingMutate(invoice.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['invoices', invoice.id]});
        },
        onError: () => {
          queryClient.invalidateQueries({queryKey: ['invoices', invoice.id]});
        }
      });
    }
  }

  function invoiceDelete(invoice: Invoice) {
    invoiceDeleteMutate(invoice.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['invoices', invoice.id]});
      }
    })
  }

  if (error || invoice === null) {
    return null;
  }

  const mutationsIsPending = invoicesMarkAsPendingIsPaid || invoiceMarkAsPendingMutationIsPending || invoiceDeleteMutationIsPending;

  return (
    <>
      <div className={styles['invoice-wrapper']}>
        {isFetching && !invoice ? (
          <>
            <Skeleton className={styles['skeleton-invoice']}/>
            <Skeleton className={styles['skeleton-invoice']}/>
          </>
        ) : (
          <div className={`${styles['invoice']} ${mutationsIsPending || isFetching ? styles['fetching'] : ''}`}>

            <div className={`${styles['invoice-top']}  ${invoice!.state === 'paid' ? styles['invoice-top-without-actions'] : ''}`}>
              <div className={`${styles['invoice-status']} ${invoice!.state === 'paid' ? styles['invoice-status-without-actions'] : ''}`}>
                <div className={styles['invoice-status-label']}>State</div>
                <div className={`${styles['invoice-status-indicator']} ${styles[invoice!.state]}`}>{invoice!.state}</div>
              </div>

              {invoice!.state !== 'paid' && (
                <div className={styles['invoice-actions']}>
                  <Button disabled={mutationsIsPending} appearance='secondary'>Edit</Button>
                  <Button disabled={mutationsIsPending} onClick={() => invoiceDelete(invoice!)} appearance='danger'>Delete</Button>
                  <Button disabled={mutationsIsPending} onClick={() => changeState(invoice!)}>Mark as {invoice!.state === 'draft' ? 'Pending' : invoice!.state === 'pending' ? 'Paid' : ''}</Button>
              </div>
              )}
            </div>

            <div className={styles['invoice-bottom']}>

              <div className={styles['invoice-company']}>
                <div className={styles['company-description']}>
                  <div className={styles['invoice-id']}>
                    <span className={styles['invoice-id-hash']}>#</span>
                    {invoice!.id}
                  </div>
                  <div className={styles['invoice-property']}>{invoice!.description}</div>
                </div>
                <div className={styles['company-address']}>
                  <div className={styles['invoice-property']}>{invoice!.senderAddress.street}</div>
                  <div className={styles['invoice-property']}>{invoice!.senderAddress.city}</div>
                  <div className={styles['invoice-property']}>{invoice!.senderAddress.postCode}</div>
                  <div className={styles['invoice-property']}>{invoice!.senderAddress.country}</div>
                </div>
              </div>

              <div className={styles['invoice-recipient']}>
                <div className={styles['invoice-date-of-creation']}>
                  <div className={styles['invoice-property-label']}>Invoice Date</div>
                  <div className={styles['invoice-property-bold']}>{invoice!.issueDate.toDate().toDateString()}</div>
                </div>
                <div className={styles['invoice-client-address']}>
                  <div className={styles['invoice-property-label']}>Bill to</div>
                  <div className={styles['invoice-property-bold']}>{invoice!.clientName}</div>
                  <div className={styles['invoice-property']}>{invoice!.clientAddress.street}</div>
                  <div className={styles['invoice-property']}>{invoice!.clientAddress.city}</div>
                  <div className={styles['invoice-property']}>{invoice!.clientAddress.postCode}</div>
                  <div className={styles['invoice-property']}>{invoice!.clientAddress.country}</div>
                </div>
                <div className={styles['invoice-payment-due']}>
                  <div className={styles['invoice-property-label']}>Payment Due</div>
                  <div className={styles['invoice-property-bold']}>{invoice!.paymentDue.toDate().toDateString()}</div>
                </div>
                <div className={styles['invoice-send-to']}>
                  <div className={styles['invoice-property-label']}>Send To</div>
                  <div className={styles['invoice-property-bold']}>{invoice!.clientEmail}</div>
                </div>
              </div>

              {isMobile && (
                <div className={styles['invoice-items-mobile']}>
                  {invoice!.items.map((item, index) => (
                    <div key={index} className={styles['invoice-item']}>
                      <div className={styles['invoice-item-description']}>{item.name}</div>
                      <div className={styles['invoice-item-quantity']}>{item.quantity} x {currencyFormater.format(item.price)}</div>
                      <div className={styles['invoice-item-price']}>{currencyFormater.format(new BigNumber(item.quantity).times(new BigNumber(item.price)).toNumber())}</div>
                    </div>
                  ))}
                </div>
              )}

              {!isMobile && (
                <div className={styles['invoice-items-table']}>
                  <div className={styles['invoice-item-header']}>
                    <div className={`${styles['invoice-item-header-label']}`}>Item Name</div>
                    <div className={`${styles['invoice-item-header-label']} ${styles['align-right']}`}>QTY.</div>
                    <div className={`${styles['invoice-item-header-label']} ${styles['align-right']}`}>Price</div>
                    <div className={`${styles['invoice-item-header-label']} ${styles['align-right']}`}>Total</div>
                  </div>
                  {invoice!.items.map((item, index) => (
                    <div key={index} className={styles['invoice-item']}>
                      <div className={`${styles['invoice-item-property']}`}>{item.name}</div>
                      <div className={`${styles['invoice-item-quantity']} ${styles['invoice-item-property']} ${styles['align-right']}`}>{item.quantity}</div>
                      <div className={`${styles['invoice-item-price']} ${styles['invoice-item-property']} ${styles['align-right']}`}>{currencyFormater.format(item.price)}</div>
                      <div className={`${styles['invoice-item-property']} ${styles['align-right']}`}>{currencyFormater.format(new BigNumber(item.quantity).times(new BigNumber(item.price)).toNumber())}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles['invoice-total']}>
                <div className={styles['invoice-total-label']}>Amount Due</div>
                <div className={styles['invoice-total-value']}>
                  {currencyFormater.format(
                    invoice!.items.reduce((acc, cur) => {
                      return acc.plus(new BigNumber(cur.quantity).times(new BigNumber(cur.price)));
                    }, new BigNumber(0)).toNumber()
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
