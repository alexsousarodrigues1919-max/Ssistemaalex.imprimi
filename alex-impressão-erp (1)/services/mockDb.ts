import { Client, Product, Transaction, Note, User } from '../types';

// Helper to simulate async network/db delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockDBService {
  private cache: { [key: string]: any[] | null } = {
    clients: null,
    products: null,
    transactions: null,
    notes: null,
    users: null
  };

  private get<T>(key: string): T[] {
    // Return from cache if available
    if (this.cache[key]) {
      // Return a copy to prevent external mutation of the cache
      return [...this.cache[key] as T[]];
    }

    const data = localStorage.getItem(key);
    const parsed = data ? JSON.parse(data) : [];
    
    // Update cache
    this.cache[key] = parsed;
    return parsed;
  }

  private set<T>(key: string, data: T[]): void {
    // Update cache
    this.cache[key] = data;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- Clients ---
  async getClients(): Promise<Client[]> {
    await delay(300);
    return this.get<Client>('clients');
  }

  async saveClient(client: Client): Promise<void> {
    await delay(300);
    const clients = this.get<Client>('clients');
    const index = clients.findIndex(c => c.id === client.id);
    if (index >= 0) {
      clients[index] = client;
    } else {
      clients.push(client);
    }
    this.set('clients', clients);
  }

  async deleteClient(id: string): Promise<void> {
    await delay(200);
    const clients = this.get<Client>('clients');
    this.set('clients', clients.filter(c => c.id !== id));
  }

  // --- Products ---
  async getProducts(): Promise<Product[]> {
    await delay(300);
    return this.get<Product>('products');
  }

  async saveProduct(product: Product): Promise<void> {
    await delay(300);
    const products = this.get<Product>('products');
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.push(product);
    }
    this.set('products', products);
  }

  async deleteProduct(id: string): Promise<void> {
    await delay(200);
    const products = this.get<Product>('products');
    this.set('products', products.filter(p => p.id !== id));
  }

  // --- Transactions (Caixa/Despesas) ---
  async getTransactions(): Promise<Transaction[]> {
    await delay(300);
    return this.get<Transaction>('transactions');
  }

  async addTransaction(transaction: Transaction): Promise<void> {
    await delay(200);
    const transactions = this.get<Transaction>('transactions');
    transactions.push(transaction);
    this.set('transactions', transactions);
  }

  async deleteTransaction(id: string): Promise<void> {
    await delay(200);
    const transactions = this.get<Transaction>('transactions');
    this.set('transactions', transactions.filter(t => t.id !== id));
  }

  // --- Notes ---
  async getNotes(): Promise<Note[]> {
    await delay(200);
    return this.get<Note>('notes');
  }

  async saveNote(note: Note): Promise<void> {
    await delay(200);
    const notes = this.get<Note>('notes');
    const index = notes.findIndex(n => n.id === note.id);
    if (index >= 0) {
      notes[index] = note;
    } else {
      notes.push(note);
    }
    this.set('notes', notes);
  }

  async deleteNote(id: string): Promise<void> {
    await delay(100);
    const notes = this.get<Note>('notes');
    this.set('notes', notes.filter(n => n.id !== id));
  }

  // --- Users ---
  async getUsers(): Promise<User[]> {
    await delay(200);
    return this.get<User>('users');
  }

  async saveUser(user: User): Promise<void> {
    await delay(300);
    const users = this.get<User>('users');
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    this.set('users', users);
  }

  async deleteUser(id: string): Promise<void> {
    await delay(200);
    const users = this.get<User>('users');
    this.set('users', users.filter(u => u.id !== id));
  }

  // --- System ---
  async clearDatabase(): Promise<void> {
    await delay(500);
    // Remove specific keys to avoid clearing unrelated localhost data
    const keysToRemove = ['clients', 'products', 'transactions', 'notes', 'users', 'user_session'];
    keysToRemove.forEach(k => localStorage.removeItem(k));
    
    // Clear cache
    this.cache = {
      clients: null,
      products: null,
      transactions: null,
      notes: null,
      users: null
    };
    this.init(); // Re-init to ensure at least admin user exists
  }

  // --- Init Mock Data ---
  init() {
    // Helper to initialize if empty
    const initIfNeeded = (key: string, defaultValue: any[]) => {
      if (!localStorage.getItem(key)) {
        this.set(key, defaultValue);
      } else if (this.cache[key] === null) {
          // Pre-populate cache if we are initializing
          this.get(key); 
      }
    };

    initIfNeeded('products', []);
    initIfNeeded('clients', []);
    initIfNeeded('notes', []);
    initIfNeeded('transactions', []);
    
    // Always ensure at least one admin exists to login
    const adminUser: User = { 
        id: '1', 
        name: 'Admin', 
        email: 'admin@alex.com', 
        role: 'admin', 
        companyName: 'Alex_impresão', 
        address: '', 
        cnpj: '' 
    };

    if (!localStorage.getItem('users')) {
      this.set('users', [adminUser]);
    } else {
        // Ensure cache is populated
        this.get('users');
    }
  }
}

export const dbService = new MockDBService();