import styles from './App.module.scss';
import {Nav} from './components/Nav/Nav';

export function App() {

  return (
    <main className={styles['main-container']}>
      <Nav/>
      <div className={styles['content-container']}></div>
    </main>
  )
}
