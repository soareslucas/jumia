Jumia Exercise

The project was build with Spring Boot , React. Although I used a maven plugin to run both at the same time. For database I used MongoDB.
So, by following the commands bellow you will able to run the project:

1) mvn install -Dmaven.test.skip

2) docker-compose build

3) docker-compose up


The tests cannot be ran by the steps above, so, in order to check the tests it's necessary to change  
the value of the host located in the application.properties file as this:

spring.data.mongodb.host=localhost

Then, we may execute the following command:

1) mvn test

