'use client';

import { useState } from 'react';
import { Card, Title, Text, Button, Select, SelectItem, NumberInput } from '@tremor/react';

export default function ProductivityImportPage() {
  const [importMethod, setImportMethod] = useState('sql');
  const [sqlConfig, setSqlConfig] = useState({
    server: '',
    database: '',
    username: '',
    password: ''
  });
  const [importStatus, setImportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [previewData, setPreviewData] = useState<any[]>([]);

  const handleSQLConfigChange = (field: string, value: string) => {
    setSqlConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Handle file upload
    setImportStatus('loading');
    try {
      // Process file
      setImportStatus('success');
    } catch (error) {
      setImportStatus('error');
    }
  };

  const handleSQLImport = async () => {
    setImportStatus('loading');
    try {
      // Connect to SQL server and import data
      setImportStatus('success');
    } catch (error) {
      setImportStatus('error');
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Import Productivity Data</Title>
      <Text>Import provider productivity data from SQL Server or file upload</Text>

      <Card className="mt-6">
        <div className="space-y-4">
          <Select
            value={importMethod}
            onValueChange={setImportMethod}
            placeholder="Select Import Method"
          >
            <SelectItem value="sql">SQL Server Import</SelectItem>
            <SelectItem value="file">File Upload</SelectItem>
          </Select>

          {importMethod === 'sql' ? (
            <div className="space-y-4">
              <TextInput
                placeholder="SQL Server"
                value={sqlConfig.server}
                onChange={(e) => handleSQLConfigChange('server', e.target.value)}
              />
              <TextInput
                placeholder="Database"
                value={sqlConfig.database}
                onChange={(e) => handleSQLConfigChange('database', e.target.value)}
              />
              <TextInput
                placeholder="Username"
                value={sqlConfig.username}
                onChange={(e) => handleSQLConfigChange('username', e.target.value)}
              />
              <TextInput
                type="password"
                placeholder="Password"
                value={sqlConfig.password}
                onChange={(e) => handleSQLConfigChange('password', e.target.value)}
              />
              <Button
                onClick={handleSQLImport}
                loading={importStatus === 'loading'}
              >
                Connect and Import
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <Text className="text-sm text-gray-500">
                Accepted formats: CSV, Excel (XLSX)
              </Text>
            </div>
          )}
        </div>
      </Card>

      {previewData.length > 0 && (
        <Card className="mt-6">
          <Title>Data Preview</Title>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">wRVUs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Encounters</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collections</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">{row.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.wRVUs}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.encounters}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${row.collections.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </main>
  );
}