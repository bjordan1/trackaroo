import { Card } from "@/components/ui/card";
import type { JobApplication } from "@/pages/Index";

interface StatsBarProps {
  jobs: JobApplication[];
}

const StatsBar = ({ jobs }: StatsBarProps) => {
  const stats = {
    total: jobs.length,
    applied: jobs.filter(job => job.status === "Applied").length,
    interview: jobs.filter(job => job.status === "Interview").length,
    offer: jobs.filter(job => job.status === "Offer").length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Active Applications</h3>
        <p className="text-2xl font-bold text-blue-600">{stats.applied}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Interviews</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.interview}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Offers</h3>
        <p className="text-2xl font-bold text-green-600">{stats.offer}</p>
      </Card>
    </div>
  );
};

export default StatsBar;