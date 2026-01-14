package com.korit.ssedampet_back.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String SECURITY_SCHEME_NAME = "Bearer Authentication";

    //swagger 세팅
    @Bean
    public OpenAPI openAPIConfig() {

        // swagger 기본정보
        // info, addSecurityItem, components 필요
        Info info = new Info();
        info.title("쓰담펫(반려일기) API 명세서");
        info.version("1.0");
        info.description("반려동물 일기 및 건강 관리 플랫폼 API 문서");

        // securityRequirement 설정
        SecurityRequirement securityRequirement = new SecurityRequirement();
        securityRequirement.addList(SECURITY_SCHEME_NAME);

        // securityScheme 설정
        // JWT 토큰 인증 적용
        SecurityScheme securityScheme = new SecurityScheme();
        securityScheme.name(SECURITY_SCHEME_NAME);
        securityScheme.type(SecurityScheme.Type.HTTP);
        securityScheme.scheme("bearer");
        securityScheme.bearerFormat("JWT");


        Components components =  new Components();
        components.addSecuritySchemes(SECURITY_SCHEME_NAME, securityScheme);

        return new OpenAPI()
                .info(info)
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}
