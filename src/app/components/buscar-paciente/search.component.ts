import { Component, OnInit } from '@angular/core';
import { FootballService } from '../../services/football.service';
import { ITeam } from '../../interfaces/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: false
})
export class SearchComponent implements OnInit {
  result!: ITeam[];
  searchType!: string;
  searchInput!: string;
  loading: boolean = false;

  constructor(
    private footballService: FootballService,
    private router: Router
  ) {}

  // Función para buscar equipos
  search(type: string) {
    this.loading = true;
    this.result = [];
    
    // Realizar la búsqueda según el tipo seleccionado
    switch(type) {
      // Por nombre (buscar en todos los equipos de La Liga)
      case 'n':
        this.footballService.getTeamsFromLaLiga().subscribe(
          (response) => {
            if (response && response.teams) {
              // Filtrar equipos por nombre (contiene la cadena de búsqueda)
              this.result = response.teams.filter(team => 
                team.name.toLowerCase().includes(this.searchInput.toLowerCase())
              );
            }
            this.loading = false;
          },
          (error) => {
            console.error('Error al buscar equipos:', error);
            this.loading = false;
          }
        );
        break;

      // Todos los equipos de La Liga
      case 'all':
        this.footballService.getTeamsFromLaLiga().subscribe(
          (response) => {
            if (response && response.teams) {
              this.result = response.teams;
            }
            this.loading = false;
          },
          (error) => {
            console.error('Error al cargar equipos:', error);
            this.loading = false;
          }
        );
        break;

      // Por primeras letras (filtrar equipos que comiencen por las letras indicadas)
      case 'f':
        this.footballService.getTeamsFromLaLiga().subscribe(
          (response) => {
            if (response && response.teams) {
              this.result = response.teams.filter(team => 
                team.name.toLowerCase().startsWith(this.searchInput.toLowerCase())
              );
            }
            this.loading = false;
          },
          (error) => {
            console.error('Error al buscar equipos por letra:', error);
            this.loading = false;
          }
        );
        break;
    }
  }

  // Inicializar el componente
  ngOnInit() {
    // Valor por defecto
    this.searchType = 'n';

    // Rescatar los parámetros de la URL si existen
    if (this.router.url.includes('/search/')) {
      const params = this.router.url;
      const type = params.split('/')[2];
      const value = params.split('/')[3];

      // Asignar los parámetros a las variables de la clase
      this.searchType = type;
      this.searchInput = value;

      // Realizar la búsqueda según los parámetros de la URL
      this.search(type);
    }
  }

  // Función para navegar a la página de detalles
  details(id: number) {
    this.router.navigate(['/details', id]);
  }
}