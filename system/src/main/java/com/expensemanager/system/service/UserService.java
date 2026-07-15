package com.expensemanager.system.service;

import com.expensemanager.system.model.User;

public interface UserService {
    User register(User user);
    User login(User user);
}
