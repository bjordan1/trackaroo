import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { JobApplication } from "@/pages/Index";

interface AddJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (job: Omit<JobApplication, "id">) => void;
}

const AddJobModal = ({ open, onOpenChange, onSubmit }: AddJobModalProps) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    notes: "",
    location: {
      address: "",
      coordinates: [-122.4194, 37.7749] as [number, number] // Default to San Francisco
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: "To Apply",
      date: new Date().toISOString(),
    });
    setFormData({ company: "", position: "", notes: "", location: { address: "", coordinates: [-122.4194, 37.7749] } });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Input
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Enter company name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Position</label>
            <Input
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="Enter position title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              required
              value={formData.location.address}
              onChange={(e) => setFormData({ 
                ...formData, 
                location: { ...formData.location, address: e.target.value }
              })}
              placeholder="Enter job location"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any notes about the application"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add to To-Do</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobModal;