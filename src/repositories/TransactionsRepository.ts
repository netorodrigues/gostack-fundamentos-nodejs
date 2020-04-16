import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValues = this.transactions.map(transaction => {
      if (transaction.type === 'income') return transaction.value;
      return 0;
    });

    const outcomeValues = this.transactions.map(transaction => {
      if (transaction.type === 'outcome') return transaction.value;
      return 0;
    });

    const income = incomeValues.reduce((acc, value) => acc + value);
    const outcome = outcomeValues.reduce((acc, value) => acc + value);
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create(transactionData: TransactionDTO): Transaction {
    const transaction = new Transaction(transactionData);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
