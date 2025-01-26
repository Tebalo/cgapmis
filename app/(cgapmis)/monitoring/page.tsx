'use client'
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, LineChart, FileText, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IncomeStatementForm } from './income-form';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

interface Statement {
  id: string;
  title: string;
  type: string;
  year: string;
  submissionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  filePath: string;
  fileType: string;
  revenue: string;
  expenses: string;
  tax: string;
  grossProfit: string;
  netProfit: string;
}

export default function MonitoringPage() {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [selectedStatement, setSelectedStatement] = useState<Statement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await fetch('http://74.208.205.44:8084/api/get-list/');
        const data = await response.json();
        setStatements(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            type: 'Income Statement',
            year: item.year,
            submissionDate: item.created_at,
            status: 'Approved',
            filePath: item.file_path,
            fileType: item.file_type,
            revenue: item.revenue,
            expenses: item.expenses,
            tax: item.tax,
            grossProfit: item.gross_profit,
            netProfit: item.net_profit,
          }))
        );
      } catch (error) {
        console.error('Error fetching statements:', error);
      }
    };

    fetchStatements();
  }, []);

  const handleViewStatement = (statement: Statement) => {
    setSelectedStatement(statement);
    setOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDownloadFile = (filePath: string, fileType: string) => {
    window.open(`http://74.208.205.44:8084/api/documents/${filePath}/download`, '_blank');
  };

  return (
    <div>
      <Tabs defaultValue="income" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="h-auto p-1 grid grid-cols-3 w-full sm:w-auto">
            <TabsTrigger value="income" className="gap-2 px-3 py-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Income Statements</span>
              <span className="sm:hidden">Income</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2 px-3 py-2" disabled>
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Performance Reports</span>
              <span className="sm:hidden">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2 px-3 py-2" disabled>
              <BellRing className="h-4 w-4" />
              <span className="hidden sm:inline">Monitoring Alerts</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button size="sm" variant="outline" className="h-8 gap-2 flex-1 sm:flex-initial">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <IncomeStatementForm />
          </div>
        </div>

        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Income Statements</CardTitle>
              <CardDescription>
                View and manage income statements for state-owned enterprises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statements.map((statement) => (
                    <TableRow key={statement.id}>
                      <TableCell className="font-medium">{statement.title}</TableCell>
                      <TableCell>{statement.type}</TableCell>
                      <TableCell>{statement.year}</TableCell>
                      <TableCell>{statement.submissionDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          statement.status === 'Approved' 
                            ? 'bg-green-100 text-green-800'
                            : statement.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {statement.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewStatement(statement)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
              <CardDescription>
                Track and analyze organizational performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              Performance reporting content
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Alerts</CardTitle>
              <CardDescription>
                View system alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              Alerts and notifications content
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedStatement && (
        <Drawer open={open} onOpenChange={setOpen} >
          <DrawerTrigger />
          <DrawerContent className="w-full md:w-3/4 lg:w-1/2 bg-background">
            <DrawerHeader className="bg-muted p-4">
              <DrawerTitle className="text-2xl font-bold">{selectedStatement.title}</DrawerTitle>
            </DrawerHeader>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium">Details</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p>{selectedStatement.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p>{selectedStatement.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submission Date</p>
                    <p>{selectedStatement.submissionDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p>{selectedStatement.status}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">Financial Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p>{selectedStatement.revenue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expenses</p>
                    <p>{selectedStatement.expenses}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tax</p>
                    <p>{selectedStatement.tax}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gross Profit</p>
                    <p>{selectedStatement.grossProfit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Net Profit</p>
                    <p>{selectedStatement.netProfit}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => handleDownloadFile(selectedStatement.filePath, selectedStatement.fileType)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}