package com.expensemanager.system.service;

import com.expensemanager.system.model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction addTransaction(Transaction transaction);
    List<Transaction> getAllTransaction();
    Transaction getTransactionById(int id);
    Transaction updateTransaction(int id, Transaction transaction);
    String deleteTransaction(int id);
    double calculateBalance();

}
