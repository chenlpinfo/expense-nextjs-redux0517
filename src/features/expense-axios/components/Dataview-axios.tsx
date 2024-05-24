import { Loading } from '@/src/shared/components/Loading';

import { IExpenseItem } from '../../../shared/expenseType';
import { ExpenseItemCard } from '../../expense-useSWR/components/ExpenseItemCard-CSS';
import { ExpenseItemCardMUI } from '../../expense-useSWR/components/ExpenseItemCard-MUI';

type props = {
  data: IExpenseItem[];
  isLoading: boolean;
};

export default function DataviewAxios({ data, isLoading }: props) {
  if (isLoading) return <Loading />;

  return (
    <>
      {/* data: {JSON.stringify(data)} */}
      <div className='text-xl font-bold mx-8 mt-8'>Use CSS Module</div>
      {data?.map((expense) => {
        return <ExpenseItemCard data={expense} key={expense.timeStamp} />;
      })}

      {/* <div className='text-xl font-bold mx-8'>Use Tailwind</div>
      {data?.map((expense) => {
        return <ExpenseItemCardTailwind data={expense} key={expense.timeStamp} />;
      })} */}

      <div className='text-xl font-bold mx-8'>Use MUI</div>
      {data?.map((expense) => {
        return <ExpenseItemCardMUI data={expense} key={expense.timeStamp} />;
      })}
    </>
  );
}
