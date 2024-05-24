import ExpenseFetch from '@/src/features/expense/Expense-fetch';
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
      hj
      <ExpenseFetch />
    </>
  );
}
