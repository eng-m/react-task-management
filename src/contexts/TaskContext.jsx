import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "../axios";
import {useAuth} from './AuthContext'

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
   const [tasks, setTasks] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [filter, setFilter] = useState({ dueDate: "", status: "" });
   const {user} = useAuth();

   const fetchTasks = async () => {
      setLoading(true);
      try {
         const response = await axios.get("/tasks");
         console.log("Fetched tasks:", response.data);
         setTasks(response.data.data);
         // console.log(response.data);
         setError(null);
      } catch (err) {
         const errorMessage =
            err.response && err.response.data && err.response.data.message
            
               ? err.response.data.message
               : "Error fetching tasks";
         setError(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   const addTask = async (newTask) => {
      setLoading(true);
      try {
         const response = await axios.post("/tasks", newTask);
         setTasks((prevTasks) => [...prevTasks, response.data]);

         setError(null);
      } catch (err) {
         const errorMessage =
            err.response && err.response.data && err.response.data.message
               ? err.response.data.message
               : "Error adding task";
         setError(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   const updateTask = async (id, updatedTask) => {
      setLoading(true);
      try {
         const response = await axios.put(`/tasks/${id}`, updatedTask);

         setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? response.data : task)));

         setError(null);
      } catch (err) {
         const errorMessage =
            err.response && err.response.data && err.response.data.message
               ? err.response.data.message
               : "Error updating task";
         setError(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   const deleteTask = async (id) => {
      setLoading(true);
      try {
         await axios.delete(`/tasks/${id}`);
         setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

         setError(null);
      } catch (err) {
         const errorMessage =
            err.response && err.response.data && err.response.data.message
               ? err.response.data.message
               : "Error deleting task";
         setError(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   // const filteredTasks = useMemo(() => {
   //    return tasks.filter((task) => {
   //       const dueDateMatch = filter.dueDate
   //          ? new Date(task.due_date).toDateString() === new Date(filter.dueDate).toDateString()
   //          : true;
   //       const statusMatch = filter.status ? task.status === filter.status : true;
   //       return dueDateMatch && statusMatch;
   //    });
   // }, [tasks, filter]);


   const filteredTasks = useMemo(() => {
      switch (filter.type) {
         case 'due date':
            // Sort tasks by due date in ascending order
            return [...tasks].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
         case 'in progress':
         case 'partial':
         case 'finished':
            // Filter tasks by status
            return tasks.filter(task => task.status === filter.type);
         case 'none':
         default:
            // No filter applied, return all tasks
            return tasks;
      }
   }, [tasks, filter]);

   useEffect(() => {
      if (user) {
         fetchTasks();
      }
   }, [user]);

   return (
      <TaskContext.Provider
         value={{
            tasks,
            loading,
            error,
            filteredTasks,
            fetchTasks,
            addTask,
            updateTask,
            deleteTask,
            setFilter,
         }}
      >
         {children}
      </TaskContext.Provider>
   );
};

export const useTasks = () => useContext(TaskContext);
