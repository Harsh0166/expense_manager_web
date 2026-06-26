package com.expensemanager.system.service;

import com.expensemanager.system.dto.SummaryDTO;
import com.expensemanager.system.exception.TransactionNotFoundException;
import com.expensemanager.system.model.Transaction;
import com.expensemanager.system.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService{

//    private ArrayList<Transaction> list = new ArrayList<>();
//    private int nextId = 1 ;
    private TransactionRepository repository;

    public TransactionServiceImpl(TransactionRepository repository) {
        this.repository = repository;
    }

    @Override
    public Transaction addTransaction(Transaction transaction) {
//        transaction.setId(nextId);
        transaction.setDateTime(LocalDateTime.now());
//        list.add(transaction);
//        nextId++;
        return repository.save(transaction);

    }

    @Override
    public List<Transaction> getAllTransaction() {

        return repository.findAll();
    }

    @Override
    public Transaction getTransactionById(int id) {
//        for(int i = 0;i< list.size();i++){
//            if(list.get(i).getId() == id){
//                return list.get(i);
//            }
//        }
//        throw new TransactionNotFoundException("Transaction not found.");
        Optional<Transaction> result =repository.findById(id);
        if(result.isPresent()){
            return result.get();
        }
        else{
            throw new TransactionNotFoundException("Transaction not found.");

        }
//        return repository.findById(id).orElseThrow(() ->new TransactionNotFoundException("Transaction not found."));

    }

    @Override
    public Transaction updateTransaction(int id, Transaction transaction) {
//        for(int i = 0;i< list.size();i++){
//            Transaction currentTransaction =list.get(i);
//            if(currentTransaction.getId() == id){
//                currentTransaction.setAmount(transaction.getAmount());
//                currentTransaction.setTitle(transaction.getTitle());
//                currentTransaction.setCategory(transaction.getCategory());
//                currentTransaction.setDescription(transaction.getDescription());
//                currentTransaction.setType(transaction.getType());
//                currentTransaction.setDateTime(transaction.getDateTime());
//
//                return currentTransaction;
//            }
//        }
//        throw new TransactionNotFoundException("Transaction not found");
        Optional<Transaction> result = repository.findById(id);
        if(result.isEmpty()){
            throw new TransactionNotFoundException("Transaction not found.");
        }
        else{
            Transaction existingTransaction = result.get();

            existingTransaction.setTitle(transaction.getTitle());
            existingTransaction.setAmount(transaction.getAmount());
            existingTransaction.setCategory(transaction.getCategory());
            existingTransaction.setDescription(transaction.getDescription());
            existingTransaction.setType(transaction.getType());
            existingTransaction.setDateTime(transaction.getDateTime());

            return repository.save(existingTransaction);

        }
    }

    @Override
    public String deleteTransaction(int id) {

//        for (int i = 0;i< list.size();i++){
//            Transaction currentTransaction = list.get(i);
//            if(currentTransaction.getId()==id){
//                list.remove(i);
//                return "Transaction deleted";
//            }
//        }
//        throw new TransactionNotFoundException("Transaction not found");

        Optional<Transaction> result = repository.findById(id);
        if (result.isEmpty()) {
            throw new TransactionNotFoundException("Transaction not found.");
        } else {
            repository.deleteById(id);
            return "Transaction deleted";
        }
    }

    @Override
    public SummaryDTO calculateBalance() {
        double totalCredit= 0;
        double totalDebit = 0;
        List<Transaction> list = repository.findAll();
        for (int i = 0;i<list.size();i++){
            Transaction currentTransaction = list.get(i);
            if(currentTransaction.getType().equals("CREDIT")){
                double income = currentTransaction.getAmount();
                totalCredit += income;
            }
            else{
                double expense = currentTransaction.getAmount();
                totalDebit +=expense;
            }
        }
        double balance = totalCredit - totalDebit;
        int totalTransactions = list.size();
        return new SummaryDTO(balance,totalCredit,totalDebit,totalTransactions);
    }

        @Override
        public List<Transaction> searchTransactions(String keyword) {
            keyword = keyword.trim().toLowerCase();
            keyword = "%"+keyword+"%";
            return repository.searchTransactions(keyword);
        }


}
