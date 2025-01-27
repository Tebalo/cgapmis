'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Contact, GraduationCap, Building2 } from 'lucide-react';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BoardApplication {
  id: number;
  name: string;
  position: string;
  organization: string;
  status: string;
  appliedDate: string;
  email: string;
  phone: string;
  qualifications: string;
  experience: string;
  currentRole: string;
  documents: { type: string; uploadDate: string }[];
}

const sampleApplications: BoardApplication[] = [
    {
      id: 1,
      name: 'Masego Molefe',
      position: 'Board Member',
      organization: 'Botswana Power Corporation',
      status: 'Pending',
      appliedDate: '2024-02-15',
      email: 'masego.molefe@bpc.bw',
      phone: '+267 564 3210',
      qualifications: 'MBA in Energy Management',
      experience: '15 years in Power Sector',
      currentRole: 'Senior Energy Strategist',
      documents: [
        { type: 'CV', uploadDate: '2024-02-10' },
        { type: 'Passport', uploadDate: '2024-02-12' }
      ]
    },
    {
      id: 2,
      name: 'Selele Kotu',
      position: 'Independent Director',
      organization: 'Water Utilities Corporation',
      status: 'Approved',
      appliedDate: '2024-01-20',
      email: 'selele.kotu@wuc.bw',
      phone: '+267 725 8901',
      qualifications: 'PhD in Water Resource Management',
      experience: '12 years in Utility Administration',
      currentRole: 'Chief Operations Officer',
      documents: [
        { type: 'Recommendation Letter', uploadDate: '2024-01-15' },
        { type: 'Professional Certificates', uploadDate: '2024-01-18' }
      ]
    },
    {
      id: 3,
      name: 'Kealeboga Montsho',
      position: 'Risk Management Expert',
      organization: 'Botswana Development Corporation',
      status: 'Under Review',
      appliedDate: '2024-03-05',
      email: 'kealeboga.montsho@bdc.bw',
      phone: '+267 672 4567',
      qualifications: 'CFA, Corporate Governance Certification',
      experience: '10 years in Economic Development',
      currentRole: 'Senior Investment Analyst',
      documents: [
        { type: 'Risk Management Certificate', uploadDate: '2024-03-01' }
      ]
    },
    {
      id: 4,
      name: 'Ontlametse Radikolo',
      position: 'Strategic Planning Director',
      organization: 'Air Botswana',
      status: 'Pending',
      appliedDate: '2024-02-28',
      email: 'ontlametse.radikolo@airbotswana.bw',
      phone: '+267 318 7654',
      qualifications: 'Master\'s in Aviation Management',
      experience: '8 years in Transportation Strategy',
      currentRole: 'Director of Business Development',
      documents: [
        { type: 'Aviation Leadership Certificate', uploadDate: '2024-02-25' }
      ]
    }
];

export default function BoardApplicationsPage() {
    const [selectedApplication, setSelectedApplication] = useState<BoardApplication | null>(null);
  
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Board Applications</h1>
          <p className="text-muted-foreground">Review and manage board member applications</p>
        </div>
  
        <div className="grid md:grid-cols-3 gap-6">
          {sampleApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{application.name}</CardTitle>
                  <Badge 
                    variant={
                      application.status === 'Approved' ? 'default' :
                      application.status === 'Pending' ? 'secondary' :
                      'outline'
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
                <CardDescription>
                  {application.position} - {application.organization}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Applied on</span>
                    <span>{format(new Date(application.appliedDate), 'MMM d, yyyy')}</span>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setSelectedApplication(application)}
                      >
                        View Application Details
                      </Button>
                    </DialogTrigger>
                    {selectedApplication && (
                      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
                        <DialogHeader className="p-6 pb-0">
                          <DialogTitle>Application Details</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-[70vh] w-full px-6 pb-6">
                          <ApplicationDetails application={selectedApplication} />
                        </ScrollArea>
                      </DialogContent>
                    )}
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
}
  
function ApplicationDetails({ application }: { application: BoardApplication }) {
return (
    <div className="space-y-6">
    <Card>
        <CardHeader className="flex flex-row items-center gap-2">
        <Contact className="h-5 w-5 text-primary" />
        <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
        <div>
            <label className="text-muted-foreground">Name</label>
            <p className="font-medium">{application.name}</p>
        </div>
        <div>
            <label className="text-muted-foreground">Email</label>
            <p className="font-medium">{application.email}</p>
        </div>
        <div>
            <label className="text-muted-foreground">Phone</label>
            <p className="font-medium">{application.phone}</p>
        </div>
        </CardContent>
    </Card>

    <Card>
        <CardHeader className="flex flex-row items-center gap-2">
        <Building2 className="h-5 w-5 text-primary" />
        <CardTitle>Professional Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
        <div>
            <label className="text-muted-foreground">Position</label>
            <p className="font-medium">{application.position}</p>
        </div>
        <div>
            <label className="text-muted-foreground">Organization</label>
            <p className="font-medium">{application.organization}</p>
        </div>
        <div>
            <label className="text-muted-foreground">Current Role</label>
            <p className="font-medium">{application.currentRole}</p>
        </div>
        </CardContent>
    </Card>

    <Card>
        <CardHeader className="flex flex-row items-center gap-2">
        <GraduationCap className="h-5 w-5 text-primary" />
        <CardTitle>Qualifications</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
        <div>
            <label className="text-muted-foreground">Qualifications</label>
            <p className="font-medium">{application.qualifications}</p>
        </div>
        <div>
            <label className="text-muted-foreground">Experience</label>
            <p className="font-medium">{application.experience}</p>
        </div>
        </CardContent>
    </Card>

    <Card>
        <CardHeader className="flex flex-row items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
        {application.documents.map((doc, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>{doc.type}</span>
            <span className="text-muted-foreground">
                {format(new Date(doc.uploadDate), 'MMM d, yyyy')}
            </span>
            </div>
        ))}
        </CardContent>
    </Card>

    <div className="flex justify-end gap-4">
        <Button variant="outline">Reject</Button>
        <Button>Approve</Button>
    </div>
    </div>
);
}