import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Contact } from "./model";

@Injectable()
export class ContactService {

    constructor(private httpclient: HttpClient) { }

    postContact(data: Contact): Promise<Contact> {
        // Create form
        const payload = new HttpParams()
                        .set("name", data.name)
                        .set("phone", data.phone)
                        .set("email", data.email)

        // Set headers
        const headers = new HttpHeaders()
                        .set("Content-Type", "application/x-www-form-urlencoded")
                        .set("Accept", "application/json")
        return firstValueFrom(
            this.httpclient.post<Contact>('http://localhost:8080/contact', payload.toString(), { headers })
        )
    }
}