package com.expensemanager.system.dto;

public class SummaryDTO {

    private double balance,totalCredit,totalDebit;
    private int totalTransactions;

    public SummaryDTO(double balance, double totalCredit, double totalDebit, int totalTransactions){
        this.balance= balance;
        this.totalCredit = totalCredit;
        this.totalDebit = totalDebit;
        this.totalTransactions= totalTransactions;
    }

    public double getBalance() {
        return balance;
    }

    public double getTotalCredit() {
        return totalCredit;
    }

    public double getTotalDebit() {
        return totalDebit;
    }

    public int getTotalTransactions() {
        return totalTransactions;
    }
}
