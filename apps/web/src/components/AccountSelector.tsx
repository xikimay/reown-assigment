'use client';

import { useState } from 'react';
import type { Profile } from '@/services/profile';

interface AccountSelectorProps {
  profile: Profile;
  currentAddress?: string;
  onAddressChange: (address: string) => void;
}

export function AccountSelector({
  profile,
  currentAddress,
  onAddressChange,
}: AccountSelectorProps) {
  const accountAddresses = Object.keys(profile.accounts);

  // Use currentAddress if provided, otherwise use the first account
  const [selectedAddress, setSelectedAddress] = useState(
    currentAddress || accountAddresses[0] || ''
  );

  const handleAddressChange = (address: string) => {
    setSelectedAddress(address);
    onAddressChange(address);
  };

  if (accountAddresses.length <= 1) {
    return null; // Don't show selector if only one account
  }

  return (
    <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-lg">
      <span className="text-sm font-medium text-muted-foreground">
        Select Account:
      </span>
      <select
        value={selectedAddress}
        onChange={(e) => handleAddressChange(e.target.value)}
        className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        {accountAddresses.map((address) => {
          const accountData = profile.accounts[address];
          const networks = accountData.networks.join(', ');

          return (
            <option key={address} value={address}>
              {address.slice(0, 6)}...{address.slice(-4)} ({networks})
            </option>
          );
        })}
      </select>
    </div>
  );
}
