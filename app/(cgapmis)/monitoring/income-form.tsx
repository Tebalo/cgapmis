'use client'
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, File } from 'lucide-react';

interface LineItem {
  id: string;
  description: string;
  amount: number;
}

export function IncomeStatementForm() {
  const [open, setOpen] = useState(false);
  const [revenueItems, setRevenueItems] = useState<LineItem[]>([]);
  const [expenseItems, setExpenseItems] = useState<LineItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [year, setYear] = useState('');
  const [tax, setTax] = useState('');
  const [title, setTitle] = useState('');
  const totalRevenue = revenueItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalExpenses = expenseItems.reduce((sum, item) => sum + (item.amount || 0), 0);

  const addItem = (type: 'revenue' | 'expense') => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      amount: 0
    };
    if (type === 'revenue') {
      setRevenueItems([...revenueItems, newItem]);
    } else {
      setExpenseItems([...expenseItems, newItem]);
    }
  };

  const removeItem = (id: string, type: 'revenue' | 'expense') => {
    if (type === 'revenue') {
      setRevenueItems(revenueItems.filter(item => item.id !== id));
    } else {
      setExpenseItems(expenseItems.filter(item => item.id !== id));
    }
  };

  const updateItem = (
    id: string, 
    field: 'description' | 'amount', 
    value: string | number, 
    type: 'revenue' | 'expense'
  ) => {
    const items = type === 'revenue' ? revenueItems : expenseItems;
    const setItems = type === 'revenue' ? setRevenueItems : setExpenseItems;
    
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: field === 'amount' ? Number(value) || 0 : value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file as File);
    formData.append('revenue', totalRevenue.toString());
    formData.append('year', year);
    formData.append('tax', tax);
    formData.append('expenses', totalExpenses.toString());
    // revenueItems.forEach((item, index) => {
    //   formData.append(`revenue-${index}-description`, item.description);
    //   formData.append(`revenue-${index}-amount`, item.amount.toString());
    // });
    // expenseItems.forEach((item, index) => {
    //   formData.append(`expense-${index}-description`, item.description);
    //   formData.append(`expense-${index}-amount`, item.amount.toString());
    // });

    try {
      const response = await fetch('http://74.208.205.44:8084/api/documents/', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Income statement created successfully');
        setOpen(false);
      } else {
        console.error('Error creating income statement:', await response.json());
      }
    } catch (error) {
      console.error('Error creating income statement:', error);
    }
  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-2 flex-1 sm:flex-initial">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add Statement</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Income Statement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Info */}
          <div>
            <Label>Company Information</Label>
            <Input 
              type='text'
              placeholder="Company Name" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2" />
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Input type="date" placeholder="Period Start" />
              <Input type="date" placeholder="Period End" />
            </div>
          </div>

          {/* Revenue Section */}
          <div>
            <div className="flex justify-between items-center">
              <Label>Revenue Items</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addItem('revenue')}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Revenue Item
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {revenueItems.map((item) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value, 'revenue')}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={item.amount || ''}
                    onChange={(e) => updateItem(item.id, 'amount', e.target.value, 'revenue')}
                    className="w-32"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id, 'revenue')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-2 text-right">
              <Label>Total Revenue: {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Label>
            </div>
          </div>

          {/* Expenses Section */}
          <div>
            <div className="flex justify-between items-center">
              <Label>Expense Items</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addItem('expense')}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Expense Item
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {expenseItems.map((item) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value, 'expense')}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={item.amount || ''}
                    onChange={(e) => updateItem(item.id, 'amount', e.target.value, 'expense')}
                    className="w-32"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id, 'expense')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-2 text-right">
              <Label>Total Expenses: {totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Label>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <Label>
              <File className="h-5 w-5 mr-2" />
              Upload File
            </Label>
            <Input
              type="file"
              accept=".pdf"
              className="mt-2"
              onChange={handleFileChange}
            />
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Year</Label>
              <Input
                type="text"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <Label>Tax</Label>
              <Input
                type="text"
                placeholder="Enter tax"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="text-right font-medium">
              Net Income: {(totalRevenue - totalExpenses).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit"
            >Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}