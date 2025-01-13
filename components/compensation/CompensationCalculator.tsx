export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

const exportToCSV = (results: CalculatorResults, inputs: CalculatorInputs, contractType: string) => {
  const csvContent = `
Compensation Calculation Summary
Date: ${new Date().toLocaleDateString()}

Contract Type: ${contractType}

Inputs:
Base Compensation: ${formatCurrency(inputs.baseCompensation)}
wRVU Rate: ${inputs.wRVURate}
wRVU Threshold: ${inputs.wRVUThreshold}
Actual wRVUs: ${inputs.actualWRVUs}
Collection Rate: ${inputs.collectionRate * 100}%
Actual Collections: ${formatCurrency(inputs.actualCollections)}
Quality Score: ${inputs.quality}%

Results:
Base Payment: ${formatCurrency(results.basePayment)}
Productivity Bonus: ${formatCurrency(results.productivityBonus)}
Collections Bonus: ${formatCurrency(results.collectionsBonus)}
Quality Bonus: ${formatCurrency(results.qualityBonus)}
Total Compensation: ${formatCurrency(results.totalCompensation)}

Monthly Breakdown:
${results.metrics.map(m => `${m.month},${m.wRVUs},${formatCurrency(m.collections)},${formatCurrency(m.compensation)}`).join('\n')}
`;

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `compensation-calculation-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

return (
  <Card>
    <CardHeader>
      <CardTitle>Compensation Calculator</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="input">
          <TabsList>
            <TabsTrigger value="input">Calculator</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Saved Calculations</TabsTrigger>
          </TabsList>

          <TabsContent value="input">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Contract Type</Label>
                <Select value={contractType} onValueChange={setContractType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production Based</SelectItem>
                    <SelectItem value="salary">Straight Salary</SelectItem>
                    <SelectItem value="hybrid">Hybrid Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Base Compensation</Label>
                <Input
                  type="number"
                  value={inputs.baseCompensation}
                  onChange={(e) => setInputs({ ...inputs, baseCompensation: Number(e.target.value) })}
                />
              </div>

              {/* Other input fields */}

              <div className="col-span-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Base Payment</TableCell>
                      <TableCell className="text-right">{formatCurrency(results.basePayment)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Productivity Bonus</TableCell>
                      <TableCell className="text-right">{formatCurrency(results.productivityBonus)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Collections Bonus</TableCell>
                      <TableCell className="text-right">{formatCurrency(results.collectionsBonus)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Quality Bonus</TableCell>
                      <TableCell className="text-right">{formatCurrency(results.qualityBonus)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">Total Compensation</TableCell>
                      <TableCell className="text-right font-bold">{formatCurrency(results.totalCompensation)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="flex justify-end space-x-4 mt-4">
                  <Button variant="outline" onClick={() => setInputs(DEFAULT_INPUTS)}>Reset</Button>
                  <Button onClick={handleSaveCalculation}>Save Calculation</Button>
                  <Button onClick={() => exportToCSV(results, inputs, contractType)}>Export</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.metrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Line yAxisId="left" type="monotone" dataKey="wRVUs" stroke="#2563eb" name="wRVUs" />
                        <Line yAxisId="right" type="monotone" dataKey="compensation" stroke="#16a34a" name="Compensation" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>wRVUs</TableHead>
                    <TableHead>Collections</TableHead>
                    <TableHead>Compensation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.metrics.map((metric) => (
                    <TableRow key={metric.month}>
                      <TableCell>{metric.month}</TableCell>
                      <TableCell>{metric.wRVUs}</TableCell>
                      <TableCell>{formatCurrency(metric.collections)}</TableCell>
                      <TableCell>{formatCurrency(metric.compensation)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            {savedCalculations.length > 0 ? (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Base Compensation</TableHead>
                      <TableHead>Total Compensation</TableHead>
                      <TableHead>wRVUs</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedCalculations.map((calc, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatCurrency(calc.basePayment)}</TableCell>
                        <TableCell>{formatCurrency(calc.totalCompensation)}</TableCell>
                        <TableCell>{inputs.actualWRVUs}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            onClick={() => setSelectedCalculation(index)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground">No saved calculations yet. Save a calculation to compare different scenarios.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </CardContent>
  </Card>
);
}