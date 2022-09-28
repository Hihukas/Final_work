package lt.codeacademy.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Swagger {

    @Bean
    public OpenAPI api() {
        return new OpenAPI().info(info());
    }

    private Info info() {
        return new Info().title("API")
                .description("FINAL WORK")
                .version("1.0")
                .contact(contact());
    }

    private Contact contact() {
        Contact contact = new Contact();
        contact.setName("Aleksandras Dudėnas");
        contact.setEmail("aleks.dudenas@gmail.com");

        return contact;
    }
}
