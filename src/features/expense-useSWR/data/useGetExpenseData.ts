import { axiosRequest } from '@/src/shared/axiosApi';
import { IExpenseItem } from '@/src/shared/expenseType';
import useSWR from 'swr';

export function useGetExpenseData() {
  const key = `https://express3-0319.vercel.app/api/expense/getexpense`;
  const { data, error, isLoading } = useSWR<any, Error>(key, axiosRequest.get);

  const newData = data?.map((item: IExpenseItem) => {
    const newItem = { ...item, id: item._id };
    delete newItem._id;

    return newItem;
  });

  return { newData, error, isLoading };
}
