import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import JobForm from '../components/Jobform';

const Dashboard = () => {
  const [jobs, setJobs] = useState(() => {
    const storedJobs = localStorage.getItem("jobTrackerJobs");
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

  const [editingJob, setEditingJob] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("");

  const handleAddJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleEditJob = (updatedJob) => {
    const updatedJobs = jobs.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobs(updatedJobs);
    setEditingJob(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
  };

  const handleDelete = (idToDelete) => {
    const updatedJobs = jobs.filter((job) => job.id !== idToDelete);
    setJobs(updatedJobs);
  };

  useEffect(() => {
    localStorage.setItem("jobTrackerJobs", JSON.stringify(jobs));
  }, [jobs]);

  const filteredJobs =
    filterStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "company") {
      return a.company.localeCompare(b.company);
    }
    return 0;
  });

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">Job Applications</h2>

      {/* Responsive layout for form and filters */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="md:col-span-1">
          <JobForm
            onAddJob={handleAddJob}
            onEditJob={handleEditJob}
            editingJob={editingJob}
          />
        </div>

        <div className="md:col-span-1 flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Filter by status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">None</option>
              <option value="title">Title</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>
      </div>

      {/* Responsive job cards grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedJobs.length === 0 ? (
          <p className="text-gray-500">No jobs match your criteria.</p>
        ) : (
          sortedJobs.map((job) => (
            <div key={job.id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
              <p className="text-sm text-gray-600">
                {job.company} — {job.status}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
