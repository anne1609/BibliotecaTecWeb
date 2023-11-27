import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-libro',
  templateUrl: './registrar-libro.component.html',
  styleUrls: ['./registrar-libro.component.css']
})
export class RegistrarLibroComponent implements OnInit {
  bookForm = new FormGroup({
    bookName: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    pages: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    format: new FormControl('', Validators.required),
    publicationDate: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.bookForm.value);
  }
}