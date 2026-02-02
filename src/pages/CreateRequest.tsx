import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { mockClubs } from '@/data/mockData';
import { RequestPriority } from '@/types';

export default function CreateRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    priority: '' as RequestPriority | '',
    targetClubs: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleClub = (clubId: string) => {
    setFormData((prev) => ({
      ...prev,
      targetClubs: prev.targetClubs.includes(clubId)
        ? prev.targetClubs.filter((id) => id !== clubId)
        : [...prev.targetClubs, clubId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Request Created!',
      description: 'Your assistance request has been sent to the selected clubs.',
    });
    
    navigate('/requests');
    setIsSubmitting(false);
  };

  // Only officials can create requests
  if (user?.role !== 'official' && user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">You don't have permission to create requests.</p>
        <Link to="/requests">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Requests
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Button */}
      <Link to="/requests">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Requests
        </Button>
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-foreground">Create Assistance Request</h1>
        <p className="text-muted-foreground mt-1">Request help from student clubs for your event</p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Provide information about your assistance needs</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Request Title</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="title"
                    placeholder="Enter request title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your assistance requirements in detail..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleChange('eventDate', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label>Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                  <SelectTrigger>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Target Clubs */}
              <div className="space-y-3">
                <Label>Select Clubs (Required)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mockClubs.map((club) => (
                    <div
                      key={club.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox
                        id={club.id}
                        checked={formData.targetClubs.includes(club.id)}
                        onCheckedChange={() => toggleClub(club.id)}
                      />
                      <label
                        htmlFor={club.id}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <img src={club.logo} alt={club.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="text-sm font-medium text-foreground">{club.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="hero" 
                  disabled={isSubmitting || formData.targetClubs.length === 0}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
