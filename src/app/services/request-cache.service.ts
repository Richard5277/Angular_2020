import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './messenger.service';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class RequestCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

const maxAge = 30000; // maxmium cache age(ms)

@Injectable()
export class RequestCacheWithMap implements RequestCache {

  // #MARK : this need to dig in
  cache = new Map<string, RequestCacheEntry>();

  constructor(private messenger: MessageService){}

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url); // using url as string key

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    this.messenger.add(
      `Found ${expired} cached reseponse for "${url}" 🐒.`
    );
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    this.messenger.add(`Caching response from "${url}" 🍔.`);

    const newEntry = { url, response, lastRead: Date.now() };
    this.cache.set(url, newEntry);

    // remove expired cache entries
    const expired = Date.now() - maxAge;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url); // 比 now 减去 maxAge 还年轻，那你走吧
      }
    });

    this.messenger.add(`Request cached size : ${this.cache.size}`); // map.size => returns the number of elements inside the amp
  }

}
