export interface Expense {
  id: string;
  description: string;
  amount: number | null;
  date: Date | null;
  userId: string;
}