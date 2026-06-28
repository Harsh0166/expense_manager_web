package com.expensemanager.system.controller;

import com.expensemanager.system.dto.SummaryDTO;
import com.expensemanager.system.model.Transaction;
import com.expensemanager.system.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class    TransactionController {

    private TransactionService service;

    public TransactionController(TransactionService service){
        this.service =service;
    }

    @GetMapping("/transactions")
    public Page<Transaction> getRequiredTransaction(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minAmount,
            @RequestParam(required = false) Double maxAmount,
            @RequestParam(required = false) LocalDate fromDate,
            @RequestParam(required = false) LocalDate toDate,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return service.getTransactions(keyword,type,category,minAmount,maxAmount,fromDate,toDate,sort,page,size);
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
    public SummaryDTO balance(){
        return service.calculateBalance();
    }
}
