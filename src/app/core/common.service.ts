import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import YAML from 'yaml';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public static readonly CURRENT_YEAR: number = new Date().getFullYear();

  constructor(private http: HttpClient) {}

  /**
   * Displays an error to the user using an alert and a human-readable prefix.
   * @param error - The error to display to the user.
   */
  static displayError(error) {
    alert(
      "An error occurred. Here are the details that you can report to our team through the 'Contact Us' page:\n" +
        error
    );
  }

  async parseYAMLFromFile(path: string): Promise<any> {
    const yamlText = await this.http
      .get(path, {
        observe: 'body',
        responseType: 'text',
      })
      .toPromise();
    return YAML.parse(yamlText);
  }
}
