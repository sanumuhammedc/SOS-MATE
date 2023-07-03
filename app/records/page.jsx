import React from 'react';

const MedicalRecord = ({ records }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Medical Records</h2>
      {records.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {records.map((record) => (
            <li key={record.id} className="py-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold">{record.title}</h3>
                  <p className="text-sm text-gray-500">{record.date}</p>
                </div>
                <div>
                  <a
                    href={record.fileUrl}
                    className="text-blue-500 hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </div>
              </div>
              {record.imageUrl && (
                <div className="mt-2">
                  <img
                    src={record.imageUrl}
                    alt="Medical Record"
                    className="w-40 h-40 object-cover rounded"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No medical records found.</p>
      )}
    </div>
  );
};

export default MedicalRecord;