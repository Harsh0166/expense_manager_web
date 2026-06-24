package com.expensemanager.system.exception;

import com.expensemanager.system.model.Transaction;

public class TransactionNotFoundException extends RuntimeException {

    public TransactionNotFoundException(String message){
        super(message);
    }
}
