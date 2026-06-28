package com.expensemanager.system.service;

import com.expensemanager.system.dto.SummaryDTO;
import com.expensemanager.system.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public interface TransactionService {
    Transaction addTransaction(Transaction transaction);
    List<Transaction> getAllTransaction();
    Transaction getTransactionById(int id);
    Transaction updateTransaction(int id, Transaction transaction);
    String deleteTransaction(int id);
    SummaryDTO calculateBalance();
    Page<Transaction> getTransactions(String keyword, String type, String category, Double minAmount, Double maxAmount, LocalDate fromDate, LocalDate toDate, String sort, int page, int size);
}
