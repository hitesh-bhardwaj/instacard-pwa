import React from 'react'

interface Transaction {
  id: string
  name: string
  date: string
  amount: string
  initial: string
  color: string
}

interface TransactionGroup {
  label: string
  transactions: Transaction[]
}

const transactionData: TransactionGroup[] = [
  {
    label: 'Yesterday',
    transactions: [
      {
        id: '1',
        name: 'Google Cloud',
        date: 'Jan 01 , 2025 | 8:00 PM',
        amount: '- N 23,670',
        initial: 'G',
        color: 'bg-orange'
      }
    ]
  },
  {
    label: 'Nov 2025',
    transactions: [
      {
        id: '2',
        name: 'Amazon',
        date: 'Nov 30, 2024 | 8:45 PM',
        amount: '- N 72,107',
        initial: 'A',
        color: 'bg-gray-400'
      },
      {
        id: '3',
        name: 'Chatgpt',
        date: 'Nov 24, 2024 | 9:45 PM',
        amount: '- N 55,000',
        initial: 'C',
        color: 'bg-black'
      }
    ]
  },
  {
    label: 'October 2025',
    transactions: [
      {
        id: '4',
        name: 'Amazon Prime',
        date: 'Oct 15, 2024 | 10:00 AM',
        amount: '- N 12,107',
        initial: 'A',
        color: 'bg-red-500'
      }
    ]
  },
  {
    label: 'Yesterday',
    transactions: [
      {
        id: '5',
        name: 'Google Cloud',
        date: 'Jan 01 , 2025 | 8:00 PM',
        amount: '- N 23,670',
        initial: 'G',
        color: 'bg-orange'
      }
    ]
  },
  {
    label: 'Nov 2025',
    transactions: [
      {
        id: '6',
        name: 'Amazon',
        date: 'Nov 30, 2024 | 8:45 PM',
        amount: '- N 72,107',
        initial: 'A',
        color: 'bg-gray-400'
      },
      {
        id: '7',
        name: 'Chatgpt',
        date: 'Nov 24, 2024 | 9:45 PM',
        amount: '- N 55,000',
        initial: 'C',
        color: 'bg-black'
      }
    ]
  },
  {
    label: 'October 2025',
    transactions: [
      {
        id: '8',
        name: 'Amazon Prime',
        date: 'Oct 15, 2024 | 10:00 AM',
        amount: '- N 12,107',
        initial: 'A',
        color: 'bg-red-500'
      }
    ]
  }
]

export default function TransactionHistoryItem() {
  return (
    <>
      {transactionData.map((group, groupIndex) => (
        <div key={`${group.label}-${groupIndex}`} className='pt-3  pb-3 border-b border-text-primary/10'>
          <p className='text-xs text-text-secondary'>{group.label}</p>
          
          {group.transactions.map((transaction) => (
            <div key={transaction.id} className='flex items-center justify-between py-3'>
              <div className='flex items-center gap-3'>
                <div className={`w-10 h-10 ${transaction.color} rounded-lg flex items-center justify-center`}>
                  <span className='text-white font-semibold text-lg'>{transaction.initial}</span>
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm font-semibold text-text-primary'>{transaction.name}</p>
                  <p className='text-xs text-text-secondary'>{transaction.date}</p>
                </div>
              </div>
              <p className='text-sm text-error font-semibold'>{transaction.amount}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
