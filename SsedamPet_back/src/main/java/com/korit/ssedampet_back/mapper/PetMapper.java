package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.entity.PetEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PetMapper {
    public int savePet(PetEntity petEntity);
}
