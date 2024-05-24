import { IExpenseItem } from '../../../shared/expenseType';

export function ExpenseItemCard({ data }: { data: IExpenseItem }) {
  return (
    <div className='shadow-xl bg-teal-600 text-white border-solid border-2 border-teal-800 m-8 rounded-lg '>
      <div className='flex m-4'>
        <div className='text-2xl text-center  border-solid border-2 border-teal-200 w-24 h-24 rounded-full flex justify-center items-center'>{data.item}</div>
        <div className='flex flex-col mx-8 justify-around'>
          <div className='text-2xl font-bold'>${data.price}</div>
          <div className='flex text-zinc-200 gap-4 '>
            <div className='capitalize'>{data.username}</div>
            <div>{data.timeStamp.substring(0, 19).replaceAll('T', ' ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
