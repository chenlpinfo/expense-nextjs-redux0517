import { IExpenseItem } from '../../../shared/expenseType';
import styles from './ExpenseItemCard-CSS.module.scss';

export function ExpenseItemCard({ data }: { data: IExpenseItem }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.item}>{data.item}</div>
        <div className={styles.others}>
          <div className={styles.price}>${data.price}</div>
          <div className={styles.othersRow}>
            <div className={styles.username}>{data.username}</div>
            <div>{data.timeStamp.substring(0, 19).replaceAll('T', ' ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
