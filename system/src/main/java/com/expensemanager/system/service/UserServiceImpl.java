package com.expensemanager.system.service;

import com.expensemanager.system.model.Role;
import com.expensemanager.system.model.User;
import com.expensemanager.system.repository.UserRepository;

public class UserServiceImpl implements UserService{

    private UserRepository repository;
    private BCryptPasswordEncoder passwordEncoder;
    @Override
    public User register(User user) {
        if(repository.existsByEmail(user.getEmail)){
            throw new RuntimeException("Email already exists");
        }
        else{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole(Role.USER);

        }

        return repository.save(user);
        ;
    }
}
