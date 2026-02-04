package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.PetAddReqDto;
import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.dto.request.PostCreateReqDto;
import com.korit.ssedampet_back.dto.response.mypage.*;
import com.korit.ssedampet_back.entity.Post;
import com.korit.ssedampet_back.mapper.MypageMapper;
import com.korit.ssedampet_back.mapper.PetMapper;
import com.korit.ssedampet_back.mapper.PostMapper;
import com.korit.ssedampet_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.PriorityBlockingQueue;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageMapper mypageMapper;
    private final PetMapper petMapper;
    private final FileService fileService;
    private final PostMapper postMapper;


    // TODO: 마이페이지 전체 정보 조회
    /*public MypageRespDto getMypage(int userId) {
        return MypageRespDto.builder()
                .user(getUser(userId))
                .summary(getSummary(userId))
                .pets(getPets(userId))
                .posts(getPosts(userId))
                .build();
    }*/

    public UserDto getUser(int userId) {
        UserDto user = mypageMapper.findMypageUser(userId);
        if (user == null) {
            try {
                throw new NotFoundException("user notfound!!");
            } catch (NotFoundException e) {
                throw new RuntimeException(e);
            }
        }
        return user;
    }

    public List<UserDto> getUsers() {
        List<UserDto> users = mypageMapper.findAllUsers();
        return users == null ? Collections.emptyList() : users;
    }



    public SummaryDto getSummary(int userId) {
        int myPostCnt = mypageMapper.countMyPosts(userId);
        int myLikedPostCnt = mypageMapper.countMyLikedPosts(userId);

        return SummaryDto.builder()
                .myPostCnt(myPostCnt)
                .myLikedPostCnt(myLikedPostCnt)
                .build();
    }

    public List<PetDto> getPets(int userId) {
        List<PetDto> pets = mypageMapper.findMyPets(userId);
        return pets == null ? Collections.emptyList() : pets;
    }

    public PetAddRespDto addPet(PetAddReqDto dto) {

        if (dto.getPetProfileImgUrl() == null || dto.getPetProfileImgUrl().trim().isEmpty()) {
            dto.setPetProfileImgUrl("/images/default_pet.png");
        }

        petMapper.insertPet(dto);

        return new PetAddRespDto(dto.getPetId());
    }



    public PostCreateRespDto createPostWithImage(PostCreateReqDto dto, MultipartFile file) {

        // 1) 이미지 저장 (없어도 글은 등록될 수 있게 하고 싶으면 null 허용)
        String postImgUrl = null;
        if (file != null && !file.isEmpty()) {

            postImgUrl = fileService.saveFile(file, "posts");
        }

        // 2) insert용 Entity/Param 만들기
        Post post = Post.builder()
                .userId(dto.getUserId())
                .petId(dto.getPetId())
                .postImgUrl(postImgUrl) // 저장된 URL 또는 null
                .postContent(dto.getPostContent())
                .postLocationTag(dto.getPostLocationTag())
                .postLikeCnt(0)
                .postCommentCnt(0)
                .build();

        // 3) insert (useGeneratedKeys로 postId 채워지게)
        postMapper.insertPost(post);

        return PostCreateRespDto.builder()
                .postId(post.getPostId())
                .postImgUrl(post.getPostImgUrl())
                .build();
    }

    public String updatePetProfileImage(int userId, int petId, MultipartFile file) {
        // ✅ 기존 로직 유지 (펫 이미지는 upload/pet 저장)
        String url = fileService.saveFile(file, "pet");

        // ✅ 기존 mypage_mapper.xml의 updatePetProfileImgUrlInt 사용
        mypageMapper.updatePetProfileImgUrlInt(userId, petId, url);
        return url;
    }

    public String updatePostImage(int userId, int postId, MultipartFile file) {
        // ✅ 1) 업로드 폴더 posts로 저장 (upload/posts/)
        String postImgUrl = fileService.saveFile(file, "posts");

        // ✅ 2) DB 업데이트 (본인 글만 업데이트되게 userId 조건 걸기)
        int updated = postMapper.updatePostImgUrl(userId, postId, postImgUrl);

        if (updated == 0) {
            // userId 조건 때문에 본인 글이 아니거나 postId가 없으면 0이 나올 수 있음
            throw new RuntimeException("게시글 이미지 업데이트 실패 (권한 없음 또는 게시글 없음)");
        }

        return postImgUrl;
    }


    public List<PostDto> getMyPosts(int userId) {
        List<PostDto> list = mypageMapper.findMyPosts(userId);

        // ✅ [A안] 여기서 이미지 URL을 로컬 경로로 변환해서 프론트에 내려줌
        list.forEach(p -> p.setPostImgUrl(normalizePostImgUrl(p.getPostImgUrl())));
        return list;
    }

    public List<PostDto> getLikedPosts(int userId) {
        List<PostDto> list = mypageMapper.findMyLikedPosts(userId);

        // ✅ [A안] 좋아요한 글도 동일하게 변환
        list.forEach(p -> p.setPostImgUrl(normalizePostImgUrl(p.getPostImgUrl())));
        return list;
    }

    /**
     * ✅ [A안 핵심] CDN 형태의 postImgUrl을 로컬 static 서빙(/image/posts/**) 형태로 변환
     *
     * 예)
     *  - DB: https://cdn.ssedampet.com/posts/2026/01/21/post_0011.jpg
     *  - 응답: /image/posts/2026/01/21/post_0011.jpg
     *
     * ⚠️ 전제: 실제 파일이 {file.path}/upload/posts/2026/01/21/post_0011.jpg 에 있어야 함
     */
    private String normalizePostImgUrl(String postImgUrl) {
        if (postImgUrl == null || postImgUrl.isBlank()) return postImgUrl;

        // 이미 로컬 서빙 경로면 그대로
        if (postImgUrl.startsWith("/image/")) return postImgUrl;

        // CDN/외부 URL이면 posts 경로를 찾아서 로컬 경로로 바꿔줌
        int idx = postImgUrl.indexOf("/posts/");
        if (idx != -1) {
            String after = postImgUrl.substring(idx + "/posts/".length()); // 2026/01/21/xxx.jpg
            return "/image/posts/" + after;
        }

        // posts 패턴을 못 찾으면 원본 유지
        return postImgUrl;
    }




}
