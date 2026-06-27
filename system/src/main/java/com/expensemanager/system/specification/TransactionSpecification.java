package com.expensemanager.system.specification;

import com.expensemanager.system.model.Transaction;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class TransactionSpecification {
    public static Specification<Transaction> hasType(String type){
        return (root,query,cb)->
                cb.equal(root.get("type"),type);
    }

    public static Specification<Transaction> hasCategory(String category){
        return(root,query,cb)->
                cb.equal(root.get("category"),category);
    }

    public static Specification<Transaction> hasKeyword(String keyword){
        return(root,query,cb)->
        {
            Predicate titlePredicate = cb.like(cb.lower(root.get("title")), keyword);

            Predicate categoryPredicate = cb.like(cb.lower(root.get("category")), keyword);
            Predicate descriptionPredicate = cb.like(cb.lower(root.get("description")), keyword);

            return cb.or(titlePredicate, categoryPredicate, descriptionPredicate);
        };
    }

    public static Specification<Transaction> hasMinAmount(Double minAmount){
        return(root,query,cb)->
                cb.greaterThanOrEqualTo(root.get("amount"),minAmount);
    }
    public static Specification<Transaction> hasMaxAmount(Double maxAmount){
        return(root,query,cb)->
                cb.lessThanOrEqualTo(root.get("amount"),maxAmount);
    }
}
