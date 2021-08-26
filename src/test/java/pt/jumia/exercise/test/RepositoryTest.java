

package pt.jumia.exercise.test;

import org.junit.runner.RunWith;


import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import java.util.Collections;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import pt.jumia.exercise.service.UserService;
import pt.jumia.exercise.repository.UserRepository;



@RunWith(SpringRunner.class)
@SpringBootTest
public class RepositoryTest {


    @Autowired
    private UserService userService;

    @MockBean(name="userRepository")
    private UserRepository userRepository;

    @Test
    public void test(){
      when(userRepository.findAll()).thenReturn(Collections.emptyList());
      assertTrue(userService.findAll().isEmpty());
    }}