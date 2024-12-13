import React from 'react';
import { useFetchStudentsQuery } from '../../redux/slices/api/demoApiSlice';

function DemoTable() {
  // Fetch student data using the hook
  const { data, error, isLoading } = useFetchStudentsQuery();
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Student Data</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Joined Date</th>
            <th className="border px-4 py-2">Class No</th>
            <th className="border px-4 py-2">Standard</th>
            <th className="border px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {data?.students.map((student) => (
            <tr key={student._id}>
              <td className="border px-4 py-2">{student._id}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.age}</td>
              <td className="border px-4 py-2">{student.joineddate}</td>
              <td className="border px-4 py-2">{student.classno}</td>
              <td className="border px-4 py-2">{student.standard}</td>
              <td className="border px-4 py-2">{student.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DemoTable;
