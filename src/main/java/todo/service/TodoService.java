package todo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import todo.entity.Task;
import todo.repo.TaskRepo;

@Service
public class TodoService {
	@Autowired
	TaskRepo taskrepo;
	
	public List<Task> getTasks(){
		return taskrepo.findAll();
	}
	
	public String setTask(Task task){
		int i = taskrepo.insert(task);
		return ""+i;
	}
	
	public String delete(String name){
		int i = taskrepo.deleteByName(name);
		return ""+i;
	}
	
	public String updateTask(Task task){
		int i = taskrepo.update(task);
		return ""+i;
	}

}
