import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { JobApplication } from "@/pages/Index";

interface JobCardProps {
  job: JobApplication;
  onStatusChange: (jobId: string, status: JobApplication["status"]) => void;
}

const JobCard = ({ job, onStatusChange }: JobCardProps) => {
  const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    Interview: "bg-yellow-100 text-yellow-800",
    Offer: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{job.company}</h3>
          <p className="text-sm text-gray-600">{job.position}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {(["Applied", "Interview", "Offer", "Rejected"] as const).map((status) => (
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

      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[job.status]}`}>
          {job.status}
        </span>
        <span className="text-xs text-gray-500">{new Date(job.date).toLocaleDateString()}</span>
      </div>

      {job.notes && (
        <p className="text-sm text-gray-600 line-clamp-2">{job.notes}</p>
      )}
    </Card>
  );
};

export default JobCard;