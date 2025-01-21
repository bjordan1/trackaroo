import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import JobCard from "@/components/JobCard";
import AddJobModal from "@/components/AddJobModal";
import StatusColumn from "@/components/StatusColumn";
import StatsBar from "@/components/StatsBar";

export type JobApplication = {
  id: string;
  company: string;
  position: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  date: string;
  notes: string;
};

const Index = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addJob = (job: Omit<JobApplication, "id">) => {
    setJobs([...jobs, { ...job, id: crypto.randomUUID() }]);
  };

  const updateJobStatus = (jobId: string, newStatus: JobApplication["status"]) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Add Application
          </Button>
        </div>

        <StatsBar jobs={jobs} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {(["Applied", "Interview", "Offer", "Rejected"] as const).map((status) => (
            <StatusColumn
              key={status}
              status={status}
              jobs={jobs.filter((job) => job.status === status)}
              onStatusChange={updateJobStatus}
            />
          ))}
        </div>

        <AddJobModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onSubmit={addJob}
        />
      </div>
    </div>
  );
};

export default Index;