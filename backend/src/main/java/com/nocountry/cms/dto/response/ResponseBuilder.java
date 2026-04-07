package com.nocountry.cms.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder {

    public static <T> ResponseEntity<ApiResponse<T>> success(String mensaje, T data) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(200, mensaje, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(String mensaje, T data) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(201, mensaje, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> validationError(String mensaje, T data) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>(400, mensaje, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> notFound(String mensaje, T data) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(404, mensaje, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> internalServerError(String mensaje, T data) {

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(500, mensaje, data));
    }

}
