import React, { useState } from 'react';
import { useGetProjectsByManagerIdQuery } from '../../redux/slices/api/projectApiSlice';
import { useGetDeveloperQuery } from '../../redux/slices/api/userApiSlice';
import { useCreateAssignmentMutation } from '../../redux/slices/api/assignmentApliSlice';
import { useSelector } from 'react-redux';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('viewProjects');
  const [selectedDevelopers, setSelectedDevelopers] = useState([]); 
  const [selectedDeveloperNames, setSelectedDeveloperNames] = useState('');
  const user = useSelector((state) => state.auth.user); 
  const managerId = user?._id; 

  const [data, setData] = useState({ title: "", priority: "Low", duration: "", description: "" });

  const { data: projectsData, isLoading, isError } = useGetProjectsByManagerIdQuery(managerId);
  const projects = projectsData?.projects || [];
  
  const { data: developersData, isLoading: isDevLoading, isError: isDevError } = useGetDeveloperQuery();
  const developers = developersData?.developers || [];

  const [createAssignment, { isLoading: isCreating, isError: isCreateError, isSuccess }] = useCreateAssignmentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const assignmentData = {
      title: data.title,
      priority: data.priority,
      duration: data.duration,
      description: data.description,
      developerId: selectedDevelopers,
      managerId: managerId,
    };
  
    try {
      await createAssignment(assignmentData).unwrap(); 
      console.log('Assignment Data being sent:', assignmentData);
      
      setData({ title: "", priority: "Low", duration: "", description: "" });
      setSelectedDevelopers([]);
      setSelectedDeveloperNames('');
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };
  

  const handleDeveloperSelection = (e) => {
    const value = e.target.value;
  
    if (!selectedDevelopers.includes(value)) {
      setSelectedDevelopers((prev) => [...prev, value]);
      const developer = developers.find(dev => dev._id === value);
      if (developer) {
        setSelectedDeveloperNames((prev) => prev ? prev + ', ' + developer.name : developer.name);
      }
    }
  };
  

  if (isLoading) return <p>Loading projects...</p>;
  if (isError) return <p>Error loading projects. Please try again.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <button
          className={`px-6 py-2 mr-4 rounded-lg transition-colors duration-300 ${activeTab === 'viewProjects' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('viewProjects')}
        >
          View Projects
        </button>
        <button
          className={`px-6 py-2 rounded-lg transition-colors duration-300 ${activeTab === 'assignProjects' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('assignProjects')}
        >
          Assign Projects
        </button>
      </div>

      {activeTab === 'viewProjects' ? (
        <div>
          <h2 className="text-2xl font-bold text-[#694F8E] mb-4">Projects Managed by You</h2>
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-purple-100 text-purple-800">
                <th className="border p-3">Title</th>
                <th className="border p-3">Priority</th>
                <th className="border p-3">Duration (Weeks)</th>
                <th className="border p-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project._id} className="hover:bg-purple-50">
                    <td className="border p-3">{project.title}</td>
                    <td className="border p-3">{project.priorityLevel}</td>
                    <td className="border p-3">{project.duration} Weeks</td>
                    <td className="border p-3">{project.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3 text-gray-500">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-[#694F8E] mb-4">Assign New Project</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                placeholder="Enter project title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Priority</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                value={data.priority}
                onChange={(e) => setData({ ...data, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Duration (Weeks)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                placeholder="Enter project duration"
                min="1"
                max="52"
                value={data.duration}
                onChange={(e) => setData({ ...data, duration: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Selected Developers</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                placeholder="Selected developers will appear here"
                value={selectedDeveloperNames}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Assign Developers</label>
              {isDevLoading ? (
                <p className="text-gray-500">Loading developers...</p>
              ) : isDevError ? (
                <p className="text-red-500">Error loading developers.</p>
              ) : (
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                  onChange={handleDeveloperSelection}
                >
                  <option value="" disabled>Select a developer</option>
                  {developers.length > 0 ? (
                    developers.map((developer) => (
                      <option key={developer._id} value={developer._id}>
                        {developer.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No developers available</option>
                  )}
                </select>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                placeholder="Enter project description"
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#694F8E] text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
            >
              {isCreating ? 'Creating...' : 'Create Assignment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
