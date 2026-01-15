package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.response.mypage.MyPageRespDto;
import com.korit.ssedampet_back.dto.response.mypage.UserDto;
import com.korit.ssedampet_back.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MypageController {

    private final MypageService mypageService;

    // 로그인 없으니 userId를 쿼리스트링으로 받음
    /*@GetMapping("/mypage/getUser")
    public UserDto getMypage(@RequestParam int userId) {
        return mypageService.getMypagemit(userId);
    }*/

    @GetMapping("/mypage")
    public MyPageRespDto getMypage(@RequestParam int userId) {
        return mypageService.getMypage(userId);
    }


}
