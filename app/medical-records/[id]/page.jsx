"use client"
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const MedicalRecord = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const userId = params.id;

  const fetchRecords = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}/records`);
      const data = await response.json();
      setRecords(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medical records:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      {loading ? (
        <h1 className='text-lg font-semibold blue_gradient mb-4'>Loading...</h1>
      ) : (
        <>
          <h2 className="text-lg font-semibold blue_gradient mb-4">Medical Records</h2>
          {records.length > 0 ? (
            <div className='w-full flex justify-around flex-wrap'>
              {records.map((record) => (
                <div key={record._id} className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-md mb-4">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{record.name}</h3>
                    <Link href={record.document} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      <div className="w-full h-40 overflow-hidden rounded-lg">
                        <img src={record.document} alt="Medical Record" className="w-full h-full object-cover" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No medical records found.</p>
          )}

          <div data-dial-init className="fixed right-6 bottom-6 group">
            <Link href={`/medical-records/${userId}/add`} data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
              <svg className="w-5 h-5 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default MedicalRecord;