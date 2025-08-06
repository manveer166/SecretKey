import { Card, CardContent } from "@/components/ui/card";
import { Info, ArrowRight } from "lucide-react";

export function HowItWorks() {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Info className="text-primary text-lg" />
          <h2 className="text-lg font-semibold text-slate-800">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-slate-700">Algorithm Explanation</h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex items-start space-x-2">
                <ArrowRight className="text-primary text-xs mt-1 flex-shrink-0" size={12} />
                <span>Each letter in the key represents a shift value (a=1, b=2, ... z=26)</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="text-primary text-xs mt-1 flex-shrink-0" size={12} />
                <span>The key cycles through the text for encryption</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="text-primary text-xs mt-1 flex-shrink-0" size={12} />
                <span>Preserves spaces and special characters</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-medium text-slate-700 mb-2">Example</h3>
            <div className="text-sm space-y-1">
              <div><span className="text-slate-500">Text:</span> <span className="font-mono">Hello World</span></div>
              <div><span className="text-slate-500">Key:</span> <span className="font-mono">abc</span></div>
              <div><span className="text-slate-500">Result:</span> <span className="font-mono">Igopt Yosoe</span></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
