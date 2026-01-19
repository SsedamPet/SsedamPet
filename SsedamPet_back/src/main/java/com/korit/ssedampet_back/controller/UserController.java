package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.security.PrincipalUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping("/me")
    public ResponseEntity<User> getMe(@AuthenticationPrincipal PrincipalUser principalUser) {
        return ResponseEntity.ok(principalUser.getUser());
    }

    // ⬇️ 스웨거 테스트를 위해 이 부분을 추가하세요!
    @PostMapping("/details")
    public ResponseEntity<?> registerUserDetails(@RequestBody Map<String, Object> data) {
        System.out.println("받은 데이터: " + data);
        return ResponseEntity.ok("OK");
    }
}
