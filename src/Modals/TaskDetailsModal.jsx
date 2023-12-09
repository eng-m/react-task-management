import React from "react";

const TaskDetailsModal = ({ task, isOpen, onClose }) => {
   if (!isOpen || !task) return null;

   return (
      <main className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center p-4">
         <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <header className="bg-gray-800 px-6 py-4 rounded-t-lg text-white">
               <h2 className="text-xl md:text-2xl font-semibold">Task Details</h2>
            </header>
            <div className="p-6">
               <div className="space-y-5">
                  <h3 className="text-md font-semibold text-gray-700">{task.title}</h3>
                  <h3 className="text-md font-semibold text-gray-700">Description:</h3>
                  <div className="max-h-48 overflow-y-auto p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600">
                     {task.description}
                  </div>
                  <p className="text-gray-600">{task.due_date}</p>

                  <h3 className="text-md font-semibold text-gray-700">Status:</h3>
                  <p className="text-gray-600">{task.status}</p>
               </div>
               <div className="flex justify-end mt-6">
                  <button
                     onClick={onClose}
                     className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150 ease-in-out"
                  >
                     Close
                  </button>
               </div>
            </div>
         </div>
      </main>
   );
};

export default TaskDetailsModal;
