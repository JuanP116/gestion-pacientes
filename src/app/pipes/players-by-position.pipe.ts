import { Pipe, PipeTransform } from '@angular/core';
import { IPlayer } from '../interfaces/team';

@Pipe({
  name: 'playersByPosition',
  standalone: false
})
export class PlayersByPositionPipe implements PipeTransform {
  // Transformar lista de jugadores en grupos por posición
  transform(team: any): any {
    if (!team || !team.squad) {
      return team;
    }

    // Inicializar las categorías de posiciones
    const players: {
      Goalkeeper: IPlayer[],
      Defender: IPlayer[],
      Midfielder: IPlayer[],
      Attacker: IPlayer[],
      Coach: any[]
    } = {
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Attacker: [],
      Coach: []
    };

    // Añadir el entrenador si existe
    if (team.coach) {
      players.Coach.push(team.coach);
    }

    // Ordenar jugadores por posición
    team.squad.forEach((player: IPlayer) => {
      if (player.position === 'Goalkeeper') {
        players.Goalkeeper.push(player);
      } else if (player.position === 'Defence' || player.position === 'Defender') {
        players.Defender.push(player);
      } else if (player.position === 'Midfield' || player.position === 'Midfielder') {
        players.Midfielder.push(player);
      } else if (player.position === 'Offence' || player.position === 'Attacker' || player.position === 'Forward') {
        players.Attacker.push(player);
      }
    });

    // Devolver el equipo con los jugadores organizados por posición
    return {
      ...team,
      playersByPosition: players
    };
  }
}