'use client';

import React from 'react';

type Props = {
  recipientName: string;
  recipientEmail: string;
  recipientMessage: string;
  onRecipientNameChange: (value: string) => void;
  onRecipientEmailChange: (value: string) => void;
  onRecipientMessageChange: (value: string) => void;
};

export function GiftRecipientDetails({
  recipientName,
  recipientEmail,
  recipientMessage,
  onRecipientNameChange,
  onRecipientEmailChange,
  onRecipientMessageChange,
}: Props) {
  return (
    <div className="border border-border rounded-2xl p-4">
      <p className="text-text-primary text-sm mb-4">
        Details of the Person you are Gifting this Virtual Instacard to
      </p>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name of the person gifting this card to"
          className="w-full bg-transparent border-b border-border py-3 text-text-primary text-sm placeholder:text-text-primary/60 outline-none! focus:ring-0! focus:border-border!"
          value={recipientName}
          onChange={(e) => onRecipientNameChange(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email of the person gifting this card to"
          className="w-full bg-transparent border-b border-border py-3 text-text-primary text-sm placeholder:text-text-primary/60 outline-none! focus:ring-0! focus:border-border!"
          value={recipientEmail}
          onChange={(e) => onRecipientEmailChange(e.target.value)}
        />
        <textarea
          placeholder="Type a Message for the person you are gifting this card to.."
          className="w-full bg-transparent py-3 text-text-primary text-sm placeholder:text-text-primary/60 outline-none! focus:ring-0! focus:border-border! resize-none"
          rows={2}
          value={recipientMessage}
          onChange={(e) => onRecipientMessageChange(e.target.value)}
        />
      </div>
    </div>
  );
}

