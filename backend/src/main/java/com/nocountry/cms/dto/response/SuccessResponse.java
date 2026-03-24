package com.nocountry.cms.dto.response;

public record SuccessResponse<Long>(int estado, String mensaje, Long id) {}

