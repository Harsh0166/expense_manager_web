package com.expensemanager.system.service;

import com.expensemanager.system.model.Role;
import com.expensemanager.system.model.User;
import com.expensemanager.system.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository repository;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository,PasswordEncoder passwordEncoder){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(User user) {
        if(repository.existsByEmail(user.getEmail())){
            throw new RuntimeException("Email already exists");
        }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole(Role.USER);

        return repository.save(user);
    }

    public User login(User user){
        Optional<User> existingUser = repository.findByEmail(user.getEmail());
        if(existingUser.isEmpty()){
            throw new RuntimeException("User Not Found");
        }
        return ;
    }
}
