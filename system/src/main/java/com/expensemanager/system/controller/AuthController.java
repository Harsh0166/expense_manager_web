package com.expensemanager.system.controller;

import com.expensemanager.system.model.User;
import com.expensemanager.system.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

    private UserService service;

    public AuthController(UserService service){
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerData(@RequestBody User user){

        User savedUser = service.register(user);
        return ResponseEntity.status(201).body(savedUser);
    }
}
