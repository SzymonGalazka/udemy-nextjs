import { FC } from 'react';
import { Footer, Navbar } from '@components/common';
import { Sidebar } from '@components/ui';
import { ApiProvider } from '@framework';
import { CartSidebar } from '@components/cart';
import { useUI } from '@components/ui/context';
import s from './Layout.module.css';

const Layout: FC = ({ children }) => {
  const { isSideBarOpen, closeSideBar } = useUI();

  return (
    <ApiProvider>
      <div className={s.root}>
        <Navbar />
        <Sidebar onClose={closeSideBar} isOpen={isSideBarOpen}>
          <CartSidebar />
        </Sidebar>
        <main className='fit'>{children}</main>
        <Footer />
      </div>
    </ApiProvider>
  );
};

export default Layout;
