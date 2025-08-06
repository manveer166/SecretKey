import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

export function SecurityNotice() {
  return (
    <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="text-blue-600 dark:text-blue-400 text-xs" size={12} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Security & Privacy</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• All encryption/decryption happens locally in your browser</li>
              <li>• No data is sent to any server or stored anywhere</li>
              <li>• This is a simple Caesar cipher - not suitable for sensitive data</li>
              <li>• For real security needs, use established encryption algorithms</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
