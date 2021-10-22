import { createContext, FC, useContext, useMemo, useReducer } from 'react';

export interface StateModifiers {
  openSideBar: () => void;
  closeSideBar: () => void;
}

export interface StateValues {
  isSideBarOpen: boolean;
}

type State = StateValues & StateModifiers;

const stateModifiers = {
  openSideBar: () => {},
  closeSideBar: () => {},
};

const initialState = { isSideBarOpen: false };

const UIContext = createContext<State>({
  ...stateModifiers,
  ...initialState,
});

type Action = {
  type: 'OPEN_SIDEBAR' | 'CLOSE_SIDEBAR';
};

const uiReducer = (state: StateValues, action: Action) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        isSideBarOpen: true,
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        isSideBarOpen: false,
      };
    }
  }
};

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSideBar = () => dispatch({ type: 'OPEN_SIDEBAR' });

  const closeSideBar = () => dispatch({ type: 'CLOSE_SIDEBAR' });

  const value = useMemo(() => {
    return { ...state, openSideBar, closeSideBar };
  }, [state.isSideBarOpen]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};
