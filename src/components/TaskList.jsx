import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskFormModal from "../Modals/TaskFormModal";
import { useAuth } from "../contexts/AuthContext";


export default function TaskList() {
   const { filteredTasks, loading, error, addTask, setFilter } = useTasks(); // Assuming filteredTasks and setFilter are provided by your context
   const [isModalOpen, setModalOpen] = useState(false);
   const { user } = useAuth();
   const isEmployer = user && user.role === "employer";


   const handleSave = async (newTask) => {
      await addTask(newTask);
      setModalOpen(false);
   };

   const handleFilterChange = (event) => {
      setFilter({ type: event.target.value });
   };


   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;
   if (filteredTasks.length === 0) return <p>No tasks available.</p>;

   return (
      <>
         <TaskFormModal
            isOpen={isModalOpen}
            onSave={handleSave}
            onClose={() => setModalOpen(false)}
         />

         <div className="flex flex-wrap gap-2">
            <button
               disabled={!isEmployer}
               onClick={() => setModalOpen(true)}
               className={`bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-gray-200 font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out ${!isEmployer ? "opacity-50 cursor-not-allowed" : ""}`}
            >
               Create New Task
            </button>
            <select
               onChange={handleFilterChange}
               className="border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition ease-in-out duration-150 sm:w-40 md:w-56 lg:w-64"
            >
               <option value="none">Select Filter</option>
               <option value="none">None</option>
               <option value="due date">Due Date</option>
               <option value="in progress">In Progress</option>
               <option value="partial">Partial</option>
               <option value="finished">Finished</option>
            </select>
         </div>
         <div className="container mx-auto p-4">
            <div
               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
               {filteredTasks.map((task, index) => (
                  <TaskCard key={index} task={task} />
               ))}
            </div>
         </div>
      </>
   );
}
