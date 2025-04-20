
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockPrediction } from "@/lib/types";
import { MODELS } from "@/lib/constants";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface PredictionDetailsProps {
  stockSymbol: string;
  predictions: StockPrediction[];
}

export default function PredictionDetails({ stockSymbol, predictions }: PredictionDetailsProps) {
  const [activeTab, setActiveTab] = useState<string>("latest");
  const [selectedPrediction, setSelectedPrediction] = useState<StockPrediction | null>(null);

  // Filter predictions for current stock
  const stockPredictions = predictions
    .filter(p => p.stockSymbol === stockSymbol)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Group predictions by date
  const predictionsByDate = stockPredictions.reduce((acc, prediction) => {
    if (!acc[prediction.date]) {
      acc[prediction.date] = [];
    }
    acc[prediction.date].push(prediction);
    return acc;
  }, {} as Record<string, StockPrediction[]>);

  // Get the latest date predictions
  const latestDate = Object.keys(predictionsByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  )[0];
  
  const latestPredictions = predictionsByDate[latestDate] || [];
  // Get historical predictions (with actual prices)
  const historicalPredictions = stockPredictions.filter(p => p.actualPrice !== null);

  // Get the model name from ID
  const getModelName = (modelId: string) => {
    const model = MODELS.find(m => m.id === modelId);
    return model ? model.displayName : modelId;
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{stockSymbol} Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="latest">Latest Predictions</TabsTrigger>
            <TabsTrigger value="historical">Historical Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="latest">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Predicted Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestPredictions.map((prediction) => (
                  <TableRow key={`${prediction.modelId}-${prediction.date}`}>
                    <TableCell>
                      <div className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: MODELS.find(m => m.id === prediction.modelId)?.color }}
                        ></span>
                        {getModelName(prediction.modelId)}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(prediction.date)}</TableCell>
                    <TableCell className="text-right font-medium">${prediction.predictedPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedPrediction(prediction)}
                          >
                            View Reasoning
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Prediction Reasoning</DialogTitle>
                          </DialogHeader>
                          <div className="pt-4">
                            <div className="mb-4">
                              <div className="flex justify-between mb-2">
                                <div className="flex items-center">
                                  <span 
                                    className="w-3 h-3 rounded-full mr-2" 
                                    style={{ backgroundColor: MODELS.find(m => m.id === selectedPrediction?.modelId)?.color }}
                                  ></span>
                                  <span className="font-medium">{getModelName(selectedPrediction?.modelId || '')}</span>
                                </div>
                                <span className="text-muted-foreground">{selectedPrediction?.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Predicted Price:</span>
                                <span className="font-semibold">${selectedPrediction?.predictedPrice.toFixed(2)}</span>
                              </div>
                            </div>
                            <ScrollArea className="h-[300px] border rounded-md p-4 bg-gray-50">
                              <p className="whitespace-pre-line">{selectedPrediction?.reasoning}</p>
                            </ScrollArea>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {latestPredictions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No predictions available for this stock.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="historical">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Predicted</TableHead>
                  <TableHead className="text-right">Actual</TableHead>
                  <TableHead className="text-right">Error %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalPredictions.map((prediction) => {
                  const isProfit = prediction.predictedPrice <= (prediction.actualPrice || 0);
                  return (
                    <TableRow key={`${prediction.modelId}-${prediction.date}`}>
                      <TableCell>
                        <div className="flex items-center">
                          <span 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: MODELS.find(m => m.id === prediction.modelId)?.color }}
                          ></span>
                          {getModelName(prediction.modelId)}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(prediction.date)}</TableCell>
                      <TableCell className="text-right">${prediction.predictedPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${prediction.actualPrice?.toFixed(2)}</TableCell>
                      <TableCell className={`text-right font-medium ${isProfit ? "text-profit" : "text-loss"}`}>
                        {prediction.percentError?.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  );
                })}
                {historicalPredictions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No historical data available for this stock.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
