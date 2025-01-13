'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Provider {
  id: string;
  name: string;
  specialty: string;
  // ... other provider properties
}

interface Contract {
  id: string;
  name: string;
  provider: string;
  // ... other contract properties
}

interface DataContextType {
  providers: Provider[];
  contracts: Contract[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  addProvider: (provider: Omit<Provider, 'id'>) => Promise<Provider>;
  updateProvider: (id: string, provider: Partial<Provider>) => Promise<Provider>;
  deleteProvider: (id: string) => Promise<void>;
  addContract: (contract: Omit<Contract, 'id'>) => Promise<Contract>;
  updateContract: (id: string, contract: Partial<Contract>) => Promise<Contract>;
  deleteContract: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [providersRes, contractsRes] = await Promise.all([
        fetch('/api/providers'),
        fetch('/api/contracts')
      ]);

      if (!providersRes.ok || !contractsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [providersData, contractsData] = await Promise.all([
        providersRes.json(),
        contractsRes.json()
      ]);

      setProviders(providersData);
      setContracts(contractsData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProvider = async (provider: Omit<Provider, 'id'>) => {
    const response = await fetch('/api/providers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(provider)
    });

    if (!response.ok) {
      throw new Error('Failed to add provider');
    }

    const newProvider = await response.json();
    setProviders(prev => [...prev, newProvider]);
    return newProvider;
  };

  const updateProvider = async (id: string, provider: Partial<Provider>) => {
    const response = await fetch(`/api/providers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(provider)
    });

    if (!response.ok) {
      throw new Error('Failed to update provider');
    }

    const updatedProvider = await response.json();
    setProviders(prev => prev.map(p => p.id === id ? updatedProvider : p));
    return updatedProvider;
  };

  const deleteProvider = async (id: string) => {
    const response = await fetch(`/api/providers/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete provider');
    }

    setProviders(prev => prev.filter(p => p.id !== id));
  };

  const addContract = async (contract: Omit<Contract, 'id'>) => {
    const response = await fetch('/api/contracts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contract)
    });

    if (!response.ok) {
      throw new Error('Failed to add contract');
    }

    const newContract = await response.json();
    setContracts(prev => [...prev, newContract]);
    return newContract;
  };

  const updateContract = async (id: string, contract: Partial<Contract>) => {
    const response = await fetch(`/api/contracts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contract)
    });

    if (!response.ok) {
      throw new Error('Failed to update contract');
    }

    const updatedContract = await response.json();
    setContracts(prev => prev.map(c => c.id === id ? updatedContract : c));
    return updatedContract;
  };

  const deleteContract = async (id: string) => {
    const response = await fetch(`/api/contracts/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete contract');
    }

    setContracts(prev => prev.filter(c => c.id !== id));
  };

  const value = {
    providers,
    contracts,
    isLoading,
    error,
    refreshData: fetchData,
    addProvider,
    updateProvider,
    deleteProvider,
    addContract,
    updateContract,
    deleteContract
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}