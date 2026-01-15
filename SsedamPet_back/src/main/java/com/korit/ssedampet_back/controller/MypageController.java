package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MypageController {

    private final MypageService mypageService;

    /*@GetMapping("/mypage/mock")
    public MypageRespDto getMypage() {
        return mypageService.getMypageMock();
    }*/

    // 로그인 없으니 userId를 쿼리스트링으로 받음
    @GetMapping("/mypage/getUser")
    public MypageRespDto getMypage(@RequestParam int userId) {
        return mypageService.getMypage(userId);
    }


}
