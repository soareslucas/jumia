package pt.jumia.exercise.model;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
 

@Document(collection = "user")
@Data
public class User {
	
	@Id
	private  String id;
	private String email;
    private String phone;
	private String country;
	private String parcelWeight;


	public User() {}

	public User(String email, String phone, String country, String parcelWeight ) {
		this.email = email;
        this.phone = phone;
		this.country = country;
		this.parcelWeight = parcelWeight;


	}
	

}