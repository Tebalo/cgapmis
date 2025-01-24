import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, BarChart3, Building2, ClipboardCheck, Target, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Welcome Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to PEEPA Management System</CardTitle>
          <CardDescription>
            Privatization & State Enterprises Performance Monitoring Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Monitor state-owned enterprises, implement privatization strategies, and enhance corporate governance through data-driven insights.
          </p>
        </CardContent>
      </Card>

      {/* Key Performance Areas */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Strategic Actions</CardTitle>
          <CardDescription>Priority areas requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Building2 className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h4 className="font-semibold">Parastatal Performance Review</h4>
                <p className="text-sm text-muted-foreground">
                  Quarterly performance assessments due for 3 state enterprises
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-yellow-100 p-3">
                <Users className="h-6 w-6 text-yellow-700" />
              </div>
              <div>
                <h4 className="font-semibold">Board Appointments</h4>
                <p className="text-sm text-muted-foreground">
                  Review and update board composition for 2 parastatals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Target className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-semibold">Privatization Initiatives</h4>
                <p className="text-sm text-muted-foreground">
                  Progress tracking for ongoing privatization projects
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitored Entities</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              Active state-owned enterprises
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Governance Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              Average compliance rating
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Ongoing privatization initiatives
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Latest activities and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b pb-4">
              <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium">Performance Review Completed</h4>
                <p className="text-xs text-muted-foreground">
                  Annual assessment for Water Utilities Corporation
                </p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
            </div>
            
            <div className="flex items-center gap-4 border-b pb-4">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium">Board Meeting Scheduled</h4>
                <p className="text-xs text-muted-foreground">
                  Quarterly review of privatization strategies
                </p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">5 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}