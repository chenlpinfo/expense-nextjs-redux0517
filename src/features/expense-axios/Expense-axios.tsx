'use client';
import { axiosRequest } from '@/src/shared/axiosApi';
import { useContext, useEffect, useState } from 'react';
import { IExpenseItem } from '../../shared/expenseType';
import { ExpenseContext } from '../expense/data/ExpenseContext';
import DataviewAxios from './components/Dataview-axios';

export default function ExpenseAxios() {
  const { expenseData, setExpenseData } = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getExpenseData();
  }, []);

  async function getExpenseData() {
    try {
      const results: IExpenseItem[] = await axiosRequest.get('https://express3-0319.vercel.app/api/expense/getexpense');
      setExpenseData(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return <DataviewAxios data={expenseData} isLoading={isLoading} />;
}
