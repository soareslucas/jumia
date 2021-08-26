package pt.jumia.exercise.repository;


import pt.jumia.exercise.model.User;
import org.springframework.data.repository.query.Param;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;





/**
 * @author Lucas Soares
 */

@RepositoryRestResource(collectionResourceRel = "users", path = "users", exported = true)
public interface UserRepository extends MongoRepository<User, String> {

	List<User> findByCountry(@Param("country") String country);



}