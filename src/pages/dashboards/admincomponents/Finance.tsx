import React ,{useState}from 'react'
import {
    UsersIcon,
    AcademicCapIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    Cog6ToothIcon,
    BookOpenIcon,
    UserPlusIcon,
    BuildingLibraryIcon,
    XMarkIcon,
    Bars3Icon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    BanknotesIcon,
    ClockIcon,
    ExclamationCircleIcon,
  } from '@heroicons/react/24/outline';
  import DatePicker from 'react-datepicker';
  import { CSVLink } from 'react-csv';

  
// Add Financial interfaces
interface FinancialTransaction {
    id: string;
    studentId: string;
    studentName: string;
    type: 'tuition' | 'library' | 'hostel' | 'other';
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    dueDate: string;
    paidDate?: string;
    description: string;
  } 

  interface FinanceFilters {
    dateRange: DateRange;
    transactionType: string;
    paymentStatus: string;
    amountRange: {
      min: string;
      max: string;
    };
    searchTerm: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  } 
function Finance() {

     // Add financial state
  const [financialStats] = useState({
    totalRevenue: 15000000,
    pendingPayments: 2500000,
    overduePayments: 1200000,
    monthlyRevenue: 3500000,
    monthlyExpenses: 2800000,
    currentBalance: 8500000,
  });

   // Inside AdminDashboard component, add new state
   const [financeFilters, setFinanceFilters] = useState<FinanceFilters>({
    dateRange: {
      startDate: null,
      endDate: null,
    },
    transactionType: '',
    paymentStatus: '',
    amountRange: {
      min: '',
      max: '',
    },
    searchTerm: '',
    sortBy: 'dueDate',
    sortOrder: 'desc',
  });

    const formatCurrency = (amount: number) => {
        return `KSh ${amount.toLocaleString('en-KE')}`;
      };

      const [transactions] = useState<FinancialTransaction[]>([
        {
          id: '1',
          studentId: 'S001',
          studentName: 'John Doe',
          type: 'tuition',
          amount: 45000,
          status: 'paid',
          dueDate: '2024-02-15',
          paidDate: '2024-02-14',
          description: 'Semester 1 Tuition Fee'
        },
        {
          id: '2',
          studentId: 'S002',
          studentName: 'Jane Smith',
          type: 'hostel',
          amount: 25000,
          status: 'pending',
          dueDate: '2024-02-28',
          description: 'Hostel Fee - Block A'
        },
        {
          id: '3',
          studentId: 'S003',
          studentName: 'Mike Johnson',
          type: 'library',
          amount: 5000,
          status: 'overdue',
          dueDate: '2024-02-01',
          description: 'Library Fee'
        }
      ]);
    


       // Add new helper functions for finance
  const getFilteredTransactions = (transactions: FinancialTransaction[]) => {
    return transactions.filter(transaction => {
      const matchesSearch = 
        transaction.studentName.toLowerCase().includes(financeFilters.searchTerm.toLowerCase()) ||
        transaction.studentId.toLowerCase().includes(financeFilters.searchTerm.toLowerCase());
      
      const matchesType = !financeFilters.transactionType || 
        transaction.type === financeFilters.transactionType;
      
      const matchesStatus = !financeFilters.paymentStatus || 
        transaction.status === financeFilters.paymentStatus;
      
      const matchesAmount = 
        (!financeFilters.amountRange.min || transaction.amount >= Number(financeFilters.amountRange.min)) &&
        (!financeFilters.amountRange.max || transaction.amount <= Number(financeFilters.amountRange.max));
      
      const matchesDateRange = 
        (!financeFilters.dateRange.startDate || new Date(transaction.dueDate) >= financeFilters.dateRange.startDate) &&
        (!financeFilters.dateRange.endDate || new Date(transaction.dueDate) <= financeFilters.dateRange.endDate);
      
      return matchesSearch && matchesType && matchesStatus && matchesAmount && matchesDateRange;
    }).sort((a, b) => {
      const aValue = a[financeFilters.sortBy as keyof typeof a];
      const bValue = b[financeFilters.sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return financeFilters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return financeFilters.sortOrder === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });
  };

  const getTransactionSummary = (filteredTransactions: FinancialTransaction[]) => {
    return {
      total: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
      paid: filteredTransactions.filter(t => t.status === 'paid')
        .reduce((sum, t) => sum + t.amount, 0),
      pending: filteredTransactions.filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0),
      overdue: filteredTransactions.filter(t => t.status === 'overdue')
        .reduce((sum, t) => sum + t.amount, 0),
    };
  };
 
      const currentFilteredTransactions = getFilteredTransactions(transactions);
      const currentTransactionSummary = getTransactionSummary(currentFilteredTransactions);



    
  return (
    <div>
         <div className="space-y-4 sm:space-y-6">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Total Revenue Card */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(financialStats.totalRevenue)}
                    </p>
                    <p className="text-sm text-green-600 mt-2 flex items-center">
                      <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CurrencyDollarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Pending Payments Card */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Payments</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(financialStats.pendingPayments)}
                    </p>
                    <p className="text-sm text-yellow-600 mt-2 flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      Due within 30 days
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <BanknotesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Overdue Payments Card */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overdue Payments</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(financialStats.overduePayments)}
                    </p>
                    <p className="text-sm text-red-600 mt-2 flex items-center">
                      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      Requires immediate action
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <ArrowTrendingDownIcon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Transaction Filters</h3>
                <CSVLink
                  data={currentFilteredTransactions}
                  filename="transactions.csv"
                  className="mt-2 sm:mt-0 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export to CSV
                </CSVLink>
                      </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Date Range Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Date Range</label>
                  <div className="flex space-x-2">
                    <DatePicker
                      selected={financeFilters.dateRange.startDate}
                      onChange={(date: Date | null) => setFinanceFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, startDate: date }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholderText="Start Date"
                    />
                    <DatePicker
                      selected={financeFilters.dateRange.endDate}
                      onChange={(date: Date | null) => setFinanceFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, endDate: date }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholderText="End Date"
                    />
                    </div>
                </div>

                {/* Transaction Type Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
                  <select
                    value={financeFilters.transactionType}
                    onChange={(e) => setFinanceFilters(prev => ({
                      ...prev,
                      transactionType: e.target.value
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="">All Types</option>
                    <option value="tuition">Tuition</option>
                    <option value="library">Library</option>
                    <option value="hostel">Hostel</option>
                    <option value="other">Other</option>
                  </select>
                  </div>

                {/* Payment Status Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                  <select
                    value={financeFilters.paymentStatus}
                    onChange={(e) => setFinanceFilters(prev => ({
                      ...prev,
                      paymentStatus: e.target.value
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  </div>

                {/* Amount Range Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Amount Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={financeFilters.amountRange.min}
                      onChange={(e) => setFinanceFilters(prev => ({
                        ...prev,
                        amountRange: { ...prev.amountRange, min: e.target.value }
                      }))}
                      placeholder="Min"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <input
                      type="number"
                      value={financeFilters.amountRange.max}
                      onChange={(e) => setFinanceFilters(prev => ({
                        ...prev,
                        amountRange: { ...prev.amountRange, max: e.target.value }
                      }))}
                      placeholder="Max"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                </div>
              </div>
            </div>

              {/* Search and Sort */}
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={financeFilters.searchTerm}
                    onChange={(e) => setFinanceFilters(prev => ({
                      ...prev,
                      searchTerm: e.target.value
                    }))}
                    placeholder="Search by student name or ID..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
              </div>
                <div className="flex space-x-2">
                  <select
                    value={financeFilters.sortBy}
                    onChange={(e) => setFinanceFilters(prev => ({
                      ...prev,
                      sortBy: e.target.value
                    }))}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="dueDate">Due Date</option>
                    <option value="amount">Amount</option>
                    <option value="studentName">Student Name</option>
                    <option value="status">Status</option>
                  </select>
                  <button
                    onClick={() => setFinanceFilters(prev => ({
                      ...prev,
                      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
                    }))}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {financeFilters.sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-xl font-bold mt-1">{formatCurrency(currentTransactionSummary.total)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-xl font-bold text-green-600 mt-1">{formatCurrency(currentTransactionSummary.paid)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-yellow-600 mt-1">{formatCurrency(currentTransactionSummary.pending)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-xl font-bold text-red-600 mt-1">{formatCurrency(currentTransactionSummary.overdue)}</p>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentFilteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{transaction.studentName}</div>
                          <div className="text-sm text-gray-500">{transaction.studentId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{transaction.type}</div>
                          <div className="text-xs text-gray-500">{transaction.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(transaction.amount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'paid' 
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                            <button className="text-green-600 hover:text-green-900 text-sm">Mark Paid</button>
                            <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      
    </div>
  )
}

export default Finance
