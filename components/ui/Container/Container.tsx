import React, { FC, ReactNode, ComponentType, HTMLAttributes } from 'react';

interface Props {
  children: ReactNode | ReactNode[];
  wrapper?: ComponentType<HTMLAttributes<HTMLElement>>;
}

const Container: FC<Props> = ({ children, wrapper: Component = 'div' }) => {
  return <Component className='px-6 mx-auto max-w-8xl'>{children}</Component>;
};

export default Container;
