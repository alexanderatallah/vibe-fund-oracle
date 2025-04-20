
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MODELS } from "@/lib/constants";
import { StockPrediction } from "@/lib/types";

interface PredictionChartProps {
  stockSymbol: string;
  predictions: StockPrediction[];
}

export default function PredictionChart({ stockSymbol, predictions }: PredictionChartProps) {
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>(
    MODELS.reduce((acc, model) => ({...acc, [model.id]: true}), { actual: true })
  );

  // Transform data for the chart
  const chartData = predictions
    .filter(p => p.stockSymbol === stockSymbol)
    .reduce((acc, prediction) => {
      const dateEntry = acc.find(d => d.date === prediction.date);
      if (dateEntry) {
        dateEntry[prediction.modelId] = prediction.predictedPrice;
        if (prediction.actualPrice !== null) {
          dateEntry.actual = prediction.actualPrice;
        }
      } else {
        const newEntry: any = { date: prediction.date, [prediction.modelId]: prediction.predictedPrice };
        if (prediction.actualPrice !== null) {
          newEntry.actual = prediction.actualPrice;
        }
        acc.push(newEntry);
      }
      return acc;
    }, [] as any[])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const toggleLineVisibility = (key: string) => {
    setVisibleLines((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatYAxis = (value: number) => `$${value.toFixed(2)}`;
  
  interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
  }
  
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry: any) => (
            <div 
              key={entry.name} 
              className="flex items-center mb-1"
            >
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="mr-2">{getModelDisplayName(entry.name)}:</span>
              <span className="font-medium">${entry.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  const getModelDisplayName = (id: string) => {
    if (id === 'actual') return 'Actual';
    const model = MODELS.find(m => m.id === id);
    return model ? model.displayName : id;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{stockSymbol} Predictions vs Actual Price</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#64748b' }}
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                tick={{ fill: '#64748b' }}
                width={80}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                onClick={(e: any) => toggleLineVisibility(e.value)}
                formatter={(value: string) => (
                  <span style={{ color: visibleLines[value] ? MODELS.find(m => m.id === value)?.color || '#000000' : '#9ca3af' }}>
                    {getModelDisplayName(value)}
                  </span>
                )}
              />
              {visibleLines.actual && (
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="actual"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              )}
              {MODELS.map((model) => (
                visibleLines[model.id] && (
                  <Line
                    key={model.id}
                    type="monotone"
                    dataKey={model.id}
                    stroke={model.color}
                    strokeWidth={2}
                    strokeDasharray={model.id === 'openai-o3' ? '' : '3 3'}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
