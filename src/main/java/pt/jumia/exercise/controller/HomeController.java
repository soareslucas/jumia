package pt.jumia.exercise.controller;

import java.io.Reader;
import java.io.StringReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import pt.jumia.exercise.service.FileManager;
import pt.jumia.exercise.service.UserService;
import pt.jumia.exercise.model.User;
import pt.jumia.exercise.stats.UsersByCountry;


import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;


import com.google.api.services.drive.model.File;
import javax.servlet.http.HttpServletResponse;
import java.security.GeneralSecurityException;
import java.util.List;

@Controller
public class HomeController {
	

    @Autowired
    private UserService userService;


	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}
	
    @RequestMapping(value = "upload", method = RequestMethod.POST)
    @ResponseBody
    public String upload(HttpServletRequest request, @RequestParam MultipartFile file)  {
        
    	try {
            Reader reader = new InputStreamReader(file.getInputStream());

            //Reader reader = new StringReader(new String(uploadedFiles));

            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                    .withHeader("id", "email", "phone_number", "parcel_weight")
                    .withIgnoreHeaderCase()
                    .withTrim());


            for (CSVRecord  csvRecord: csvParser) {

                User user = new User();

                String phone = csvRecord.get("phone_number");
                
                user.setId(csvRecord.get("id"));
                user.setEmail(csvRecord.get("email"));
                user.setPhone(phone);
                user.setParcelWeight(csvRecord.get("parcel_weight"));

                if (phone.matches("237\\ ?[2368]\\d{7,8}$") ){
                    user.setCountry("Cameroon");
                }else{
                    if(phone.matches("251\\ ?[1-59]\\d{8}$")){
                        user.setCountry("Ethiopia");

                    }else{
                        if( phone.matches("212\\ ?[5-9]\\d{8}$")){
                            user.setCountry("Morocco");

                        }else{
                            if(phone.matches("258\\ ?[28]\\d{7,8}$")){
                                user.setCountry("Mozambique");
                            }else{
                                if( phone.matches("256\\ ?\\d{9}$")){
                                    user.setCountry("Uganda");

                                }else{
                                    user.setCountry("Sem País");
                                }                                
                            }
                        }
                    }
                }                    

                if (!user.getCountry().equals("Sem País")){
                    userService.salvar(user);
                }
            }
            
        } catch (IOException e) {
            throw new RuntimeException("Não foi possível ler o arquivo " + file.getOriginalFilename(), e);
        }

        return "{\"propriedade\": \"ok\"}";
    }


    @RequestMapping(value = "findUsersByCountry", method = RequestMethod.GET)
    @ResponseBody
    public  List<User> findUsersByCountry(@RequestParam String country, @RequestParam Integer numberPage)  {


        List<User> list = userService.getUsersByCountry(numberPage , country);

        return list;

	}



    @RequestMapping(value = "getTotalByCountry", method = RequestMethod.GET)
    @ResponseBody
    public List<UsersByCountry> getTotalByCountry()  {

        List<UsersByCountry> list = userService.getTotalByCountry();

        return list;
    }


}
