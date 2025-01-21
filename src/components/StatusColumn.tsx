import JobCard from "./JobCard";
import type { JobApplication } from "@/pages/Index";

interface StatusColumnProps {
  status: JobApplication["status"];
  jobs: JobApplication[];
  onStatusChange: (jobId: string, status: JobApplication["status"]) => void;
}

const StatusColumn = ({ status, jobs, onStatusChange }: StatusColumnProps) => {
  const statusColors = {
    Applied: "bg-blue-50 border-blue-200",
    Interview: "bg-yellow-50 border-yellow-200",
    Offer: "bg-green-50 border-green-200",
    Rejected: "bg-red-50 border-red-200",
  };

  return (
    <div className={`p-4 rounded-lg ${statusColors[status]} border`}>
      <h2 className="font-semibold mb-4 text-gray-900">{status} ({jobs.length})</h2>
      <div className="space-y-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
};

export default StatusColumn;