import { Card } from "@/components/ui/card";
import { Building2, Send, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import type { JobApplication } from "@/pages/Index";

interface StatsBarProps {
  jobs: JobApplication[];
}

const StatsBar = ({ jobs }: StatsBarProps) => {
  const stats = [
    {
      label: "To Apply",
      value: jobs.filter(job => job.status === "To Apply").length,
      icon: Building2,
      color: "text-purple-600",
    },
    {
      label: "Applied",
      value: jobs.filter(job => job.status === "Applied").length,
      icon: Send,
      color: "text-blue-600",
    },
    {
      label: "Interviews",
      value: jobs.filter(job => job.status === "Interview").length,
      icon: MessageSquare,
      color: "text-yellow-600",
    },
    {
      label: "Offers",
      value: jobs.filter(job => job.status === "Offer").length,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      label: "Rejected",
      value: jobs.filter(job => job.status === "Rejected").length,
      icon: XCircle,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <Card key={label} className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <Icon className={`h-5 w-5 ${color}`} />
            <div>
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsBar;