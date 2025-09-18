import styles from './App.module.scss';
import {Nav} from './components/Nav/Nav';
import {Invoices} from './pages/Invoices/Invoices';

export function App() {

  return (
    <main className={styles['main-container']}>
      <Nav/>
      <div className={styles['content-container']}>
        <Invoices/>
      </div>
    </main>
  )
}
