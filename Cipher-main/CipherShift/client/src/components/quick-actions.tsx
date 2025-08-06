import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eraser, ArrowLeftRight, Key, Zap } from "lucide-react";
import { cipher } from "@/lib/cipher";

interface QuickActionsProps {
  onClearAll: () => void;
  onSwapTexts: () => void;
  onGenerateKey: (key: string) => void;
}

export function QuickActions({ onClearAll, onSwapTexts, onGenerateKey }: QuickActionsProps) {
  const handleGenerateKey = () => {
    const newKey = cipher.generateRandomKey(5);
    onGenerateKey(newKey);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <Zap className="text-primary mr-3" />
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Button 
            variant="secondary"
            className="flex items-center justify-center space-x-2"
            onClick={onClearAll}
          >
            <Eraser size={16} />
            <span>Clear All</span>
          </Button>
          <Button 
            variant="secondary"
            className="flex items-center justify-center space-x-2"
            onClick={onSwapTexts}
          >
            <ArrowLeftRight size={16} />
            <span>Swap Texts</span>
          </Button>
          <Button 
            variant="secondary"
            className="flex items-center justify-center space-x-2"
            onClick={handleGenerateKey}
          >
            <Key size={16} />
            <span>Random Key</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
