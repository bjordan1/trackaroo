import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Building2, Briefcase, Calendar } from "lucide-react";
import type { JobApplication } from "@/pages/Index";

interface JobCardProps {
  job: JobApplication;
  onStatusChange: (jobId: string, status: JobApplication["status"]) => void;
}

const JobCard = ({ job, onStatusChange }: JobCardProps) => {
  const statusColors = {
    "To Apply": "bg-purple-100 text-purple-800",
    "Applied": "bg-blue-100 text-blue-800",
    "Interview": "bg-yellow-100 text-yellow-800",
    "Offer": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800",
  };

  return (
    <Card className="p-4 bg-white hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-900">
              <Briefcase className="h-4 w-4" />
              <h3 className="font-medium">{job.position}</h3>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {(["To Apply", "Applied", "Interview", "Offer", "Rejected"] as const).map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => onStatusChange(job.id, status)}
                  className="cursor-pointer"
                >
                  Move to {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[job.status]}`}>
            {job.status}
          </span>
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">{new Date(job.date).toLocaleDateString()}</span>
          </div>
        </div>

        {job.notes && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-2">{job.notes}</p>
        )}
      </div>
    </Card>
  );
};

export default JobCard;