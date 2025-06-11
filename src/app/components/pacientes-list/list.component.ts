import { Component, OnInit } from '@angular/core';
import { FootballService } from '../../services/football.service';
import { ITeam } from '../../interfaces/team';
import { IMatch } from '../../interfaces/match';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  teams: ITeam[] = [];
  upcomingMatches: IMatch[] = [];
  recentMatches: IMatch[] = [];
  standings: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private footballService: FootballService) {}

  // Inicializar el componente
  ngOnInit() {
    this.loading = true;
    
    // Obtener todos los equipos de La Liga
    this.footballService.getTeamsFromLaLiga().subscribe(
      (response) => {
        if (response && response.teams) {
          this.teams = response.teams;
        }
        this.checkLoadingComplete();
      },
      (error) => {
        console.error('Error al cargar equipos:', error);
        this.error = "Error al cargar equipos";
        this.checkLoadingComplete();
      }
    );

    // Obtener próximos partidos
    this.footballService.getUpcomingMatches().subscribe(
      (response) => {
        if (response && response.matches) {
          // Limitamos a los próximos 10 partidos
          this.upcomingMatches = response.matches.slice(0, 10);
        }
        this.checkLoadingComplete();
      },
      (error) => {
        console.error('Error al cargar próximos partidos:', error);
        this.checkLoadingComplete();
      }
    );

    // Obtener partidos recientes
    this.footballService.getRecentMatches().subscribe(
      (response) => {
        if (response && response.matches) {
          // Limitamos a los 10 partidos más recientes
          this.recentMatches = response.matches.slice(0, 10);
        }
        this.checkLoadingComplete();
      },
      (error) => {
        console.error('Error al cargar partidos recientes:', error);
        this.checkLoadingComplete();
      }
    );

    // Obtener clasificación
    this.footballService.getLaLigaStandings().subscribe(
      (response) => {
        if (response && response.standings && response.standings.length > 0) {
          // Normalmente la primera clasificación es la tabla regular
          this.standings = response.standings[0].table;
        }
        this.checkLoadingComplete();
      },
      (error) => {
        console.error('Error al cargar clasificación:', error);
        this.checkLoadingComplete();
      }
    );
  }

  // Verificar si todas las cargas han finalizado
  checkLoadingComplete() {
    // Consideramos que ha terminado la carga cuando todos los datos están cargados
    // o cuando hay un error
    if (this.teams.length > 0 || 
        this.upcomingMatches.length > 0 || 
        this.recentMatches.length > 0 || 
        this.standings.length > 0 || 
        this.error) {
      this.loading = false;
    }
  }
}