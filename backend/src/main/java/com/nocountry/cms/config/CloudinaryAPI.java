package com.nocountry.cms.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
public class CloudinaryAPI {


    public String uploadImage(String filePath) {

        Dotenv dotenv = Dotenv.load();
        Cloudinary cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));


        Map params1 = ObjectUtils.asMap(
                "use_filename", true,
                "unique_filename", false,
                "overwrite", true
        );

        try {
            Map uploadResult = cloudinary.uploader().upload(filePath, params1);

            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }


}
