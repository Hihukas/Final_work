package lt.codeacademy.api.repository;

import lt.codeacademy.api.entity.PhotoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PhotoRepository extends JpaRepository<PhotoEntity, UUID> {
    List<PhotoEntity> findAllByProjectEntityId(UUID id);
}
