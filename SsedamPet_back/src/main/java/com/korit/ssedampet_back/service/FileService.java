package com.korit.ssedampet_back.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    @Value("${file.path}")
    private String projectPath;

    public String saveFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String originName = file.getOriginalFilename();
        String extension = originName.substring(originName.lastIndexOf("."));
        String saveName = UUID.randomUUID().toString().replaceAll("-", "") + extension;

        Path uploadPath = Paths.get(projectPath, "upload", "profile");

        try {
            Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(saveName);
            file.transferTo(filePath.toFile());

            return "/image/profile/" + saveName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }


}
