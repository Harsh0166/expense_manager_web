package com.expensemanager.system.repository;

import com.expensemanager.system.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Integer>, JpaSpecificationExecutor<Transaction> {

    @Query("""
    SELECT t FROM Transaction t WHERE
    LOWER(t.title) LIKE :keyword
    OR LOWER(t.category) LIKE :keyword
    OR LOWER(t.description) LIKE :keyword
    """)
    List<Transaction> searchTransactions(String keyword);
}
