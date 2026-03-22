import { Component } from '@angular/core';
import { Navbar } from '../../../shared/component/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [Navbar, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {}
