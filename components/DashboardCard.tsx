import React from 'react';
import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react';

interface DashboardCardProps {
  title: string;
  metric: string | number;
  description?: string;
  delta?: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  metric,
  description,
  delta
}) => {
  return (
    <Card className="max-w-lg mx-auto">
      <Flex justifyContent="between" alignItems="center">
        <Text>{title}</Text>
        {delta !== undefined && (
          <BadgeDelta
            deltaType={delta >= 0 ? "increase" : "decrease"}
          >
            {delta}%
          </BadgeDelta>
        )}
      </Flex>
      <Metric>{metric}</Metric>
      {description && (
        <Text className="mt-2">{description}</Text>
      )}
    </Card>
  );
};

export default DashboardCard;