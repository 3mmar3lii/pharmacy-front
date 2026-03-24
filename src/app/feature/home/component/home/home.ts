import { Component } from '@angular/core';
import { HomeHeader } from "../home-header/home-header";
import { HomePlatform } from "../home-platform/home-platform";
import { HomeList } from "../home-list/home-list";
import { Footer } from "../../../../shared/component/footer/footer";

@Component({
  selector: 'app-home',
  imports: [HomeHeader, HomePlatform, HomeList, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
