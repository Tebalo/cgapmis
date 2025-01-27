'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
//   CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  TrendingUp, 
//   DollarSign, 
  Activity, 
  PieChart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrganizationKPI {
  id: number;
  name: string;
  sector: string;
  kpis: {
    name: string;
    value: number;
    description: string;
    calculation: string;
    status: 'positive' | 'negative' | 'neutral';
  }[];
}

const sampleKPIs: OrganizationKPI[] = [
  {
    id: 1,
    name: 'Botswana Power Corporation',
    sector: 'Energy',
    kpis: [
      {
        name: 'Gross Profit Margin',
        value: 42.5,
        description: 'Measures the percentage of sales exceeding the cost of goods sold',
        calculation: '(Gross Profit / Sales) x 100',
        status: 'positive'
      },
      {
        name: 'Operating Profit Margin',
        value: 18.3,
        description: 'Assesses profitability after covering cost of goods sold and operating expenses',
        calculation: '(Operating Profit / Sales) x 100',
        status: 'neutral'
      },
      {
        name: 'Return on Assets',
        value: 6.7,
        description: 'Indicates efficiency in using assets to generate profits',
        calculation: '(Net Profit / Total Assets) x 100',
        status: 'positive'
      }
    ]
  },
  {
    id: 2,
    name: 'Water Utilities Corporation',
    sector: 'Water Resources',
    kpis: [
      {
        name: 'Operating Expense Ratio',
        value: 65.2,
        description: 'Evaluates operational efficiency by comparing operating expenses to net sales',
        calculation: '(Operating Expenses / Net Sales) x 100',
        status: 'negative'
      },
      {
        name: 'Fixed Asset Turnover',
        value: 1.4,
        description: 'Indicates efficiency in using fixed assets to generate sales',
        calculation: 'Net Sales / Average Fixed Assets',
        status: 'neutral'
      },
      {
        name: 'Return on Equity',
        value: 9.1,
        description: 'Evaluates profitability relative to shareholders\' equity',
        calculation: '(Net Profit / Shareholders\' Equity) x 100',
        status: 'positive'
      }
    ]
  },
  {
    id: 3,
    name: 'Botswana Development Corporation',
    sector: 'Economic Development',
    kpis: [
      {
        name: 'EBITDA',
        value: 45.6,
        description: 'Provides a snapshot of operational profitability',
        calculation: 'Revenue - COGS - Operating Expenses',
        status: 'positive'
      },
      {
        name: 'Research & Development Ratio',
        value: 3.2,
        description: 'Measures percentage of sales invested in R&D activities',
        calculation: '(R&D Expenses / Sales) x 100',
        status: 'neutral'
      },
      {
        name: 'Customer Acquisition Cost',
        value: 1250,
        description: 'Represents the cost to acquire a new customer',
        calculation: '(Total Sales & Marketing Expenses) / Number of New Customers',
        status: 'negative'
      }
    ]
  }
];

export default function KPIDashboardPage() {
  const [selectedOrg, setSelectedOrg] = useState<OrganizationKPI | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance KPIs</h1>
        <p className="text-muted-foreground">Key Performance Indicators for Botswana Parastatals</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sampleKPIs.map((org) => (
          <Card key={org.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{org.name}</CardTitle>
                <Badge variant="secondary">{org.sector}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {org.kpis.map((kpi) => (
                  <div 
                    key={kpi.name} 
                    className="flex justify-between items-center border-b pb-2 last:border-b-0"
                  >
                    <span className="font-medium">{kpi.name}</span>
                    <Badge 
                      variant={
                        kpi.status === 'positive' ? 'default' :
                        kpi.status === 'negative' ? 'destructive' :
                        'secondary'
                      }
                    >
                      {kpi.value}%
                    </Badge>
                  </div>
                ))}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setSelectedOrg(org)}
                    >
                      View Detailed KPIs
                    </Button>
                  </DialogTrigger>
                  {selectedOrg && (
                    <DialogContent className="max-w-2xl max-h-[90vh] p-0">
                      <DialogHeader className="p-6 pb-0">
                        <DialogTitle>{selectedOrg.name} KPIs</DialogTitle>
                        <p className="text-muted-foreground">{selectedOrg.sector} Sector</p>
                      </DialogHeader>
                      <ScrollArea className="max-h-[70vh] w-full px-6 pb-6">
                        <KPIDetails org={selectedOrg} />
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

function KPIDetails({ org }: { org: OrganizationKPI }) {
  return (
    <div className="space-y-6">
      {org.kpis.map((kpi) => (
        <Card key={kpi.name}>
          <CardHeader className="flex flex-row items-center gap-2">
            {kpi.status === 'positive' ? <TrendingUp className="h-5 w-5 text-green-500" /> :
             kpi.status === 'negative' ? <Activity className="h-5 w-5 text-red-500" /> :
             <PieChart className="h-5 w-5 text-muted-foreground" />}
            <CardTitle>{kpi.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-muted-foreground">Description</label>
              <p className="font-medium">{kpi.description}</p>
            </div>
            <div>
              <label className="text-muted-foreground">Calculation</label>
              <p className="font-medium">{kpi.calculation}</p>
            </div>
            <div>
              <label className="text-muted-foreground">Value</label>
              <p className="font-medium text-2xl">
                <Badge 
                  variant={
                    kpi.status === 'positive' ? 'default' :
                    kpi.status === 'negative' ? 'destructive' :
                    'secondary'
                  }
                >
                  {kpi.value}%
                </Badge>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}