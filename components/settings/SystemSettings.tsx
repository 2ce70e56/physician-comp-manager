'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SystemSettingsProps {
  onSave?: (settings: any) => void;
}

export function SystemSettings({ onSave }: SystemSettingsProps) {
  const [settings, setSettings] = useState({
    general: {
      organizationName: 'Medical Group',
      defaultCurrency: 'USD',
      fiscalYearStart: '01-01',
      dateFormat: 'MM/DD/YYYY',
      timeZone: 'America/New_York'
    },
    compensation: {
      defaultwRVURate: 45,
      defaultQualityBonus: 5,
      defaultCollectionRate: 35,
      enableProductivityBonus: true,
      enableQualityBonus: true,
      enableCollectionsBonus: true
    },
    notifications: {
      contractRenewalDays: 90,
      performanceAlertThreshold: 10,
      emailNotifications: true,
      inAppNotifications: true
    },
    security: {
      requireMFA: true,
      sessionTimeout: 30,
      passwordExpiryDays: 90,
      minimumPasswordLength: 12,
      ipWhitelist: [],
      allowedDomains: ['hospital.org']
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>System Settings</CardTitle>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardHeader>
      <CardContent>
        {saveSuccess && (
          <Alert className="mb-6">
            <AlertDescription>
              Settings have been saved successfully.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="compensation">Compensation</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input
                  value={settings.general.organizationName}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, organizationName: e.target.value }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Select
                  value={settings.general.defaultCurrency}
                  onValueChange={(value) => setSettings({
                    ...settings,
                    general: { ...settings.general, defaultCurrency: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fiscal Year Start</Label>
                <Input
                  value={settings.general.fiscalYearStart}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, fiscalYearStart: e.target.value }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select
                  value={settings.general.dateFormat}
                  onValueChange={(value) => setSettings({
                    ...settings,
                    general: { ...settings.general, dateFormat: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compensation" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default wRVU Rate ($)</Label>
                <Input
                  type="number"
                  value={settings.compensation.defaultwRVURate}
                  onChange={(e) => setSettings({
                    ...settings,
                    compensation: { ...settings.compensation, defaultwRVURate: Number(e.target.value) }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Default Quality Bonus (%)</Label>
                <Input
                  type="number"
                  value={settings.compensation.defaultQualityBonus}
                  onChange={(e) => setSettings({
                    ...settings,
                    compensation: { ...settings.compensation, defaultQualityBonus: Number(e.target.value) }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Enable Productivity Bonus</Label>
                <Switch
                  checked={settings.compensation.enableProductivityBonus}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    compensation: { ...settings.compensation, enableProductivityBonus: checked }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Enable Quality Bonus</Label>
                <Switch
                  checked={settings.compensation.enableQualityBonus}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    compensation: { ...settings.compensation, enableQualityBonus: checked }
                  })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Contract Renewal Notice (Days)</Label>
                <Input
                  type="number"
                  value={settings.notifications.contractRenewalDays}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, contractRenewalDays: Number(e.target.value) }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Performance Alert Threshold (%)</Label>
                <Input
                  type="number"
                  value={settings.notifications.performanceAlertThreshold}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, performanceAlertThreshold: Number(e.target.value) }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, emailNotifications: checked }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>In-App Notifications</Label>
                <Switch
                  checked={settings.notifications.inAppNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, inAppNotifications: checked }
                  })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Require MFA</Label>
                <Switch
                  checked={settings.security.requireMFA}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    security: { ...settings.security, requireMFA: checked }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: Number(e.target.value) }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Password Expiry (days)</Label>
                <Input
                  type="number"
                  value={settings.security.passwordExpiryDays}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, passwordExpiryDays: Number(e.target.value) }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Minimum Password Length</Label>
                <Input
                  type="number"
                  value={settings.security.minimumPasswordLength}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, minimumPasswordLength: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}