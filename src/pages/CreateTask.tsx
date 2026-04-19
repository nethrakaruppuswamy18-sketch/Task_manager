import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button.tsx';
import { Input, Textarea, Select } from '../components/Input.tsx';
import { Card } from '../components/Card.tsx';
import { useTasks } from '../hooks/useTasks.ts';
import { useForm } from '../hooks/useForm.ts';
import { useToast } from '../components/Toast.tsx';
import { TaskFormData } from '../types.ts';

export default function CreateTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const { toast } = useToast();

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm<TaskFormData>({
    initialValues: {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
    },
    validate: (vals) => {
      const errs: Partial<Record<keyof TaskFormData, string>> = {};
      if (!vals.title.trim()) errs.title = 'Title is required';
      if (!vals.dueDate) errs.dueDate = 'Due date is required';
      return errs;
    },
    onSubmit: (vals) => {
      addTask(vals);
      toast('Task created successfully');
      navigate('/');
    },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate(-1)} 
        className="-ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Back
      </Button>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Task</h1>
        <p className="text-slate-500 dark:text-slate-400">Fill in the details below to add a new task.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="e.g. Design Landing Page"
            error={errors.title}
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Describe the task details..."
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
              ]}
            />

            <Input
              label="Due Date"
              name="dueDate"
              type="date"
              value={values.dueDate}
              onChange={handleChange}
              error={errors.dueDate}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
