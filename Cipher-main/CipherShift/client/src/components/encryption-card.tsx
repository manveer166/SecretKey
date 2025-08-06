import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Copy, Settings } from "lucide-react";
import { cipher, type EncryptionStep } from "@/lib/cipher";
import { useClipboard } from "@/hooks/use-clipboard";

interface EncryptionCardProps {
  onEncryptedTextChange?: (text: string) => void;
}

export function EncryptionCard({ onEncryptedTextChange }: EncryptionCardProps) {
  const [plaintext, setPlaintext] = useState('');
  const [encryptKey, setEncryptKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [encryptionSteps, setEncryptionSteps] = useState<EncryptionStep[]>([]);
  const { copyToClipboard } = useClipboard();

  // Real-time encryption
  useEffect(() => {
    if (plaintext && encryptKey) {
      const { result, steps } = cipher.encrypt(plaintext, encryptKey);
      setEncryptedText(result);
      setEncryptionSteps(steps);
      onEncryptedTextChange?.(result);
    } else {
      setEncryptedText('');
      setEncryptionSteps([]);
      onEncryptedTextChange?.('');
    }
  }, [plaintext, encryptKey, onEncryptedTextChange]);

  const handleCopyEncrypted = () => {
    copyToClipboard(encryptedText, "Encrypted text copied to clipboard");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Lock className="text-primary text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Encrypt Text</h2>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Real-time</span>
        </div>

        <div className="space-y-4">
          {/* Original Text Input */}
          <div>
            <Label htmlFor="plaintext" className="block text-sm font-medium text-slate-700 mb-2">
              Original Text
            </Label>
            <Textarea 
              id="plaintext" 
              placeholder="Enter your text to encrypt..."
              className="h-32 resize-none"
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
            />
          </div>

          {/* Secret Key Input */}
          <div>
            <Label htmlFor="encrypt-key" className="block text-sm font-medium text-slate-700 mb-2">
              Secret Key
              <span className="text-xs text-slate-500 font-normal ml-1">(letters only, a=1, b=2, etc.)</span>
            </Label>
            <Input 
              type="text" 
              id="encrypt-key" 
              placeholder="abc"
              value={encryptKey}
              onChange={(e) => setEncryptKey(e.target.value.replace(/[^a-zA-Z]/g, ''))}
              className={!cipher.isValidKey(encryptKey) && encryptKey ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}
            />
            {encryptKey && !cipher.isValidKey(encryptKey) && (
              <p className="text-xs text-red-600 mt-1">Key must contain only letters</p>
            )}
          </div>

          {/* Encrypted Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="block text-sm font-medium text-slate-700">
                Encrypted Text
              </Label>
              <Button 
                variant="ghost"
                size="sm"
                className="text-xs text-primary hover:text-primary/80 h-auto p-1"
                onClick={handleCopyEncrypted}
                disabled={!encryptedText}
              >
                <Copy size={12} className="mr-1" />
                Copy
              </Button>
            </div>
            <Textarea 
              readOnly 
              className="h-32 bg-slate-50 font-mono resize-none"
              value={encryptedText}
              placeholder="Encrypted text will appear here..."
            />
          </div>

          {/* Step-by-step Process */}
          {encryptionSteps.length > 0 && (
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                <Settings className="text-slate-400 mr-2" size={14} />
                Step-by-step Process
              </h3>
              <div className="text-xs text-slate-600 space-y-1 font-mono max-h-24 overflow-y-auto">
                {encryptionSteps.slice(0, 10).map((step, index) => (
                  <div key={index}>
                    {step.original} + {step.key}({step.shift}) = {step.result}
                  </div>
                ))}
                {encryptionSteps.length > 10 && (
                  <div className="text-slate-400">... and {encryptionSteps.length - 10} more steps</div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
