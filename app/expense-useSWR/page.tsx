import ExpenseUseSWR from '@/src/features/expense-useSWR/Expense-useSWR';
import { ExpenseContextProvider } from '@/src/features/expense/data/ExpenseContext';

export default function ExpensePage() {
  return (
    <ExpenseContextProvider>
      <ExpenseInner />
    </ExpenseContextProvider>
  );
}

function ExpenseInner() {
  return (
    <>
      <ExpenseUseSWR />{' '}
    </>
  );
}
