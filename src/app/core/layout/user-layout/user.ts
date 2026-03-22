import { Component } from '@angular/core';
import { Navbar } from '../../../shared/component/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [Navbar,RouterOutlet],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {}
