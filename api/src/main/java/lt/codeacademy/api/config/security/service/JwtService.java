package lt.codeacademy.api.config.security.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import lt.codeacademy.api.dto.Role;
import lt.codeacademy.api.dto.User;
import lt.codeacademy.api.exception.InvalidTokenException;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
@Profile("h2")
public class JwtService {

    private final long tokenValidTimeMs;
    private final byte[] secretKey;

    public JwtService(@Value("${security.jwt.secret.key}") byte[] secretKey,
                      @Value("#{${security.jwt.valid.token.min} * 60000}") long tokenValidTimeMs) {
        this.secretKey = secretKey;
        this.tokenValidTimeMs = tokenValidTimeMs;
    }

    public String generateToken(User user) {
        Date date = new Date();
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setAudience("ui")
                .setIssuer("api")
                .setSubject(user.getUsername())
                .setExpiration(new Date(date.getTime() + tokenValidTimeMs))
                .setIssuedAt(date)
                .claim("roles", user.getRoles().stream().map(Role::getAuthority).toList())
                .signWith(Keys.hmacShaKeyFor(secretKey), SignatureAlgorithm.HS512)
                .compact();
    }

    public Authentication parseToken(String token) {
        try {
            JwtParser jwtParser = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build();

            Jws<Claims> claimsJws = jwtParser.parseClaimsJws(token);
            Claims body = claimsJws.getBody();

            String username = body.getSubject();
            List<SimpleGrantedAuthority> roles = ((List<String>) body.get("roles")).stream().map(SimpleGrantedAuthority::new).toList();

            return new UsernamePasswordAuthenticationToken(username, null, roles);
        } catch (Exception e) {
            throw new InvalidTokenException();
        }
    }
}
