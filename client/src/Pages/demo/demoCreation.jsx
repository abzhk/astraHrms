import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateStudentMutation } from '../../redux/slices/api/demoApiSlice';
import { useNavigate } from 'react-router-dom';

function DemoCreation() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [createStudent, { isLoading, isSuccess, isError }] = useCreateStudentMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const response = await createStudent(data).unwrap(); 
      console.log('Student created successfully:', response);
navigate('/studtable', { state: { refreshData: true } })
window.location.reload();
    } catch (error) {
      console.error('Failed to create student:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4">
          <h2 className="text-xl font-semibold text-center">User Information</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register('name',{required:'name is required'})}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-500 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              {...register('age', {  min: 1, max: 18 })}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-500 ${errors.age ? 'border-red-500' : ''}`}
            />
            {errors.age && <span className="text-red-500 text-sm">Enter a valid age (1-18)</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Joined Date</label>
            <input
              type="date"
              {...register('joineddate')}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-500 ${errors.joineddate ? 'border-red-500' : ''}`}
            />
            {errors.joineddate && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Class Number</label>
            <input
              type="number"
              placeholder="Enter class number"
              {...register('classno')}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-500 ${errors.classno ? 'border-red-500' : ''}`}
            />
            {errors.classno && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Standard</label>
            <input
              type="number"
              placeholder="Enter standard"
              {...register('standard',)}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-500 ${errors.standard ? 'border-red-500' : ''}`}
            />
            {errors.standard && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              placeholder="Enter your address"
              {...register('address')}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-500 ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-500"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>

          {isSuccess && <p className="text-green-500">Student created successfully!</p>}
          {isError && <p className="text-red-500">Failed to create student. Please try again.</p>}
        </form>
      </div>
    </div>
  );
}

export default DemoCreation;
