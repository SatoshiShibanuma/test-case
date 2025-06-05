import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('README.md Test Note Validation', () => {
  const readmePath = path.resolve('readme.md');
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');

  // Test if test note section is present
  it('should have a test note section', () => {
    const testNoteSectionRegex = /##\s*Test\s*Notes?/i;
    expect(testNoteSectionRegex.test(readmeContent)).toBe(true, 'Test note section is missing');
  });

  // Test if test note is not empty
  it('should have a non-empty test note', () => {
    const testNoteContentRegex = /##\s*Test\s*Notes?\s*(.*?)(?=\n\n|\n#|$)/is;
    const match = readmeContent.match(testNoteContentRegex);
    
    expect(match).toBeTruthy('Test note section not found');
    
    if (match) {
      const testNoteContent = match[1].trim();
      expect(testNoteContent.length).toBeGreaterThan(0, 'Test note content should not be empty');
    }
  });

  // Test note should have minimum meaningful content
  it('should have a test note with sufficient information', () => {
    const testNoteContentRegex = /##\s*Test\s*Notes?\s*(.*?)(?=\n\n|\n#|$)/is;
    const match = readmeContent.match(testNoteContentRegex);
    
    expect(match).toBeTruthy('Test note section not found');
    
    if (match) {
      const testNoteContent = match[1].trim();
      const sentences = testNoteContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      expect(sentences.length).toBeGreaterThanOrEqual(2, 'Test note should have at least 2 meaningful sentences');
    }
  });
});