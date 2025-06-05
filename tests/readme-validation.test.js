import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('README.md Test Note Validation', () => {
  const readmePath = path.resolve('readme.md');
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');

  it('should have a meaningful test note section', () => {
    // Validate test note exists and has meaningful content
    expect(readmeContent).toBeTruthy();
    expect(readmeContent.trim()).not.toBe('test notes go here :)');
  });

  it('should have a test note with at least 3 sentences', () => {
    const testNoteRegex = /test\s+notes?(?:\s*\(.*\))?:?\s*(.*?)(?=\n\n|\n#|$)/is;
    const match = readmeContent.match(testNoteRegex);
    
    expect(match).toBeTruthy('Test note section not found');
    
    if (match) {
      const testNoteContent = match[1].trim();
      const sentences = testNoteContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      expect(sentences.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('should use professional language', () => {
    const unprofessionalWords = [
      ':)', ':(', 'lol', 'haha', 'gonna', 'kinda', 
      'wanna', 'cool', 'awesome', 'sucks', 'dummy'
    ];

    unprofessionalWords.forEach(word => {
      expect(readmeContent.toLowerCase()).not.toContain(word);
    });
  });
});