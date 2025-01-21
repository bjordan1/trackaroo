import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";
import AddJobModal from "@/components/AddJobModal";
import StatusColumn from "@/components/StatusColumn";
import StatsBar from "@/components/StatsBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobMap from "@/components/JobMap";

export type JobApplication = {
  id: string;
  company: string;
  position: string;
  status: "To Apply" | "Applied" | "Interview" | "Offer" | "Rejected";
  date: string;
  notes: string;
  location?: {
    address: string;
    coordinates: [number, number];
  };
};

// Placeholders to hold text for each application
const Index = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([
    {
      id: "1",
      company: "Google",
      position: "Frontend Developer",
      status: "To Apply",
      date: new Date().toISOString(),
      notes: "Exciting opportunity in the Search team",
      location: {
        address: "Mountain View, CA",
        coordinates: [-122.0838511, 37.4224764]
      }
    },
    {
      id: "2",
      company: "Microsoft",
      position: "Software Engineer",
      status: "Applied",
      date: new Date().toISOString(),
      notes: "Applied through referral",
      location: {
        address: "Redmond, WA",
        coordinates: [-122.1215, 47.6740]
      }
    },
    {
      id: "3",
      company: "Apple",
      position: "UI Engineer",
      status: "Interview",
      date: new Date().toISOString(),
      notes: "First round scheduled",
      location: {
        address: "Cupertino, CA",
        coordinates: [-122.0312186, 37.3318]
      }
    }
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addJob = (job: Omit<JobApplication, "id">) => {
    setJobs([...jobs, { ...job, id: crypto.randomUUID() }]);
  };

  const updateJobStatus = (jobId: string, newStatus: JobApplication["status"]) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  const handleDragStart = (e: React.DragEvent, jobId: string) => {
    e.dataTransfer.setData('jobId', jobId);
  };

  const handleDrop = (e: React.DragEvent, status: JobApplication["status"]) => {
    e.preventDefault();
    const jobId = e.dataTransfer.getData('jobId');
    updateJobStatus(jobId, status);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const activeJobs = jobs.filter(job => job.status !== "To Apply");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="board" className="mb-8">
            <TabsList>
              <TabsTrigger value="board">My Job Board</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <TabsContent value="board">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Job Board</h1>
                <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" /> Add Job
                </Button>
              </div>

              <StatsBar jobs={jobs} />

              <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
                {(["To Apply", "Applied", "Interview", "Offer", "Rejected"] as const).map((status) => (
                  <div 
                    key={status} 
                    className="min-w-[300px]"
                    onDrop={(e) => handleDrop(e, status)}
                    onDragOver={handleDragOver}
                  >
                    <StatusColumn
                      status={status}
                      jobs={jobs.filter((job) => job.status === status)}
                      onStatusChange={updateJobStatus}
                      onDragStart={handleDragStart}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="map" className="h-[calc(100vh-200px)]">
              <JobMap jobs={activeJobs} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddJobModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={addJob}
      />
    </div>
  );
};

export default Index;