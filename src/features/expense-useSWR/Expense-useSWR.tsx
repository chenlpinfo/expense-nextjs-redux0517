'use client';

import ActionBar from './components/ActionBar';
import DataviewUseSWR from './components/Dataview-useSWR';
import { useGetExpenseData } from './data/useGetExpenseData';

export default function ExpenseUseSWR() {
  const { newData, error, isLoading } = useGetExpenseData();

  if (error) {
    return <p>Failed to fetch</p>;
  }

  return (
    <>
      <div className='m-8 text-right '>
        <ActionBar />
      </div>
      <DataviewUseSWR data={newData} isLoading={isLoading} />;
    </>
  );
}
