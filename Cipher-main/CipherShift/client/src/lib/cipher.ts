// Variable Caesar Cipher implementation
export interface EncryptionStep {
  original: string;
  key: string;
  shift: number;
  result: string;
}

export class VariableCaesarCipher {
  // Convert letter to shift value (a=1, b=2, ..., z=26)
  private letterToShift(letter: string): number {
    const lowerLetter = letter.toLowerCase();
    if (lowerLetter >= 'a' && lowerLetter <= 'z') {
      return lowerLetter.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
    return 0;
  }

  // Shift a character by given amount
  private shiftChar(char: string, shift: number): string {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0));
    } else if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0));
    }
    return char; // Return unchanged for non-alphabetic characters
  }

  // Reverse shift a character by given amount
  private reverseShiftChar(char: string, shift: number): string {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) % 26) + 'A'.charCodeAt(0));
    } else if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) - shift + 26) % 26) + 'a'.charCodeAt(0));
    }
    return char; // Return unchanged for non-alphabetic characters
  }

  // Encrypt text with given key
  encrypt(text: string, key: string): { result: string; steps: EncryptionStep[] } {
    if (!key || !text) {
      return { result: '', steps: [] };
    }

    const cleanKey = key.toLowerCase().replace(/[^a-z]/g, '');
    if (cleanKey.length === 0) {
      return { result: text, steps: [] };
    }

    let result = '';
    const steps: EncryptionStep[] = [];
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
        const keyChar = cleanKey[keyIndex % cleanKey.length];
        const shift = this.letterToShift(keyChar);
        const shiftedChar = this.shiftChar(char, shift);
        
        steps.push({
          original: char,
          key: keyChar,
          shift: shift,
          result: shiftedChar
        });
        
        result += shiftedChar;
        keyIndex++;
      } else {
        result += char; // Preserve spaces and special characters
      }
    }

    return { result, steps };
  }

  // Decrypt text with given key
  decrypt(text: string, key: string): { result: string; success: boolean } {
    if (!key || !text) {
      return { result: '', success: false };
    }

    const cleanKey = key.toLowerCase().replace(/[^a-z]/g, '');
    if (cleanKey.length === 0) {
      return { result: text, success: false };
    }

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
        const keyChar = cleanKey[keyIndex % cleanKey.length];
        const shift = this.letterToShift(keyChar);
        const originalChar = this.reverseShiftChar(char, shift);
        
        result += originalChar;
        keyIndex++;
      } else {
        result += char; // Preserve spaces and special characters
      }
    }

    return { result, success: true };
  }

  // Generate a random key
  generateRandomKey(length: number = 5): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += letters[Math.floor(Math.random() * letters.length)];
    }
    return result;
  }

  // Validate key format
  isValidKey(key: string): boolean {
    return /^[a-zA-Z]+$/.test(key);
  }
}

export const cipher = new VariableCaesarCipher();
