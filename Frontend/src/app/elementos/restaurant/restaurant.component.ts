import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
  @Input() imagen: string = '';
  @Input() titulo: string = '';
  @Input() precio: string = '';
  
}
