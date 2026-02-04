// src/main/java/com/korit/ssedampet_back/service/FileService.java
package com.korit.ssedampet_back.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    @Value("${file.path}")
    private String projectPath;

    /**
     * ✅ 기존 로직 유지: 유저 프로필 저장은 기본적으로 /upload/profile 로 저장
     */
    public String saveFile(MultipartFile file) {
 
        return saveFile(file, "profile"); // ✅ [추가] 내부적으로 폴더 지정 버전 호출
    }

    /**
     * ✅ [A안] 폴더를 지정해서 저장할 수 있는 공용 메서드 추가
     * - folder: "profile", "pet", "posts" 등
     * - WebMvcConfig에서 /image/** → {projectPath}/upload/** 로 매핑되어 있으므로
     *   접근 URL은 "/image/{folder}/{파일명}" 형태로 반환하면 됨
     */
    public String saveFile(MultipartFile file, String folder) {
        if (file == null || file.isEmpty()) return null;
        

        String petDirPath = projectPath + "/upload/pet";
        File dir = new File(petDirPath);
        if(!dir.exists()) dir.mkdirs();

        String originName = file.getOriginalFilename();
        String extension = originName.substring(originName.lastIndexOf("."));
        String saveName = System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0,8) + extension;

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


    

    public String savePostFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }


        String originName = file.getOriginalFilename();
        String extension = "";
        if (originName != null && originName.lastIndexOf(".") != -1) {
            extension = originName.substring(originName.lastIndexOf("."));
        }

        String saveName = System.currentTimeMillis() + "_" + UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8) + extension;

        Path uploadPath = Paths.get(projectPath, "upload", "post");

        try {
            // ✅ 저장 경로: {file.path}/upload/{folder}/
            Path uploadDir = Paths.get(projectPath, "upload", folder);
            Files.createDirectories(uploadDir);

            Path filePath = uploadDir.resolve(saveName);
            file.transferTo(filePath.toFile());

            return "/image/post/" + saveName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * ✅ (선택) 기존에 service에서 savePetProfile(...) 같은 메서드를 쓰고 있었다면
     * 그대로 유지하고 싶을 때 이렇게 wrapper로만 두면 됨.
     */
    public String savePetProfile(MultipartFile file) {
        return saveFile(file, "pet");
    }

    public String savePostImage(MultipartFile file) {
        return saveFile(file, "posts");
    }


}
