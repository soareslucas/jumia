
package pt.jumia.exercise.stats;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;


@Data
public class UsersByCountry {


    @Field("_id")
    private String country; 
    private long   total;
  
    public UsersByCountry(String country, long total) {
      this.country = country;
      this.total  = total;
    }
  }