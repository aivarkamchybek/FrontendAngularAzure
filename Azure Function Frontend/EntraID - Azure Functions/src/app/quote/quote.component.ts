import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Quote } from '../interfaces/quote';
import { QuoteService } from '../serviceQuote/quote.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { QuoteDialogComponent } from '../quote-dialog/quote-dialog.component';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
})
export class QuoteComponent implements OnInit {
  quotes: Quote[] = [];
  filteredQuotes = new MatTableDataSource<Quote>();
  newQuote: Quote = { id: 0, content: '', author: '', userEmail: '' };
  isLoading = false;
  errorMessage: string | null = null;
  searchQuery: string = '';
  displayedColumns: string[] = ['id', 'author', 'content', 'userEmail', 'actions'];

  constructor(
    private quoteService: QuoteService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.quoteService.getAllQuotes().subscribe(
      (quotes) => {
        this.quotes = quotes;
        this.filteredQuotes.data = quotes;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load quotes.';
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(QuoteDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newQuote: Quote) => {
      if (newQuote) {
        this.quotes = [...this.quotes, newQuote];
        this.filteredQuotes.data = [...this.quotes];
        this.cdr.detectChanges();
      }
    });
  }

  openEditModal(quote: Quote, modalTemplate: any): void {
    this.newQuote = { ...quote };
    this.dialog.open(modalTemplate);
    disableClose: true 
  }

  saveUpdatedQuote(): void {
    this.isLoading = true;  
    this.quoteService.updateQuote(this.newQuote.id, this.newQuote).subscribe(
      (updatedQuote) => {
        const index = this.quotes.findIndex((q) => q.id === updatedQuote.id);
        if (index !== -1) {
          this.quotes[index] = updatedQuote;
          this.filteredQuotes.data = [...this.quotes];
          this.cdr.detectChanges();
        }
        this.dialog.closeAll();
        this.isLoading = false; // Reset loading state
      },
      (error) => {
        console.error('Error updating quote:', error);
        this.isLoading = false;
      }
    );
  }

  onCancel(): void {
    this.dialog.closeAll();
  }

  deleteQuote(id: number): void {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.isLoading = true;
      this.quoteService.deleteQuote(id).subscribe(
        () => {
          this.quotes = this.quotes.filter((quote) => quote.id !== id);
          this.filteredQuotes.data = [...this.quotes];
          this.cdr.detectChanges();
          this.isLoading = false; 
        },
        (error) => {
          this.errorMessage = 'Failed to delete quote.';
          console.error(error);
          this.isLoading = false;
        }
      );
    }
  }

  filterQuotes(): void {
    this.filteredQuotes.data = this.quotes.filter(
      (quote) =>
        quote.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        quote.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        quote.userEmail.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
