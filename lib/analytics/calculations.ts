interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  type: string;
  contracts: any[];
  productivity: any[];
  compensations: any[];
}

export function calculateAnalytics(providers: Provider[]) {
  const specialtyGroups = groupBySpecialty(providers);
  
  return {
    bySpecialty: Object.entries(specialtyGroups).map(([specialty, providers]) => ({
      specialty,
      providers: providers.length,
      averageCompensation: calculateAverageCompensation(providers),
      averageWRVUs: calculateAverageWRVUs(providers),
      compensationPerWRVU: calculateCompensationPerWRVU(providers)
    })),
    overall: {
      totalProviders: providers.length,
      totalCompensation: calculateTotalCompensation(providers),
      averageCompensation: calculateAverageCompensation(providers),
      averageWRVUs: calculateAverageWRVUs(providers)
    }
  };
}

function groupBySpecialty(providers: Provider[]) {
  return providers.reduce((groups, provider) => {
    groups[provider.specialty] = groups[provider.specialty] || [];
    groups[provider.specialty].push(provider);
    return groups;
  }, {} as Record<string, Provider[]>);
}

function calculateTotalCompensation(providers: Provider[]) {
  return providers.reduce((total, provider) => {
    return total + provider.compensations.reduce((sum, comp) => sum + comp.amount, 0);
  }, 0);
}

function calculateAverageCompensation(providers: Provider[]) {
  if (providers.length === 0) return 0;
  return calculateTotalCompensation(providers) / providers.length;
}

function calculateAverageWRVUs(providers: Provider[]) {
  if (providers.length === 0) return 0;
  const totalWRVUs = providers.reduce((total, provider) => {
    return total + provider.productivity.reduce((sum, prod) => sum + prod.value, 0);
  }, 0);
  return totalWRVUs / providers.length;
}

function calculateCompensationPerWRVU(providers: Provider[]) {
  const totalWRVUs = calculateAverageWRVUs(providers);
  if (totalWRVUs === 0) return 0;
  return calculateAverageCompensation(providers) / totalWRVUs;
}