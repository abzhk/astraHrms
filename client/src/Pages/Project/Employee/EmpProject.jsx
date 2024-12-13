import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchAssignmentsForDeveloperQuery } from '../../../redux/slices/api/assignmentApliSlice';

function EmpProject() {
  const user = useSelector((state) => state.auth.user); // Get current user
  const developerId = user?._id; // Get the developer's ID

  // Fetch assignments for the logged-in developer
  const { data, isLoading, isError } = useFetchAssignmentsForDeveloperQuery(developerId);

  if (isLoading) return <p>Loading assigned projects...</p>;
  if (isError) return <p>Error loading assigned projects. Please try again later.</p>;

  // Check if assignments data exists
  const assignments = data?.assignments || [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Assigned Projects</h2>
      {assignments.length > 0 ? (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Priority</th>
              <th className="border p-3 text-left">Duration</th>
              <th className="border p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="hover:bg-gray-100">
                <td className="border p-3">{assignment.title}</td>
                <td className="border p-3">{assignment.priority}</td>
                <td className="border p-3">{assignment.duration} Weeks</td>
                <td className="border p-3">{assignment.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No projects assigned to you.</p>
      )}
    </div>
  );
}

export default EmpProject;
