package todo.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import todo.entity.Task;
import todo.service.TodoService;

@RestController
public class Controller {
	
	@Autowired
	TodoService service;
	
	@RequestMapping(value="/getTask")
	public List<Task> getTasks(){
		return service.getTasks();
	}
	
	@RequestMapping(value="/setTask", method=RequestMethod.POST)
	public String setTask(@RequestBody Task task){
		if(task.getDueBy() == null){
			task.setDueBy(new Date());	
		}
		task.setCreatedOn(new Date());
		task.setStatus(0);
		return service.setTask(task);
	}
	
	
	@RequestMapping(value="/deleteTask", method=RequestMethod.DELETE)
	public String deleteTask(@RequestBody String task){
		return service.delete(task);
	}
	
	@RequestMapping(value="/updateTask", method=RequestMethod.PUT)
	public String UpdateTask(@RequestBody Task task){
		return service.updateTask(task);
	}

}
