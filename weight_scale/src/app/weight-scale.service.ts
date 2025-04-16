import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { io } from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WeightScaleService {
  private socket = io("http://localhost:3000"); // Change URL if hosted
  private apiUrl = "http://localhost:3000/weights"; // API to fetch stored weights

  constructor(private http: HttpClient) {}

  getWeightData(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on("weightData", (data: string) => {
        observer.next(data);
      });

      return () => this.socket.disconnect();
    });
  }

  getStoredWeights(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
