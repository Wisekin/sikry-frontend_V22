import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { ListChecks, CheckCircle2, AlertOctagon, PlusCircle, Filter } from 'lucide-react'; // Icons for tasks

interface ReEngagementTask {
  id: string;
  description: string;
  leadName?: string;
  assignedTo?: string;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
}

const ReEngagementTasksPage = () => {
  // Mock data - will be replaced by API calls
  const tasks: ReEngagementTask[] = [
    { id: 'task_001', description: 'Draft personalized email for Cold Lead Segment A', leadName: 'Segment A', assignedTo: 'Marketing Team', dueDate: '2023-11-10', status: 'Completed', priority: 'High' },
    { id: 'task_002', description: 'Follow-up call with Jane Doe (Warm Lead)', leadName: 'Jane Doe', assignedTo: 'Sales Rep Alice', dueDate: '2023-11-12', status: 'Open', priority: 'High' },
    { id: 'task_003', description: 'Review engagement metrics for Campaign X', leadName: 'Campaign X', assignedTo: 'Analyst Bob', dueDate: '2023-11-14', status: 'In Progress', priority: 'Medium' },
    { id: 'task_004', description: 'Send special offer to recently re-engaged leads', leadName: 'Re-engaged Group 1', assignedTo: 'Marketing Automation', dueDate: '2023-11-08', status: 'Overdue', priority: 'Medium' },
    { id: 'task_005', description: 'Prepare content for new re-engagement sequence', assignedTo: 'Content Team', dueDate: '2023-11-20', status: 'Open', priority: 'Low' },
  ];

  const openTasks = tasks.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const completedToday = tasks.filter(t => t.status === 'Completed' && t.dueDate === new Date().toISOString().split('T')[0]).length; // Simple check for today
  const overdueTasks = tasks.filter(t => t.status === 'Overdue').length;

  const getStatusColor = (status: ReEngagementTask['status']) => {
    if (status === 'Completed') return 'bg-green-500/30 text-green-300';
    if (status === 'Overdue') return 'bg-red-500/30 text-red-300';
    if (status === 'In Progress') return 'bg-blue-500/30 text-blue-300';
    return 'bg-gray-500/30 text-gray-300'; // Open
  };

  const getPriorityColor = (priority: ReEngagementTask['priority']) => {
    if (priority === 'High') return 'text-red-400';
    if (priority === 'Medium') return 'text-yellow-400';
    return 'text-green-400'; // Low
  };

  return (
    <div>
      <EnterprisePageHeader title="Re-engagement Tasks" subtitle="Manage and track your re-engagement activities." />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard title="Open Tasks" value={openTasks} icon={<ListChecks size={24} />} />
          <QualityMetricCard title="Completed Today" value={completedToday} icon={<CheckCircle2 size={24} />} />
          <QualityMetricCard title="Overdue Tasks" value={overdueTasks} icon={<AlertOctagon size={24} />} />
        </div>

        <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Task List</h2>
            <div className="flex items-center space-x-3">
                <button className="bg-[#3C4568] hover:bg-[#4A5578] text-white py-2 px-3 rounded-lg flex items-center text-sm">
                    <Filter size={16} className="mr-2" /> Filter
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg flex items-center text-sm">
                    <PlusCircle size={16} className="mr-2" /> Create New Task
                </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#1B1F3B]">
                <tr>
                  <th className="px-3 py-2 text-left">Description</th>
                  <th className="px-3 py-2 text-left">Lead/Segment</th>
                  <th className="px-3 py-2 text-left">Assigned To</th>
                  <th className="px-3 py-2 text-left">Due Date</th>
                  <th className="px-3 py-2 text-left">Priority</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-[#3C4568] hover:bg-[#3C4568]/50">
                    <td className="px-3 py-2">{task.description}</td>
                    <td className="px-3 py-2">{task.leadName || 'N/A'}</td>
                    <td className="px-3 py-2">{task.assignedTo || 'Unassigned'}</td>
                    <td className="px-3 py-2">{task.dueDate}</td>
                    <td className="px-3 py-2">
                        <span className={`${getPriorityColor(task.priority)} font-semibold`}>{task.priority}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <button className="text-blue-400 hover:text-blue-300 text-xs mr-2">Edit</button>
                      <button className="text-green-400 hover:text-green-300 text-xs">Done</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {tasks.length === 0 && <p className="text-center py-4">No tasks found.</p>}
        </div>
      </div>
    </div>
  );
};

export default ReEngagementTasksPage;
