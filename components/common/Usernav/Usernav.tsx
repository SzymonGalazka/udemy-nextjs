import React, { FC } from 'react';
import Link from 'next/link';
import styles from './Usernav.module.css';
import { Bag, Heart } from '@components/icons';
import { useUI } from '@components/ui/context';
import useCart from '@framework/cart/use-cart';
import { LineItem } from '@common/types/cart';

const Usernav: FC = () => {
  const { openSideBar } = useUI();
  const { data } = useCart();

  const itemsCount =
    data?.lineItems.reduce((count: number, item: LineItem) => {
      return count + item.quantity;
    }, 0) ?? 0;

  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Bag onClick={openSideBar} />
          {itemsCount > 0 && (
            <span className={styles.bagCount}>{itemsCount}</span>
          )}
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
