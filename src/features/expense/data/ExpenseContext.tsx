'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { IExpenseItem } from '../../../shared/expenseType';

const initialContext = {
  expenseData: [],
  setExpenseData: () => {},
};

type ContextType = {
  expenseData: IExpenseItem[];
  setExpenseData: Dispatch<SetStateAction<IExpenseItem[]>>;
};

export const ExpenseContext = createContext<ContextType>(initialContext);

export const ExpenseContextProvider = ({ children }: { children: any }) => {
  const [expenseData, setExpenseData] = useState<IExpenseItem[]>([]);

  const value = {
    expenseData,
    setExpenseData,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
