import { NextResponse } from 'next/server';

// Define the structure of a financial record based on Building-Plan.md
interface FinancialRecord {
  id: string;
  organization_id?: string; // Optional, assuming it might be contextually inferred or added later
  source_type: 'campaign' | 'contact' | 'manual_entry' | 'other';
  source_id?: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  timestamp: string; // ISO date string
  currency: string;
}

// Mock data for the API
const mockFinancialRecords: FinancialRecord[] = [
  {
    id: 'rec_001',
    source_type: 'manual_entry',
    amount: 1500.00,
    type: 'income',
    description: 'Payment for Invoice #INV-2023-001',
    timestamp: '2023-10-15T10:00:00Z',
    currency: 'USD'
  },
  {
    id: 'rec_002',
    source_type: 'other',
    amount: 99.50,
    type: 'expense',
    description: 'Monthly Software Subscription - CRM Pro',
    timestamp: '2023-10-14T14:30:00Z',
    currency: 'USD'
  },
  {
    id: 'rec_003',
    source_type: 'campaign',
    source_id: 'camp_xyz_789',
    amount: 5250.75,
    type: 'income',
    description: 'Revenue from Q4 Marketing Campaign',
    timestamp: '2023-10-10T16:45:00Z',
    currency: 'USD'
  },
  {
    id: 'rec_004',
    source_type: 'manual_entry',
    amount: 250.00,
    type: 'expense',
    description: 'Office Supplies Purchase',
    timestamp: '2023-10-05T11:20:00Z',
    currency: 'USD'
  },
  {
    id: 'rec_005',
    source_type: 'contact',
    source_id: 'cont_abc_123',
    amount: 75.00,
    type: 'expense',
    description: 'Client Gift Basket',
    timestamp: '2023-10-02T09:00:00Z',
    currency: 'USD'
  }
];

export async function GET(request: Request) {
  // In a real application, you would fetch this data from a database
  // and handle query parameters for filtering, pagination, etc.
  try {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json(mockFinancialRecords);
  } catch (error) {
    console.error("Error fetching financial records:", error);
    return NextResponse.json({ message: "Error fetching financial records" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // In a real application, you would validate the input and save it to a database
  try {
    const newRecord = await request.json() as Omit<FinancialRecord, 'id' | 'timestamp'>;
    // Simulate adding a record
    const createdRecord: FinancialRecord = {
      ...newRecord,
      id: `rec_${String(Date.now()).slice(-5)}`, // Generate a simple unique ID
      timestamp: new Date().toISOString(),
    };
    mockFinancialRecords.push(createdRecord); // Add to our mock data store
    return NextResponse.json(createdRecord, { status: 201 });
  } catch (error) {
    console.error("Error creating financial record:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
    }
    return NextResponse.json({ message: "Error creating financial record" }, { status: 500 });
  }
}

// You might also want PUT for updates and DELETE for removing records.
// For now, GET and POST should suffice for initial setup.
