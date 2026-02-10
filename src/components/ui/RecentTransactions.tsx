
'use client'
import React, { useState } from 'react'
import TransactionHistoryItem from './TransactionHistoryItem'

type TransactionTab = 'billed' | 'unbilled'

type ToggleOption = {
    label: string
    value: TransactionTab
}

const TOGGLE_OPTIONS: ToggleOption[] = [
    { label: 'Billed', value: 'billed' },
    { label: 'Unbilled', value: 'unbilled' },
]

type Transaction = {
    id: string
    name: string
    adminName: string
    date: string
    amount: string
    initial: string
    color: string
    type: 'credit' | 'debit'
    status: 'billed' | 'unbilled'
}

const transactionData: Transaction[] = [
    {
        id: '1',
        name: 'Google Cloud',
        adminName: 'John Doe',
        date: 'Jan 01 , 2025 | 8:00 PM',
        amount: '+ N 23,670',
        initial: 'G',
        color: 'bg-orange',
        type: 'credit',
        status: 'billed'
    },
    {
        id: '2',
        name: 'Amazon',
        adminName: 'Jane Smith',
        date: 'Nov 30, 2024 | 8:45 PM',
        amount: '+ N 72,107',
        initial: 'A',
        color: 'bg-gray-400',
        type: 'credit',
        status: 'billed'
    },
    {
        id: '3',
        name: 'Salary Deposit',
        adminName: 'HR Department',
        date: 'Nov 24, 2024 | 9:45 PM',
        amount: '- N 550,000',
        initial: 'S',
        color: 'bg-black',
        type: 'debit',
        status: 'unbilled'
    },
    {
        id: '4',
        name: 'Chatgpt',
        adminName: 'Mike Johnson',
        date: 'Nov 24, 2024 | 9:45 PM',
        amount: '- N 55,000',
        initial: 'C',
        color: 'bg-black',
        type: 'debit',
        status: 'unbilled'
    },
    {
        id: '5',
        name: 'Refund',
        adminName: 'Support Team',
        date: 'Oct 20, 2024 | 2:30 PM',
        amount: '+ N 15,000',
        initial: 'R',
        color: 'bg-zinc-500',
        type: 'credit',
        status: 'billed'
    },
    {
        id: '6',
        name: 'Amazon Prime',
        adminName: 'Sarah Wilson',
        date: 'Oct 15, 2024 | 10:00 AM',
        amount: '- N 12,107',
        initial: 'A',
        color: 'bg-black',
        type: 'debit',
        status: 'unbilled'
    },
    {
        id: '7',
        name: 'Bank Transfer',
        adminName: 'Finance Dept',
        date: 'Oct 10, 2024 | 11:00 AM',
        amount: '+ N 200,000',
        initial: 'B',
        color: 'bg-zinc-500',
        type: 'credit',
        status: 'billed'
    },
    {
        id: '8',
        name: 'Netflix',
        adminName: 'Admin User',
        date: 'Oct 05, 2024 | 8:00 PM',
        amount: '- N 5,500',
        initial: 'N',
        color: 'bg-black',
        type: 'debit',
        status: 'unbilled'
    },
    {
        id: '9',
        name: 'Spotify',
        adminName: 'Music Dept',
        date: 'Sep 28, 2024 | 3:15 PM',
        amount: '- N 2,500',
        initial: 'S',
        color: 'bg-green-500',
        type: 'debit',
        status: 'unbilled'
    },
    {
        id: '10',
        name: 'Freelance Payment',
        adminName: 'Client ABC',
        date: 'Sep 25, 2024 | 1:00 PM',
        amount: '+ N 150,000',
        initial: 'F',
        color: 'bg-blue-500',
        type: 'credit',
        status: 'billed'
    },
    {
        id: '11',
        name: 'Uber',
        adminName: 'Transport',
        date: 'Sep 20, 2024 | 7:30 PM',
        amount: '- N 8,500',
        initial: 'U',
        color: 'bg-black',
        type: 'debit',
        status: 'unbilled'
    },
    {
        id: '12',
        name: 'Dividend',
        adminName: 'Investment Co',
        date: 'Sep 15, 2024 | 9:00 AM',
        amount: '+ N 45,000',
        initial: 'D',
        color: 'bg-purple-500',
        type: 'credit',
        status: 'billed'
    },
    {
        id: '13',
        name: 'Apple Store',
        adminName: 'Tech Purchase',
        date: 'Sep 10, 2024 | 4:45 PM',
        amount: '- N 125,000',
        initial: 'A',
        color: 'bg-gray-600',
        type: 'debit',
        status: 'unbilled'
    },
    {
        id: '14',
        name: 'Bonus',
        adminName: 'HR Department',
        date: 'Sep 05, 2024 | 10:30 AM',
        amount: '+ N 300,000',
        initial: 'B',
        color: 'bg-yellow-500',
        type: 'credit',
        status: 'billed'
    },
    {
        id: '15',
        name: 'Electricity Bill',
        adminName: 'Utilities',
        date: 'Sep 01, 2024 | 2:00 PM',
        amount: '- N 18,000',
        initial: 'E',
        color: 'bg-orange-500',
        type: 'debit',
        status: 'unbilled'
    },
    {
        id: '16',
        name: 'Interest',
        adminName: 'Bank',
        date: 'Aug 28, 2024 | 12:00 PM',
        amount: '+ N 5,200',
        initial: 'I',
        color: 'bg-teal-500',
        type: 'credit',
        status: 'billed'
    }
]

export default function RecentTransactions() {
    const [activeTab, setActiveTab] = useState<TransactionTab>('billed')

    const filteredTransactions = transactionData.filter(
        (transaction) => transaction.status === activeTab
    )

    return (
        <div className='p-5 border border-border rounded-2xl'>
            <div>
                <p className='text-text-primary text-md '>Recent Transactions History</p>
            </div>
            
            <div className="flex items-center justify-between gap-2 w-full my-4">
                {TOGGLE_OPTIONS.map((option) => {
                    const isActive = option.value === activeTab

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setActiveTab(option.value)}
                            aria-pressed={isActive}
                            className={[
                                'py-2 px-4 w-full border rounded-full text-center transition-colors',
                                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                                isActive ? 'border-primary' : 'border-text-primary/20',
                            ].join(' ')}
                        >
                            <span className="text-sm">{option.label}</span>
                        </button>
                    )
                })}
            </div>

            <div 
                className="max-h-80 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}
            >
                {filteredTransactions.map((transaction, index) => (
                    <div key={transaction.id} className={`flex items-center justify-between py-4 ${index !== filteredTransactions.length - 1 ? 'border-b border-text-primary/10' : ''}`}>
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

            <p className='text-xs text-text-secondary text-center mt-3'>Scroll to view more</p>

        </div>
    )
}
