import {createBrowserRouter, redirect, RouterProvider} from 'react-router';
import styles from './App.module.scss';
import {Nav} from './components/Nav/Nav';
import {Invoices} from './pages/Invoices/Invoices';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Invoices
  },
  {
    path: '*',
    loader: async () => redirect('/')
  }
]);

export function App() {

  return (
    <main className={styles['main-container']}>
      <Nav/>
      <div className={styles['content-container']}>
        <RouterProvider router={router} />
      </div>
    </main>
  )
}
