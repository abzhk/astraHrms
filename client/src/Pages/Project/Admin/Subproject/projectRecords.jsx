import React from 'react';
const projectRecords = () => {
  const records = [
    { id: 1, name: 'Project A', status: 'Completed' },
    { id: 2, name: 'Project B', status: 'In Progress' },
    { id: 3, name: 'Project C', status: 'Not Started' },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Project Name</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="border p-2">{record.id}</td>
              <td className="border p-2">{record.name}</td>
              <td className="border p-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default projectRecords;