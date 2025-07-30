import React, { useState, useEffect } from 'react';

const JobForm = ({ onAddJob, onEditJob, editingJob }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');

  useEffect(() => {
    if (editingJob) {
      setTitle(editingJob.title);
      setCompany(editingJob.company);
      setStatus(editingJob.status);
    } else {
      setTitle('');
      setCompany('');
      setStatus('Applied');
    }
  }, [editingJob]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingJob) {
      onEditJob({ ...editingJob, title, company, status });
    } else {
      onAddJob({ title, company, status, id: Date.now() });
    }

    setTitle('');
    setCompany('');
    setStatus('Applied');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {editingJob ? 'Edit Job' : 'Add New Job'}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          type="text"
          placeholder="e.g. Frontend Engineer"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <input
          type="text"
          placeholder="e.g. Google"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-4 rounded-lg"
      >
        {editingJob ? 'Update Job' : 'Add Job'}
      </button>
    </form>
  );
};

export default JobForm;
