package lt.codeacademy.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Email {
    @NotBlank
    private String email;
    @NotBlank
    @Size(min = 5, max = 50)
    private String topic;
    @NotBlank
    @Size(max = 250)
    private String message;
}
