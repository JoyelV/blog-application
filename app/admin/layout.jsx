import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SessionProviderWrapper from '../Components/SessionProviderWrapper';

export default function Layout({ children }) {
  return (
    <>
      <ToastContainer theme="dark" />
      <SessionProviderWrapper>
        {children}
      </SessionProviderWrapper>
    </>
  )
}