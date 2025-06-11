import { Component, OnInit } from '@angular/core';
import { FootballService } from '../../services/football.service';
import { ITeam } from '../../interfaces/team';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  result!: ITeam;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private footballService: FootballService,
    private route: ActivatedRoute
  ) {}

  // Inicializar el componente
  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    
    // Obtener el ID del equipo de los parámetros de la URL
    const teamId = Number(this.route.snapshot.params['id']);
    
    // Obtener los detalles del equipo pasando el id
    this.footballService.getTeamById(teamId).subscribe(
      (response) => {
        if (response) {
          // Asignar tipo ITeam a la respuesta, asumiendo que los campos son compatibles
          // o manejando casos donde podrían faltar propiedades
          this.result = response as unknown as ITeam;
          
          // Cargar jugadores si no están incluidos en la respuesta inicial
          if (!this.result.squad) {
            this.footballService.getTeamPlayers(teamId).subscribe(
              (playersData) => {
                if (playersData) {
                  this.result = { ...this.result, ...playersData };
                }
                this.loading = false;
              },
              (error) => {
                console.error('Error al cargar jugadores:', error);
                this.loading = false;
              }
            );
          } else {
            this.loading = false;
          }
        } else {
          this.error = 'No se encontró información del equipo';
          this.loading = false;
        }
      },
      (error) => {
        console.error('Error al cargar equipo:', error);
        this.error = 'Error al cargar la información del equipo';
        this.loading = false;
      }
    );
  }
}