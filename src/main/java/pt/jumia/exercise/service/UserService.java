package pt.jumia.exercise.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

import org.springframework.data.mongodb.core.MongoTemplate; 
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import pt.jumia.exercise.model.User;
import pt.jumia.exercise.repository.UserRepository;
import pt.jumia.exercise.stats.UsersByCountry;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


@Service
public class UserService {
 
    @Autowired
    private UserRepository userRepository;

    @Autowired
    MongoTemplate mongoTemplate;

 
    public void salvar(User user) {
        userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
     }
    

    public List<User> getUsersByCountry(Integer numberPage, String country) {



        Pageable pageable = PageRequest.of(numberPage, 10);

        Query query = new Query(Criteria 
        .where("country").is(country)).with(pageable);

        
        return mongoTemplate.find(query, User.class, "user");
    }


    public List<UsersByCountry> getTotalByCountry() {

        Aggregation agg = newAggregation(
            group("country").count().as("total")    
        );
        
        AggregationResults<UsersByCountry> groupResults 
            = mongoTemplate.aggregate(agg, User.class, UsersByCountry.class);
        List<UsersByCountry> result = groupResults.getMappedResults();


        
        return result;

    }
 
}