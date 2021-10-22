import React, { FC } from 'react';
import Link from 'next/link';
import styles from './Usernav.module.css';
import { Bag, Heart } from '@components/icons';
import { useUI } from '@components/ui/context';
import useCart from '@common/cart/use-cart';

const Usernav: FC = () => {
  const { openSideBar } = useUI();
  const { data } = useCart();
  
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Bag onClick={openSideBar} />
        </li>
        <li className={styles.item}>
          <Link href='/wishlist'>
            <a>
              <Heart />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Usernav;
