'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
//   TrendingUp, 
//   TrendingDown, 
  DollarSign, 
  Users, 
  Activity 
} from 'lucide-react';

// Sample data structures
interface FinancialMetrics {
  revenue: number;
  profit: number;
  expenses: number;
  growthRate: number;
}

interface OperationalMetrics {
  employeeCount: number;
  productivity: number;
  utilization: number;
}

interface MarketData {
  marketShare: number;
  customerSatisfaction: number;
  newCustomers: number;
}

interface AnalyticsDashboard {
  organization: string;
  financial: FinancialMetrics;
  operational: OperationalMetrics;
  market: MarketData;
  performanceData: { month: string; revenue: number; profit: number }[];
  expenseBreakdown: { category: string; amount: number }[];
}

const sampleDashboardData: AnalyticsDashboard[] = [
  {
    organization: 'Botswana Power Corporation',
    financial: {
      revenue: 450750000,
      profit: 87650000,
      expenses: 363100000,
      growthRate: 5.2
    },
    operational: {
      employeeCount: 1250,
      productivity: 78.5,
      utilization: 82.3
    },
    market: {
      marketShare: 62.5,
      customerSatisfaction: 85.7,
      newCustomers: 3500
    },
    performanceData: [
      { month: 'Jan', revenue: 35000000, profit: 6750000 },
      { month: 'Feb', revenue: 38500000, profit: 7425000 },
      { month: 'Mar', revenue: 42250000, profit: 8150000 },
      { month: 'Apr', revenue: 45075000, profit: 8700000 }
    ],
    expenseBreakdown: [
      { category: 'Operations', amount: 180000000 },
      { category: 'Maintenance', amount: 95000000 },
      { category: 'Administration', amount: 58000000 },
      { category: 'Marketing', amount: 30100000 }
    ]
  }
];

export default function AnalyticsDashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOrg, setSelectedOrg] = useState(sampleDashboardData[0]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organizational Analytics</h1>
        <p className="text-muted-foreground">Comprehensive Performance Insights</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Financial Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              P {selectedOrg.financial.revenue.toLocaleString()}
            </div>
            <p className={`text-xs ${selectedOrg.financial.growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {selectedOrg.financial.growthRate > 0 ? '+' : ''}
              {selectedOrg.financial.growthRate}% from last month
            </p>
          </CardContent>
        </Card>

        {/* Operational Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employee Productivity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedOrg.operational.productivity}%
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedOrg.operational.employeeCount} total employees
            </p>
          </CardContent>
        </Card>

        {/* Market Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Share</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedOrg.market.marketShare}%
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedOrg.market.newCustomers} new customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue & Profit Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={selectedOrg.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedOrg.expenseBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}