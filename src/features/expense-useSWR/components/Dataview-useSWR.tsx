import { Loading } from '@/src/shared/components/Loading';
import { IExpenseItem } from '../../../shared/expenseType';
import { ExpenseItemCardMUI } from './ExpenseItemCard-MUI';

type props = {
  data: IExpenseItem[];
  isLoading: boolean;
};

export default function DataviewUseSWR({ data, isLoading }: props) {
  if (isLoading) return <Loading />;

  return (
    <>
      {/* <div className='text-xl font-bold mx-8 mt-8'>Use CSS Module</div>
      {data?.map((expense) => {
        return <ExpenseItemCard data={expense} key={expense.timeStamp} />;
      })}

      <div className='text-xl font-bold mx-8'>Use Tailwind</div>
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
