import React, { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Select,
  SelectItem,
  Switch,
  Tabs,
  TabList,
  Tab,
  TabGroup,
  TabPanel,
  TabPanels,
  TextInput,
  Textarea,
  Grid,
  Col,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell
} from '@tremor/react';

// ... (previous interfaces and initial component code remain the same)

export const SystemSettings: React.FC = () => {
  // ... (previous state and handlers remain the same)

  const renderCompensationFormulas = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Text>Manage compensation calculation formulas</Text>
          <Button onClick={handleAddFormula} disabled={!isEditing}>
            Add Formula
          </Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Formula</TableHeaderCell>
              <TableHeaderCell>Specialty</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tempSettings.compensationFormulas.map((formula) => (
              <TableRow key={formula.id}>
                <TableCell>
                  {isEditing ? (
                    <TextInput
                      value={formula.name}
                      onChange={(e) => {
                        const updatedFormulas = tempSettings.compensationFormulas.map(f =>
                          f.id === formula.id ? { ...f, name: e.target.value } : f
                        );
                        setTempSettings({
                          ...tempSettings,
                          compensationFormulas: updatedFormulas
                        });
                      }}
                    />
                  ) : (
                    formula.name
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Textarea
                      value={formula.description}
                      onChange={(e) => {
                        const updatedFormulas = tempSettings.compensationFormulas.map(f =>
                          f.id === formula.id ? { ...f, description: e.target.value } : f
                        );
                        setTempSettings({
                          ...tempSettings,
                          compensationFormulas: updatedFormulas
                        });
                      }}
                    />
                  ) : (
                    formula.description
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Textarea
                      value={formula.formula}
                      onChange={(e) => {
                        const updatedFormulas = tempSettings.compensationFormulas.map(f =>
                          f.id === formula.id ? { ...f, formula: e.target.value } : f
                        );
                        setTempSettings({
                          ...tempSettings,
                          compensationFormulas: updatedFormulas
                        });
                      }}
                    />
                  ) : (
                    <code className="bg-gray-100 px-2 py-1 rounded">{formula.formula}</code>
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Select
                      value={formula.specialty || ''}
                      onValueChange={(value) => {
                        const updatedFormulas = tempSettings.compensationFormulas.map(f =>
                          f.id === formula.id ? { ...f, specialty: value } : f
                        );
                        setTempSettings({
                          ...tempSettings,
                          compensationFormulas: updatedFormulas
                        });
                      }}
                    >
                      <SelectItem value="">All Specialties</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      {/* Add more specialties */}
                    </Select>
                  ) : (
                    formula.specialty || 'All Specialties'
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={formula.isActive}
                    onChange={() => {
                      const updatedFormulas = tempSettings.compensationFormulas.map(f =>
                        f.id === formula.id ? { ...f, isActive: !f.isActive } : f
                      );
                      setTempSettings({
                        ...tempSettings,
                        compensationFormulas: updatedFormulas
                      });
                    }}
                    disabled={!isEditing}
                  />
                </TableCell>
                <TableCell>
                  {isEditing && (
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => {
                        const updatedFormulas = tempSettings.compensationFormulas.filter(
                          f => f.id !== formula.id
                        );
                        setTempSettings({
                          ...tempSettings,
                          compensationFormulas: updatedFormulas
                        });
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderNotificationSettings = () => {
    return (
      <div className="space-y-6">
        <Text>Configure system notifications</Text>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Notification Type</TableHeaderCell>
              <TableHeaderCell>Enabled</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>In-App</TableHeaderCell>
              <TableHeaderCell>Frequency</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tempSettings.notificationSettings.map((notification, index) => (
              <TableRow key={notification.type}>
                <TableCell>{notification.type}</TableCell>
                <TableCell>
                  <Switch
                    checked={notification.enabled}
                    onChange={() => {
                      const updatedNotifications = [...tempSettings.notificationSettings];
                      updatedNotifications[index] = {
                        ...notification,
                        enabled: !notification.enabled
                      };
                      setTempSettings({
                        ...tempSettings,
                        notificationSettings: updatedNotifications
                      });
                    }}
                    disabled={!isEditing}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={notification.emailEnabled}
                    onChange={() => {
                      const updatedNotifications = [...tempSettings.notificationSettings];
                      updatedNotifications[index] = {
                        ...notification,
                        emailEnabled: !notification.emailEnabled
                      };
                      setTempSettings({
                        ...tempSettings,
                        notificationSettings: updatedNotifications
                      });
                    }}
                    disabled={!isEditing || !notification.enabled}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={notification.inAppEnabled}
                    onChange={() => {
                      const updatedNotifications = [...tempSettings.notificationSettings];
                      updatedNotifications[index] = {
                        ...notification,
                        inAppEnabled: !notification.inAppEnabled
                      };
                      setTempSettings({
                        ...tempSettings,
                        notificationSettings: updatedNotifications
                      });
                    }}
                    disabled={!isEditing || !notification.enabled}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={notification.frequency}
                    onValueChange={(value: 'realtime' | 'daily' | 'weekly') => {
                      const updatedNotifications = [...tempSettings.notificationSettings];
                      updatedNotifications[index] = {
                        ...notification,
                        frequency: value
                      };
                      setTempSettings({
                        ...tempSettings,
                        notificationSettings: updatedNotifications
                      });
                    }}
                    disabled={!isEditing || !notification.enabled}
                  >
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        {/* ... (previous header code remains the same) */}

        <TabGroup>
          <TabList>
            <Tab>General</Tab>
            <Tab>Compensation Formulas</Tab>
            <Tab>Notifications</Tab>
            <Tab>Security</Tab>
          </TabList>
          <TabPanels>
            {/* ... (previous General tab panel code remains the same) */}
            
            <TabPanel>
              {renderCompensationFormulas()}
            </TabPanel>
            
            <TabPanel>
              {renderNotificationSettings()}
            </TabPanel>
            
            {/* Security Settings */}
            <TabPanel>
              <Grid numItems={2} className="gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password Expiry (Days)
                  </label>
                  <TextInput
                    type="number"
                    value={tempSettings.security.passwordExpiryDays}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      security: {
                        ...tempSettings.security,
                        passwordExpiryDays: parseInt(e.target.value)
                      }
                    })}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Session Timeout (Minutes)
                  </label>
                  <TextInput
                    type="number"
                    value={tempSettings.security.sessionTimeout}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      security: {
                        ...tempSettings.security,
                        sessionTimeout: parseInt(e.target.value)
                      }
                    })}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Require MFA
                  </label>
                  <Switch
                    checked={tempSettings.security.mfaRequired}
                    onChange={() => setTempSettings({
                      ...tempSettings,
                      security: {
                        ...tempSettings.security,
                        mfaRequired: !tempSettings.security.mfaRequired
                      }
                    })}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    IP Whitelist (one per line)
                  </label>
                  <Textarea
                    value={tempSettings.security.ipWhitelist.join('\n')}
                    onChange={(e) => setTempSettings({
                      ...tempSettings,
                      security: {
                        ...tempSettings.security,
                        ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim())
                      }
                    })}
                    disabled={!isEditing}
                    placeholder="Enter IP addresses..."
                    rows={4}
                  />
                </div>
              </Grid>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
};

export default SystemSettings;