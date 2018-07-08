package todo.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import todo.entity.Task;

@Repository
public class TaskRepo {
	
	@Autowired
	JdbcTemplate jdbctemplate;
	
	public List<Task> findAll() {
	    return jdbctemplate.query("select * from Task",
	        new BeanPropertyRowMapper < Task > (Task.class));
	}
	
	public int insert(Task task) {
	    return jdbctemplate.update("insert into task ( name, dueby, createdon, status) " + "values(?, ?, ?, ?)",
	        new Object[] {
	             task.getName(), task.getDueBy(), task.getCreatedOn(), task.getStatus()
	        });
	}
	
	public int deleteByName(String name) {
	    return jdbctemplate.update("delete from task where name=?", new Object[] {
	        name
	    });
	}
	

public int update(Task task) {
    return jdbctemplate.update("update task " + " set name = ?, createdon = ?, dueby = ?, status = ? " + " where name = ?",
        new Object[] {
            task.getName(), task.getCreatedOn(), task.getDueBy(), task.getStatus(), task.getName()
        });
}

}
