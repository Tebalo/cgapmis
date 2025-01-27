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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Building2, 
  Users, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  FileText 
} from 'lucide-react';
import { format } from 'date-fns';

interface BoardVacancy {
  id: number;
  position: string;
  organization: string;
  sector: string;
  boardSize: number;
  applicationDeadline: string;
  status: string;
  compensation: string;
  meetingFrequency: string;
  qualifications: string;
  responsibilities: string;
  additionalRequirements: string;
}

const sampleVacancies: BoardVacancy[] = [
  {
    id: 1,
    position: 'Independent Non-Executive Director',
    organization: 'Botswana Power Corporation',
    sector: 'Energy',
    boardSize: 7,
    applicationDeadline: '2024-04-15',
    status: 'Open',
    compensation: 'Competitive board sitting allowance',
    meetingFrequency: 'Quarterly meetings with additional ad-hoc sessions',
    qualifications: 'Minimum Master\'s degree in Business, Engineering, or related field',
    responsibilities: 'Provide strategic oversight, financial guidance, and corporate governance',
    additionalRequirements: 'Minimum 10 years senior leadership experience in energy or related sectors'
  },
  {
    id: 2,
    position: 'Risk Management Expert',
    organization: 'Water Utilities Corporation',
    sector: 'Water Resources',
    boardSize: 9,
    applicationDeadline: '2024-05-01',
    status: 'Open',
    compensation: 'Competitive remuneration package',
    meetingFrequency: 'Bi-monthly board meetings',
    qualifications: 'PhD or Advanced Degree in Water Resource Management, Risk Management',
    responsibilities: 'Develop and oversee risk management strategies, ensure regulatory compliance',
    additionalRequirements: 'Proven track record in water sector risk assessment and mitigation'
  },
  {
    id: 3,
    position: 'Financial Expert',
    organization: 'Botswana Development Corporation',
    sector: 'Economic Development',
    boardSize: 6,
    applicationDeadline: '2024-04-30',
    status: 'Open',
    compensation: 'Competitive board allowance',
    meetingFrequency: 'Monthly strategic planning sessions',
    qualifications: 'CA(SA), CFA, or equivalent professional qualification',
    responsibilities: 'Provide financial oversight, investment strategy guidance',
    additionalRequirements: '15 years experience in financial leadership roles'
  }
];

export default function BoardVacanciesPage() {
  const [selectedVacancy, setSelectedVacancy] = useState<BoardVacancy | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Board Vacancies</h1>
        <p className="text-muted-foreground">Explore current board member opportunities in Botswana parastatals</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sampleVacancies.map((vacancy) => (
          <Card key={vacancy.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{vacancy.position}</CardTitle>
                <Badge 
                  variant={vacancy.status === 'Open' ? 'default' : 'secondary'}
                >
                  {vacancy.status}
                </Badge>
              </div>
              <CardDescription>{vacancy.organization}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {vacancy.sector}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> 
                    {format(new Date(vacancy.applicationDeadline), 'MMM d, yyyy')}
                  </span>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedVacancy(vacancy)}
                    >
                      View Vacancy Details
                    </Button>
                  </DialogTrigger>
                  {selectedVacancy && (
                    <DialogContent className="max-w-2xl max-h-[90vh] p-0">
                      <DialogHeader className="p-6 pb-0">
                        <DialogTitle>{selectedVacancy.position}</DialogTitle>
                        <p className="text-muted-foreground">{selectedVacancy.organization}</p>
                      </DialogHeader>
                      <ScrollArea className="max-h-[70vh] w-full px-6 pb-6">
                        <VacancyDetails vacancy={selectedVacancy} />
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

function VacancyDetails({ vacancy }: { vacancy: BoardVacancy }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-muted-foreground">Organization</label>
            <p className="font-medium">{vacancy.organization}</p>
          </div>
          <div>
            <label className="text-muted-foreground">Sector</label>
            <p className="font-medium">{vacancy.sector}</p>
          </div>
          <div>
            <label className="text-muted-foreground">Board Size</label>
            <p className="font-medium">{vacancy.boardSize} members</p>
          </div>
          <div>
            <label className="text-muted-foreground">Meeting Frequency</label>
            <p className="font-medium">{vacancy.meetingFrequency}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <CardTitle>Qualifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-muted-foreground">Educational Requirements</label>
            <p className="font-medium">{vacancy.qualifications}</p>
          </div>
          <div>
            <label className="text-muted-foreground">Additional Requirements</label>
            <p className="font-medium">{vacancy.additionalRequirements}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle>Responsibilities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{vacancy.responsibilities}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>Application Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-muted-foreground">Compensation</label>
            <p className="font-medium">{vacancy.compensation}</p>
          </div>
          <div>
            <label className="text-muted-foreground">Application Deadline</label>
            <p className="font-medium">
              {format(new Date(vacancy.applicationDeadline), 'PPP')}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button>Apply Now</Button>
      </div>
    </div>
  );
}