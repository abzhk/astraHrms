import React, { useState } from 'react';
import ProjectCreation from './Subproject/projectCreation';
import Records from './Subproject/projectRecords';
// import Manage from './Manage';


const Main = () => {
  const [activeTab, setActiveTab] = useState('Project Creation');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Project Creation':
        return <ProjectCreation />;
      case 'Records':
        return <Records />;
    //   case 'Manage':
    //     return <Manage />;
    //   default:
    //     return <ProjectCreation />;
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6 text-[#694F8E]">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        {['Project Creation', 'Records', 'Manage'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-[#694F8E] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};
export default Main;