

package pt.jumia.exercise.test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;
import com.fasterxml.jackson.databind.ObjectMapper;



import pt.jumia.exercise.controller.HomeController;
import pt.jumia.exercise.model.User;
import pt.jumia.exercise.service.UserService;
import java.util.Arrays;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.http.HttpStatus;


@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc 
public class ControllerTest {

	@Autowired
    private MockMvc mvc;

	@Test
	public void testBasicController()
	  throws Exception {
	
		User alex = new User( "test@test.com", "000", "brasil", "10");

		ObjectMapper mapper = new ObjectMapper();

		String jsonInString = mapper.writeValueAsString(alex);

		MockHttpServletResponse response = mvc.perform(post("/api/users/").contentType(MediaType.APPLICATION_JSON).content(jsonInString)).andReturn().getResponse() ;

        assertThat(response.getStatus()).isEqualTo(HttpStatus.CREATED.value());

	}
}