package com.example.controller;



import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.dto.UserDTO;
import com.example.entity.User;
import com.example.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

    private final UserService service;

    public UserController(UserService service){
        this.service = service;
    }

    @GetMapping
    public List<User> getUsers(){
        return service.getAllUsers();
    }

    @PostMapping
    public User createUser(
            @Valid @RequestBody UserDTO dto){
        return service.createUser(dto);
    }

    @PostMapping("/import")
    public String importCSV(
            @RequestParam("file")
            MultipartFile file){

        service.importCSV(file);

        return "CSV imported successfully";
    }
}
