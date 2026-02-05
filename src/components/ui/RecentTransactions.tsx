
import React from 'react'
import TransactionHistoryItem from './TransactionHistoryItem'

type Transaction = {
    id: string
    name: string
    adminName: string
    date: string
    amount: string
    initial: string
    color: string
    type: 'credit' | 'debit'
}

const transactionData: Transaction[] = [
    {
        id: '1',
        name: 'Google Cloud',
        adminName: 'John Doe',
        date: 'Jan 01 , 2025 | 8:00 PM',
        amount: '- N 23,670',
        initial: 'G',
        color: 'bg-orange',
        type: 'debit'
    },
    {
        id: '2',
        name: 'Amazon',
        adminName: 'Jane Smith',
        date: 'Nov 30, 2024 | 8:45 PM',
        amount: '- N 72,107',
        initial: 'A',
        color: 'bg-gray-400',
        type: 'debit'
    },
    {
        id: '3',
        name: 'Salary Deposit',
        adminName: 'HR Department',
        date: 'Nov 24, 2024 | 9:45 PM',
        amount: '+ N 550,000',
        initial: 'S',
        color: 'bg-black',
        type: 'credit'
    },
    {
        id: '4',
        name: 'Chatgpt',
        adminName: 'Mike Johnson',
        date: 'Nov 24, 2024 | 9:45 PM',
        amount: '- N 55,000',
        initial: 'C',
        color: 'bg-black',
        type: 'debit'
    },
    {
        id: '5',
        name: 'Refund',
        adminName: 'Support Team',
        date: 'Oct 20, 2024 | 2:30 PM',
        amount: '+ N 15,000',
        initial: 'R',
        color: 'bg-zinc-500',
        type: 'credit'
    },
    {
        id: '6',
        name: 'Amazon Prime',
        adminName: 'Sarah Wilson',
        date: 'Oct 15, 2024 | 10:00 AM',
        amount: '- N 12,107',
        initial: 'A',
        color: 'bg-black',
        type: 'debit'
    },
    {
        id: '7',
        name: 'Bank Transfer',
        adminName: 'Finance Dept',
        date: 'Oct 10, 2024 | 11:00 AM',
        amount: '+ N 200,000',
        initial: 'B',
        color: 'bg-zinc-500',
        type: 'credit'
    },
    {
        id: '8',
        name: 'Netflix',
        adminName: 'Admin User',
        date: 'Oct 05, 2024 | 8:00 PM',
        amount: '- N 5,500',
        initial: 'N',
        color: 'bg-black',
        type: 'debit'
    }
]

export default function RecentTransactions() {
    return (
        <div className='p-5 border border-border rounded-2xl'>
            <p className='text-text-primary text-md '>Recent Transactions History</p>
            {transactionData.map((transaction, index) => (
                <div key={transaction.id} className={`flex items-center justify-between py-4 ${index !== transactionData.length - 1 ? 'border-b border-text-primary/10' : ''}`}>
                    <div className='flex items-center gap-3'>
                        <div className={`w-10 h-10 ${transaction.color} rounded-lg flex items-center justify-center`}>
                            <span className='text-white font-semibold text-lg'>{transaction.initial}</span>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-sm font-medium text-text-primary'>{transaction.name}</p>
                            <p className='text-xs text-text-primary'>{transaction.adminName}</p>
                            <p className='text-xs text-text-secondary'>{transaction.date}</p>
                        </div>
                    </div>
                    <p className={`text-sm font-medium ${transaction.type === 'credit' ? 'text-green-500' : 'text-error'}`}>{transaction.amount}</p>
                </div>
            ))}

        </div>
    )
}
