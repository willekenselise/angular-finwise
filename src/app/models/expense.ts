export interface Expense {
    uid: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    amount: number;
    transactionDate: Date;
    transactionNature: "crédit" | "débit";
    transactionName: string
    categoryId: string;
    userId: string;
}