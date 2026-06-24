package com.expensemanager.system.dto;

import java.time.LocalDateTime;

public class TransactionDTO{

    private int id;
    private String title;
    private double amount;
    private String category;
    private String type;
    private LocalDateTime dateTime;
    private String description;

    public TransactionDTO(int id, String title, double amount, String category, String type, LocalDateTime dateTime, String description){
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.dateTime = dateTime;
        this.description = description;
    }
}
