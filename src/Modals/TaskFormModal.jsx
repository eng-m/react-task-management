import React, { useState, useEffect } from "react";
// import { Modal } from "flowbite-react";

const TaskFormModal = ({ task, isOpen, onSave, onClose }) => {
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      dueDate: "",
      status: "in progress", // Default status
   });

   useEffect(() => {
      // If editing, prefill the form with the task data
      if (task) {
         setFormData({
            title: task.title,
            description: task.description,
            dueDate: task.due_date,
            status: task.status,
         });
      }
   }, [task]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const adjustedData = {
         ...formData,
         due_date: formData.dueDate,
      };
      delete adjustedData.dueDate; // Remove the camelCase key

      onSave(adjustedData, task?.id); // Pass task ID if editing
   };

   if (!isOpen) return null;

   return (
      <main className="fixed inset-0 bg-gray-900 bg-opacity-25 backdrop-blur-sm flex justify-center items-center p-4">
         <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl">
            <header className="text-2xl font-bold text-gray-800 mb-6">
               {task ? "Edit Task" : "Add Task"}
            </header>
            <form onSubmit={handleSubmit} className="space-y-6">
               <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Title"
                  required
               />
               <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Description"
                  required
               />
               <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
               />
               <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
               >
                  <option value="in progress">In Progress</option>
                  <option value="partial">Partial</option>
                  <option value="finished">Finished</option>
               </select>
               <div className="flex justify-end space-x-4">
                  <button
                     type="button" // Change to "button" to prevent form submission on cancel
                     onClick={onClose}
                     className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     onClick={handleSubmit}
                     className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                     {task ? "Save Changes" : "Create Task"}
                  </button>
               </div>
            </form>
         </div>
      </main>
   );
};

export default TaskFormModal;
