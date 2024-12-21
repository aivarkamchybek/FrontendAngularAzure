import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuoteService } from '../serviceQuote/quote.service';

@Component({
  selector: 'app-quote-dialog',
  templateUrl: './quote-dialog.component.html',
  styleUrls: ['./quote-dialog.component.css']
})
export class QuoteDialogComponent {
  newQuote = { id: 0, content: '', author: '', userEmail: '' };
  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<QuoteDialogComponent>,
    private quoteService: QuoteService
  ) {}

  // Method to create a new quote
  createQuote(): void {
    this.isLoading = true;
    // Check if the content and author fields are filled
    if (!this.newQuote.content || !this.newQuote.author) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Create the quote by calling the service
    this.quoteService.createQuote(this.newQuote).subscribe(
      (quote) => {
        // Successfully created a quote, close the dialog and return the new quote
        this.isLoading = false;
        this.dialogRef.close(quote);
      },
      (error) => {
        // Handle errors (e.g., API failure)
        this.isLoading = false;
        this.errorMessage = 'Failed to create quote.';
        console.error(error);
      }
    );
  }

  // Method to close the dialog without doing anything
  cancel(): void {
    this.dialogRef.close();
  }
}
