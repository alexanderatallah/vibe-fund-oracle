
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TOP_STOCKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StockSelectorProps {
  selectedStock: string;
  onSelectStock: (symbol: string) => void;
}

export default function StockSelector({ selectedStock, onSelectStock }: StockSelectorProps) {
  const [open, setOpen] = useState(false);
  
  const selectedStockName = TOP_STOCKS.find(stock => stock.symbol === selectedStock)?.name || selectedStock;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
        >
          {selectedStock ? `${selectedStock} - ${selectedStockName}` : "Select stock..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search stocks..." />
          <CommandEmpty>No stock found.</CommandEmpty>
          <CommandGroup>
            {TOP_STOCKS.map((stock) => (
              <CommandItem
                key={stock.symbol}
                value={stock.symbol}
                onSelect={() => {
                  onSelectStock(stock.symbol);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedStock === stock.symbol ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="font-medium">{stock.symbol}</span>
                <span className="ml-2 text-muted-foreground">{stock.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
