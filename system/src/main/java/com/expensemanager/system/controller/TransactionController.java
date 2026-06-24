package com.expensemanager.system.controller;

import com.expensemanager.system.model.Transaction;
import com.expensemanager.system.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class TransactionController {

    private TransactionService service;

    public TransactionController(TransactionService service){
        this.service =service;
    }

    @GetMapping("/transactions")
    public List<Transaction> allTran(){
        List<Transaction> list = service.getAllTransaction();
        return list;
    }

    @GetMapping("/transactions/{id}")
    public Transaction TranById(@PathVariable int id){
        Transaction tran = service.getTransactionById(id);
        return tran;
    }

    @PostMapping("/transactions")
    public ResponseEntity<Transaction> addTran(@Valid @RequestBody Transaction transaction){
        Transaction servicetran = service.addTransaction(transaction);
        return ResponseEntity.status(201).body(servicetran);
    }

    @PutMapping("/transactions/{id}")
    public Transaction updateTran(@PathVariable int id, @Valid @RequestBody Transaction transaction){
        return service.updateTransaction(id,transaction);
    }

    @DeleteMapping("/transactions/{id}")
    public String deleteTran(@PathVariable int id){
        return service.deleteTransaction(id);
    }

    @GetMapping("/transactions/balance")
    public double balance(){
        return service.calculateBalance();
    }
}
