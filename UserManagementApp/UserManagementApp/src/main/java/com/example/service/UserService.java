package com.example.service;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.dto.UserDTO;
import com.example.entity.User;
import com.example.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository repo,
                       BCryptPasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User createUser(UserDTO dto) {

        if(repo.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setUsername(dto.getUsername());
        user.setPassword(
                encoder.encode(dto.getPassword())
        );

        return repo.save(user);
    }

    public void importCSV(MultipartFile file) {

        try {

            BufferedReader reader =
                    new BufferedReader(
                            new InputStreamReader(file.getInputStream())
                    );

            String line;

            while((line = reader.readLine()) != null){

                String[] data = line.split(",");

                if(!repo.existsByUsername(data[0])) {

                    User user = new User();

                    user.setUsername(data[0]);

                    user.setPassword(
                            encoder.encode(data[1])
                    );

                    repo.save(user);
                }
            }

        } catch(Exception e){
            throw new RuntimeException("CSV import failed");
        }
    }
}
