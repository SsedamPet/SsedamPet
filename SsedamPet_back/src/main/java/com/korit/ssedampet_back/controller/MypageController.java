package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.response.mypage.*;
import com.korit.ssedampet_back.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MypageController {

    private final MypageService mypageService;

    @GetMapping("/user")
    public UserDto user(@RequestParam int userId) {
        return mypageService.getUser(userId);
    }

    @GetMapping("/users")
    public List<UserDto> users() {
        return mypageService.getUsers();
    }

    @GetMapping("/summary")
    public SummaryDto summary(@RequestParam int userId) {
        return mypageService.getSummary(userId);
    }

    @GetMapping("/pets")
    public List<PetDto> pets(@RequestParam int userId) {
        return mypageService.getPets(userId);
    }

    @GetMapping("/posts")
    public List<PostDto> posts(@RequestParam int userId) {
        return mypageService.getPosts(userId);
    }


}
