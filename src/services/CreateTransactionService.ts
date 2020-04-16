import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: CreateTransactionDTO): Transaction {
    if (!(data.type === 'income' || data.type === 'outcome')) {
      throw Error(`Received an invalid operation type: ${data.type}`);
    }
    if (data.type === 'income') {
      return this.transactionsRepository.create(data);
    }

    const balance = this.transactionsRepository.getBalance();
    const totalIncomes = balance.income;
    const totalOutcomes = balance.outcome + data.value;

    if (totalOutcomes > totalIncomes) {
      throw Error(`You don't have sufficient income to perform this operation`);
    }

    return this.transactionsRepository.create(data);
  }
}

export default CreateTransactionService;
