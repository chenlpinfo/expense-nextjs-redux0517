'use client';
import Dataview from '@/src/features/expense/components/Dataview';
import { useContext, useEffect } from 'react';

import { ExpenseContext } from './data/ExpenseContext';
import { IExpenseItem } from '@/src/shared/expenseType';

export default function ExpenseFetch() {
  const { expenseData, setExpenseData } = useContext(ExpenseContext);

  useEffect(() => {
    getExpenseData();
  }, []);

  async function getExpenseData() {
    try {
      let url = 'https://express3-0319.vercel.app/api/expense/getexpense';
      const response = await fetch(url);
      const results: IExpenseItem[] = await response.json();
      setExpenseData(results);
      console.log('results', results);
    } catch (err) {
      console.error('error', err);
    } finally {
    }
  }

  return <Dataview data={expenseData} />;
}
