import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName = 'pvzCacheDB';
  private storeName = 'pvzCache';

  constructor() {
    this.initDb();
  }

  private initDb() {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      db.createObjectStore(this.storeName, { keyPath: 'id' });
    };

    request.onerror = (event: any) => {
      console.error('Error opening indexedDB:', event.target.error);
    };
  }

  saveData(data: any[], ttlInSeconds: number): Observable<void> {
    return new Observable<void>((observer) => {
      const db = indexedDB.open(this.dbName);

      db.onsuccess = (event: any) => {
        const dbInstance = event.target.result;
        const transaction = dbInstance.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);

        const expirationDate = new Date().getTime() + ttlInSeconds * 1000;

        data.forEach((item) => {
          item.expirationDate = expirationDate;
          store.put(item);
        });

        transaction.oncomplete = () => {
          dbInstance.close();
          observer.next();
          observer.complete();
        };

        transaction.onerror = (error: any) => {
          console.error('Error saving data to indexedDB:', error);
          observer.error(error);
        };
      };

      db.onerror = (error) => {
        console.error('Error opening indexedDB:', error);
        observer.error(error);
      };
    });
  }

  getData(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const db = indexedDB.open(this.dbName);

      db.onsuccess = (event: any) => {
        const dbInstance = event.target.result;
        const transaction = dbInstance.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);

        const now = new Date().getTime();

        const request = store.getAll();

        request.onsuccess = (event: any) => {
          const data = event.target.result.filter(
            (item: any) => item.expirationDate >= now
          );
          dbInstance.close();
          observer.next(data);
          observer.complete();
        };

        request.onerror = (error: any) => {
          console.error('Error fetching data from indexedDB:', error);
          observer.error(error);
        };
      };

      db.onerror = (error) => {
        console.error('Error opening indexedDB:', error);
        observer.error(error);
      };
    });
  }
}
