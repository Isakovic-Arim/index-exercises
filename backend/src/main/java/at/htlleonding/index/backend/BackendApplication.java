package at.htlleonding.index.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://frontend:5173"})
public class BackendApplication {
	private JdbcClient jdbcClient;

	public BackendApplication(JdbcClient jdbcClient) {
		this.jdbcClient = jdbcClient;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@PostMapping("/query")
	public String query(@RequestBody String sql) {
		return jdbcClient.sql(sql).query().listOfRows().get(0).toString();
	}
}
