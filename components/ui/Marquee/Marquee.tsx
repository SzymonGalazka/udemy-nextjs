import React, { FC, ReactNode } from 'react';
import Ticker from 'react-ticker';
import styles from './Marquee.module.css';
import cn from 'classnames';

interface Props {
  children: ReactNode | ReactNode[];
  variant?: 'primary' | 'secondary';
}

const Marquee: FC<Props> = ({ children, variant = 'primary' }) => {
  const rootClassName = cn(styles.root, {
    [styles.secondary]: variant === 'secondary',
  });
  return (
    <div className={rootClassName}>
      <Ticker>
        {() => <div className={styles.container}>{children}</div>}
      </Ticker>
    </div>
  );
};

export default Marquee;
