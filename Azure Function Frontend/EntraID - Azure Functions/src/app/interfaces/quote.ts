export interface Quote {
    id: number;
    content: string;
    author: string;
    userEmail: string;
    createdDate?: string; // Optional, depending on how your API works
    updatedDate?: string; // Optional, depending on how your API works
  }
  