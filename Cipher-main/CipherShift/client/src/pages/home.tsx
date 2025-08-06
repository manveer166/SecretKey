import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SecurityNotice } from '@/components/security-notice';
import { Lock, Shield, Eraser, ArrowLeftRight, Key, RefreshCw, Copy, ClipboardPaste, MessageCircle } from 'lucide-react';
import { cipher } from "@/lib/cipher";
import { useClipboard } from "@/hooks/use-clipboard";

export default function Home() {
  const [originalText, setOriginalText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const { copyToClipboard } = useClipboard();

  // Real-time encryption/decryption
  useEffect(() => {
    if (originalText && secretKey) {
      if (mode === 'encrypt') {
        const { result } = cipher.encrypt(originalText, secretKey);
        setOutputText(result);
      } else {
        const { result } = cipher.decrypt(originalText, secretKey);
        setOutputText(result);
      }
    } else {
      setOutputText('');
    }
  }, [originalText, secretKey, mode]);

  const handleClearAll = () => {
    setOriginalText('');
    setOutputText('');
    setSecretKey('');
  };

  const handleSwapTexts = () => {
    const temp = originalText;
    setOriginalText(outputText);
    setOutputText(temp);
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
  };

  const handleGenerateKey = () => {
    const newKey = cipher.generateRandomKey(5);
    setSecretKey(newKey);
  };

  const handleCopyOutput = () => {
    copyToClipboard(outputText, "Output text copied to clipboard");
  };

  const handlePasteInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setOriginalText(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleShareToWhatsApp = () => {
    if (!outputText) return;
    
    const message = `Encrypted message from SecretShift:\n\n${outputText}\n\nDecrypt it at: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 font-sans min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Lock className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">SecretShift</h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Text encryption & decryption tool</p>
                  <span className="hidden sm:block text-slate-300 dark:text-slate-600">•</span>
                  <a 
                    href="https://linktr.ee/sahotamanveer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 transition-colors underline touch-manipulation"
                  >
                    @sahotamanveer
                  </a>
                </div>
                <div className="mt-1">
                  <a 
                    href="https://buymeacoffee.com/manveer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors underline touch-manipulation"
                  >
                    ☕ Buy me a coffee
                  </a>
                </div>
              </div>
            </div>
            <div className="flex sm:hidden items-center space-x-2 text-sm text-slate-600 dark:text-slate-300 self-start">
              <Shield className="text-accent" size={16} />
              <span>Secure & Private</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
              <Shield className="text-accent" size={16} />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-4 sm:space-y-6">
        {/* Secret Key Section */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <Label htmlFor="secret-key" className="block text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100">
                Secret Key
              </Label>
              <Input 
                type="text" 
                id="secret-key" 
                placeholder="Enter your secret key (letters only, a=1, b=2, etc.)"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                className="text-base sm:text-lg h-12 sm:h-auto bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 touch-manipulation"
              />
              {secretKey && !cipher.isValidKey(secretKey) && (
                <p className="text-sm text-red-600 dark:text-red-400">Key must contain only letters</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Text Processing Section */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              {/* Original Text */}
              <div className="space-y-3 sm:space-y-4">
                <Label htmlFor="original-text" className="block text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Original Text
                </Label>
                <Textarea 
                  id="original-text" 
                  placeholder="Enter your text here..."
                  className="h-48 sm:h-64 resize-none text-base bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 touch-manipulation"
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                />
              </div>

              {/* Output Text */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="output-text" className="block text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Output Text
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="default"
                      size="sm"
                      className="flex items-center justify-center space-x-2 h-10 text-sm font-medium touch-manipulation"
                      onClick={() => setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt')}
                    >
                      <RefreshCw size={14} />
                      <span>{mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}</span>
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center space-x-2 h-10 text-sm font-medium touch-manipulation border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      onClick={handleCopyOutput}
                      disabled={!outputText}
                    >
                      <Copy size={14} />
                      <span>Copy Output</span>
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center space-x-2 h-10 text-sm font-medium touch-manipulation border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      onClick={handlePasteInput}
                    >
                      <ClipboardPaste size={14} />
                      <span>Paste Input</span>
                    </Button>
                  </div>
                </div>
                <Textarea 
                  id="output-text" 
                  placeholder="Output will appear here..."
                  className="h-48 sm:h-64 resize-none text-base bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 font-mono touch-manipulation"
                  value={outputText}
                  readOnly
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <Button 
                variant="outline"
                className="flex items-center justify-center space-x-2 h-12 sm:h-10 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 touch-manipulation text-base sm:text-sm"
                onClick={handleClearAll}
              >
                <Eraser size={18} className="sm:w-4 sm:h-4" />
                <span>Clear All</span>
              </Button>
              <Button 
                variant="outline"
                className="flex items-center justify-center space-x-2 h-12 sm:h-10 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 touch-manipulation text-base sm:text-sm"
                onClick={handleSwapTexts}
                disabled={!originalText && !outputText}
              >
                <ArrowLeftRight size={18} className="sm:w-4 sm:h-4" />
                <span>Swap Texts</span>
              </Button>
              <Button 
                variant="outline"
                className="flex items-center justify-center space-x-2 h-12 sm:h-10 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 touch-manipulation text-base sm:text-sm"
                onClick={handleGenerateKey}
              >
                <Key size={18} className="sm:w-4 sm:h-4" />
                <span>Random Key</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Share Button */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <Button 
              variant="default"
              className="w-full flex items-center justify-center space-x-2 h-12 sm:h-10 bg-green-600 hover:bg-green-700 text-white touch-manipulation text-base sm:text-sm"
              onClick={handleShareToWhatsApp}
              disabled={!outputText}
            >
              <MessageCircle size={18} className="sm:w-4 sm:h-4" />
              <span>Share Output to WhatsApp</span>
            </Button>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <SecurityNotice />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-slate-600 dark:text-slate-300">
              <span>© 2024 SecretShift</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-300">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Help</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
