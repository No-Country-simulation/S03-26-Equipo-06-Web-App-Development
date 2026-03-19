package com.nocountry.cms.dto.response;

public record FailedResponse<detalle>(int estado, String error, String detalle){}