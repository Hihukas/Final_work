package lt.codeacademy.api.service;

import lt.codeacademy.api.dto.Email;
import lt.codeacademy.api.exception.EmailException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public String sendSimpleEmail(Email email) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(email.getEmail());
            mailMessage.setText(email.getMessage());
            mailMessage.setSubject(email.getTopic());

            javaMailSender.send(mailMessage);

            return "Email sent Successfully!";

        } catch (Exception e) {
            throw new EmailException("We could not send email.");
        }
    }
}
