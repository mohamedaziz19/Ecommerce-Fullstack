import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  slides = [
    { img: 'slider-01.jpg' },
    { img: 'slider-02.jpg' },
    { img: 'slider-03.jpg' },
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 1000, 
    arrows: true,
    pauseOnHover: true,
    infinite: true,
    speed: 500,
    accessibility: false,
  };
}
