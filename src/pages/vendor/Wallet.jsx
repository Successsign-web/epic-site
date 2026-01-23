import React, { useState } from 'react';
import { Plus, DollarSign, History, CreditCard, Banknote } from 'lucide-react';

const Wallet = () => {
    const [balance, setBalance] = useState(150); // Placeholder balance
    const [transactions, setTransactions] = useState([
        { id: 1, date: '2023-11-20', type: 'Credit', amount: 100, description: 'Added funds' },
        { id: 2, date: '2023-11-22', type: 'Debit', amount: 10, description: 'Lead purchase: Anjali & Rohan' },
        { id: 3, date: '2023-11-25', type: 'Credit', amount: 50, description: 'Added funds' },
    ]);
    const [amountToAdd, setAmountToAdd] = useState('');

    const handleAddFunds = (e) => {
        e.preventDefault();
        const newAmount = parseInt(amountToAdd);
        if (isNaN(newAmount) || newAmount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }
        setBalance(balance + newAmount);
        setTransactions([...transactions, { id: transactions.length + 1, date: new Date().toISOString().slice(0, 10), type: 'Credit', amount: newAmount, description: 'Added funds' }]);
        setAmountToAdd('');
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wallet</h1>

            {/* Current Balance */}
            <div className="bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl shadow-lg p-6 flex items-center justify-between text-white mb-8">
                <div>
                    <p className="text-sm font-medium">Current Balance</p>
                    <p className="text-4xl font-bold mt-1">${balance.toLocaleString()}</p>
                </div>
                <DollarSign className="h-12 w-12 opacity-50" />
            </div>

            {/* Add Funds */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Funds</h2>
                <form onSubmit={handleAddFunds} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1 relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Banknote className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amountToAdd}
                            onChange={(e) => setAmountToAdd(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-red-700 w-full md:w-auto justify-center"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add Funds</span>
                    </button>
                </form>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 p-6 border-b">Transaction History</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            transaction.type === 'Credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                                        {transaction.type === 'Credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
