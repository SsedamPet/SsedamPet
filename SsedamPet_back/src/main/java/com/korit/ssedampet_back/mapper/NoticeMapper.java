package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.response.main.NoticeDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeMapper {
    int insertNotice(NoticeDto dto);
    List<NoticeDto> findByUserId(@Param("userId") int userId, @Param("limit") int limit, @Param("offset") int offset);
    int countUnread(@Param("userId") int userId);
    int markRead(@Param("userId") int userId, @Param("noticeId") int noticeId);
    int markReadAll(@Param("userId") int userId);
    // SSE 유실 복구용: lastNoticeId 이후 알림 재전송
    List<NoticeDto> findAfterId(@Param("userId") int userId, @Param("lastNoticeId") int lastNoticeId);
}
