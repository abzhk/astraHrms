import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProjectMutation, useGetAllProjectsQuery } from "../../../../redux/slices/api/projectApiSlice"; // Adjust the import path as needed
import { useGetManagerQuery } from '../../../../redux/slices/api/userApiSlice';

const ProjectCreation = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [createdBy] = useState('Admin');
  const [createdDate] = useState(new Date().toLocaleDateString());
  const [createProject] = useCreateProjectMutation();
  const { data: projectsData = [], isLoading: isLoadingProjects, isError: isErrorProjects } = useGetAllProjectsQuery(); // Fetch projects data
  const { data: managersData, isLoading: isLoadingManagers, isError: isErrorManagers } = useGetManagerQuery(); // Fetch managers data
  
  const projects = Array.isArray(projectsData) ? projectsData : []; // Ensure projects is an array
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const duration = watch('duration') || 1; // Default duration is 1 week
  const onSubmit = async (data) => {
    const newProject = {
      ...data,
      createdBy,
      createdDate,
      managerId: data.manager, //manager id
    };
  
    console.log('Submitting new project:', newProject); // Add this to check the data
  
    try {
      await createProject(newProject).unwrap(); // Unwrap for better error handling
      setIsFormOpen(false);
      reset(); // Clear form fields after submission
    } catch (error) {
      console.error('Failed to create the project:', error);
    }
  };
  
  

  // Optional: Handle loading and error states
  if (isLoadingProjects) return <p>Loading projects...</p>;
  if (isErrorProjects) return <p>Failed to load projects. Please try again.</p>;



  return (
    <div className="p-8">
  {/* Top Right Create Project Button */}
  <div className="flex justify-end mb-6">
    <button
      onClick={() => setIsFormOpen(true)}
      className="bg-[#694F8E] text-white py-2 px-6 rounded-md hover:bg-[#523B72] transition-all"
    >
      + Create Project
    </button>
  </div>

  {/* Small Two-Column Form Card */}
  {isFormOpen && (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold text-[#694F8E] mb-6 text-center">
        Create New Project
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-6 gap-y-4">
        {/* Project Title */}
        <div className="col-span-2">
          <label className="block text-lg font-medium mb-1">Project Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register('title', { required: 'Project title is required' })}
            placeholder="Enter project title"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Created By */}
        <div>
          <label className="block text-lg font-medium mb-1">Created By</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            value={createdBy}
            readOnly
          />
        </div>

        {/* Created Date */}
        <div>
          <label className="block text-lg font-medium mb-1">Created Date</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            value={createdDate}
            readOnly
          />
        </div>

        {/* Select Manager */}
        <div className="col-span-2">
          <label className="block text-lg font-medium mb-1">Select Manager</label>
          {isLoadingManagers ? (
            <p>Loading managers...</p>
          ) : isErrorManagers ? (
            <p>Error loading managers</p>
          ) : (
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register('manager', { required: 'Manager is required' })}
            >
              <option value="">Select a manager</option>
              {managersData?.manager?.map((manager) => (
                <option key={manager._id} value={manager._id}>
                  {manager.name}
                </option>
              ))}
            </select>
          )}
          {errors.manager && <p className="text-red-500">Manager is required</p>}
        </div>

        {/* Priority Level */}
        <div>
          <label className="block text-lg font-medium mb-1">Priority Level</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register('priority', { required: 'Select a priority level' })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
        </div>

        {/* Project Duration */}
        <div>
          <label className="block text-lg font-medium mb-1">
            Project Duration (in Weeks): {duration} Weeks
          </label>
          <input
            type="range"
            min="1"
            max="52"
            className="w-full"
            {...register('duration', { valueAsNumber: true })}
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-lg font-medium mb-1">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register('description', { required: 'Project description is required' })}
            placeholder="Enter project description"
            rows="3"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#9953fb] text-white py-2 px-4 rounded-md hover:bg-[#523B72] transition-all"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )}

  {/* Project Records Table */}
  <div className="mt-16">
    <h2 className="text-2xl font-bold text-[#694F8E] mb-4">Project Records</h2>
    <table className="w-full border border-gray-300">
      <thead>
        <tr>
          <th className="border p-3">Title</th>
          <th className="border p-3">Manager</th>
          <th className="border p-3">Priority</th>
          <th className="border p-3">Duration (Weeks)</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index}>
            <td className="border p-3">{project.title}</td>
            <td className="border p-3">{project.manager}</td>
            <td className="border p-3">{project.priority}</td>
            <td className="border p-3">{project.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default ProjectCreation;
