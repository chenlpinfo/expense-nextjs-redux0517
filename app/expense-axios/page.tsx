import ExpenseAxios from '@/src/features/expense-axios/Expense-axios';
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
      <ExpenseAxios />
    </>
  );
}
