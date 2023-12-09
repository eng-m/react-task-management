import React, { useState } from "react";
import { Card } from "flowbite-react";
import TaskFormModal from "../Modals/TaskFormModal";
import { useTasks } from "../contexts/TaskContext";
import TaskDetailsModal from "../Modals/TaskDetailsModal";
import { useAuth } from "../contexts/AuthContext";

const TaskCard = ({ task }) => {
   const [isModalOpen, setModalOpen] = useState(false);
   const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
   const { updateTask } = useTasks();
   const { deleteTask } = useTasks();
   const { user } = useAuth();
   const isEmployer = user && user.role === "employer";

   const handleSave = async (updatedTask, taskId) => {
      await updateTask(taskId, updatedTask);
      setModalOpen(false);
   };

   const handleDelete = async () => {
      if (window.confirm("Are you sure you want to delete this task?")) {
         await deleteTask(task.id);
      }
   };
   return (
      <>
         <TaskFormModal
            task={task}
            isOpen={isModalOpen}
            onSave={(updatedTaskData) => handleSave(updatedTaskData, task.id)}
            onClose={() => setModalOpen(false)}
         />
         <TaskDetailsModal
            task={task}
            isOpen={isDetailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
         />
         <Card
            onClick={() => setDetailsModalOpen(true)}
            className=" max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mt-6"
         >
            <div className="flex flex-col justify-between h-full">
               <div>
                  <h6 className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-900 dark:text-white truncate">
                     {task.title}
                  </h6>
                  <p className="mb-5 text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 dark:text-gray-400 truncate">
                     {task.description}
                  </p>
               </div>
               <div className="flex items-center justify-center space-y-4 sm:space-x-4 sm:space-y-0">
                  <button
                     disabled={!isEmployer}
                     onClick={handleDelete}
                     className={`text-red-500 hover:text-red-700 ${
                        !isEmployer ? "opacity-50 cursor-not-allowed" : ""
                     }`}
                  >
                     Delete
                  </button>
                  <button
                     disabled={!isEmployer}
                     className={`text-green-300 hover:text-green-500 ${
                        !isEmployer ? "opacity-50 cursor-not-allowed" : ""
                     }`}
                     onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering the card's onClick
                        setModalOpen(true);
                     }}
                  >
                     Edit
                  </button>
               </div>
            </div>
         </Card>
      </>
   );
};

export default TaskCard;
