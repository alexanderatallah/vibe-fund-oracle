
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MODELS } from "@/lib/constants";
import { ModelInfo } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface ModelLeaderboardProps {
  models: ModelInfo[];
}

export default function ModelLeaderboard({ models }: ModelLeaderboardProps) {
  const [sortedModels, setSortedModels] = useState<ModelInfo[]>(models);
  
  useEffect(() => {
    // Sort models by score in descending order
    const sorted = [...models].sort((a, b) => b.score - a.score);
    setSortedModels(sorted);
  }, [models]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Predictions</TableHead>
              <TableHead className="text-right">Avg. Accuracy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedModels.map((model, index) => (
              <TableRow key={model.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: model.color }}
                    ></span>
                    {model.displayName}
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">{model.score.toFixed(2)}</TableCell>
                <TableCell className="text-right">{model.predictions}</TableCell>
                <TableCell className="text-right">
                  {model.predictions > 0 
                    ? <span>{(100 - model.accuracy).toFixed(2)}%</span> 
                    : <span className="text-muted-foreground">N/A</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
