import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Unlock, Copy, CheckCircle, XCircle } from "lucide-react";
import { cipher } from "@/lib/cipher";
import { useClipboard } from "@/hooks/use-clipboard";

interface DecryptionCardProps {
  initialCiphertext?: string;
}

export function DecryptionCard({ initialCiphertext = '' }: DecryptionCardProps) {
  const [ciphertext, setCiphertext] = useState(initialCiphertext);
  const [decryptKey, setDecryptKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [decryptionSuccess, setDecryptionSuccess] = useState<boolean | null>(null);
  const { copyToClipboard } = useClipboard();

  // Update ciphertext when prop changes
  useEffect(() => {
    setCiphertext(initialCiphertext);
  }, [initialCiphertext]);

  // Real-time decryption
  useEffect(() => {
    if (ciphertext && decryptKey) {
      const { result, success } = cipher.decrypt(ciphertext, decryptKey);
      setDecryptedText(result);
      setDecryptionSuccess(success);
    } else {
      setDecryptedText('');
      setDecryptionSuccess(null);
    }
  }, [ciphertext, decryptKey]);

  const handleCopyDecrypted = () => {
    copyToClipboard(decryptedText, "Decrypted text copied to clipboard");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Unlock className="text-accent text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Decrypt Text</h2>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Real-time</span>
        </div>

        <div className="space-y-4">
          {/* Encrypted Text Input */}
          <div>
            <Label htmlFor="ciphertext" className="block text-sm font-medium text-slate-700 mb-2">
              Encrypted Text
            </Label>
            <Textarea 
              id="ciphertext" 
              placeholder="Enter encrypted text to decrypt..."
              className="h-32 font-mono resize-none"
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
            />
          </div>

          {/* Secret Key Input */}
          <div>
            <Label htmlFor="decrypt-key" className="block text-sm font-medium text-slate-700 mb-2">
              Secret Key
              <span className="text-xs text-slate-500 font-normal ml-1">(must match encryption key)</span>
            </Label>
            <Input 
              type="text" 
              id="decrypt-key" 
              placeholder="abc"
              value={decryptKey}
              onChange={(e) => setDecryptKey(e.target.value.replace(/[^a-zA-Z]/g, ''))}
              className={!cipher.isValidKey(decryptKey) && decryptKey ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}
            />
            {decryptKey && !cipher.isValidKey(decryptKey) && (
              <p className="text-xs text-red-600 mt-1">Key must contain only letters</p>
            )}
          </div>

          {/* Decrypted Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="block text-sm font-medium text-slate-700">
                Decrypted Text
              </Label>
              <Button 
                variant="ghost"
                size="sm"
                className="text-xs text-accent hover:text-accent/80 h-auto p-1"
                onClick={handleCopyDecrypted}
                disabled={!decryptedText}
              >
                <Copy size={12} className="mr-1" />
                Copy
              </Button>
            </div>
            <Textarea 
              readOnly 
              className="h-32 bg-slate-50 resize-none"
              value={decryptedText}
              placeholder="Decrypted text will appear here..."
            />
          </div>

          {/* Status Indicator */}
          {decryptionSuccess !== null && decryptKey && ciphertext && (
            <div className="flex items-center space-x-2 text-sm">
              {decryptionSuccess ? (
                <div className="flex items-center space-x-2 text-accent">
                  <CheckCircle size={16} />
                  <span>Successfully decrypted</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-red-600">
                  <XCircle size={16} />
                  <span>Decryption failed - check your key</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
