import React from "react";
// import { useGetReportingManagerForUserQuery } from "../../../redux/slices/api/userApiSlice";

function Hierarchy_Info() {
  // Use the query to fetch the reporting manager's information
  // const { data, isLoading, error } = useGetReportingManagerForUserQuery();

  return (
    <div>
      <div className="border shadow-lg rounded-lg p-5 relative bg-white">
        <p className="font-semibold text-lg md:text-base">
          Hierarchy Information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-3">
          <div>
            <p className="text-gray-400">
              Reporting Manager:{" "}
              {isLoading ? (
                <span>Loading...</span>
              ) : error ? (
                <span>Error fetching data</span>
              ) : data && data.reportingManager ? (
                <span className="text-black font-semibold">
                  {data.reportingManager.name}
                </span>
              ) : (
                <span>No reporting manager found</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hierarchy_Info;
