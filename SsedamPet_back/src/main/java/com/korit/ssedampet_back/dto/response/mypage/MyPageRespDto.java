package com.korit.ssedampet_back.dto.response.mypage;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyPageRespDto {
    private UserDto user;
    private SummaryDto summary;
    private List<UserDto> users;
    private List<PetDto> pets;
    private List<PostDto> posts;
}
