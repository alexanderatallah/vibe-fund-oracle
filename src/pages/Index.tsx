
import { useState, useEffect } from "react";
import { TOP_STOCKS, generateMockPredictions } from "@/lib/constants";
import { StockPrediction } from "@/lib/types";
import ModelLeaderboard from "@/components/ModelLeaderboard";
import StockSelector from "@/components/StockSelector";
import PredictionChart from "@/components/PredictionChart";
import PredictionDetails from "@/components/PredictionDetails";
import { useModelAnalytics } from "@/hooks/useModelAnalytics";

const Index = () => {
  const [predictions, setPredictions] = useState<StockPrediction[]>([]);
  const [selectedStock, setSelectedStock] = useState(TOP_STOCKS[0].symbol);
  const modelStats = useModelAnalytics(predictions);
  
  // Load mock data on first render
  useEffect(() => {
    const mockData = generateMockPredictions();
    setPredictions(mockData);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Vibe Fund Oracle</h1>
            <div className="text-sm text-muted-foreground">
              AI Stock Price Prediction Benchmark
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <ModelLeaderboard models={modelStats} />
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Stock Predictions</h2>
          <StockSelector 
            selectedStock={selectedStock} 
            onSelectStock={setSelectedStock} 
          />
        </div>
        
        <div className="mb-8">
          <PredictionChart 
            stockSymbol={selectedStock} 
            predictions={predictions} 
          />
        </div>
        
        <div>
          <PredictionDetails 
            stockSymbol={selectedStock} 
            predictions={predictions} 
          />
        </div>
      </main>
      
      <footer className="mt-16 py-6 border-t bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Vibe Fund Oracle - Benchmarking AI Models for Stock Price Prediction</p>
            <p className="mt-1">© {new Date().getFullYear()} Vibe Fund</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
