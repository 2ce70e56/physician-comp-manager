export const PRODUCTIVITY_QUERY = `
  SELECT 
    ProviderID,
    DateOfService,
    SUM(wRVU) as TotalwRVU,
    COUNT(DISTINCT PatientID) as PatientCount,
    SUM(Charges) as TotalCharges
  FROM ProductivityData
  WHERE ProviderID = @providerId
  AND DateOfService BETWEEN @startDate AND @endDate
  GROUP BY ProviderID, DateOfService
  ORDER BY DateOfService
`;

export const PROVIDER_METRICS_QUERY = `
  SELECT 
    p.ProviderID,
    p.FirstName,
    p.LastName,
    p.Specialty,
    SUM(pd.wRVU) as TotalwRVU,
    COUNT(DISTINCT pd.PatientID) as TotalPatients,
    SUM(pd.Charges) as TotalCharges
  FROM Providers p
  LEFT JOIN ProductivityData pd ON p.ProviderID = pd.ProviderID
  WHERE pd.DateOfService BETWEEN @startDate AND @endDate
  GROUP BY p.ProviderID, p.FirstName, p.LastName, p.Specialty
`;