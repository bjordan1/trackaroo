import JobCard from "./JobCard";
import type { JobApplication } from "@/pages/Index";

interface StatusColumnProps {
  status: JobApplication["status"];
  jobs: JobApplication[];
  onStatusChange: (jobId: string, status: JobApplication["status"]) => void;
}

const StatusColumn = ({ status, jobs, onStatusChange }: StatusColumnProps) => {
  const statusColors = {
    "To Apply": "bg-purple-50 border-purple-200",
    "Applied": "bg-blue-50 border-blue-200",
    "Interview": "bg-yellow-50 border-yellow-200",
    "Offer": "bg-green-50 border-green-200",
    "Rejected": "bg-red-50 border-red-200",
  };

  return (
    <div className={`rounded-lg ${statusColors[status]} border h-full`}>
      <div className="p-4">
        <h2 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
          {status}
          <span className="text-sm font-normal text-gray-600">({jobs.length})</span>
        </h2>
        <div className="space-y-3 min-h-[200px]">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onStatusChange={onStatusChange} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusColumn;