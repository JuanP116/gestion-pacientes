import { Pipe, PipeTransform } from '@angular/core';
import { IMatch } from '../interfaces/match';

@Pipe({
  name: 'matchResult',
  standalone: false
})
export class MatchResultPipe implements PipeTransform {
  // Transformar datos de partido en un formato más legible
  transform(match: IMatch | null): any {
    if (!match) {
      return null;
    }

    // Formatear la fecha y hora
    const matchDate = new Date(match.utcDate);
    const formattedDate = matchDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedTime = matchDate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Determinar el resultado o estado
    let result = '';
    let scoreHome = '-';
    let scoreAway = '-';

    if (match.status === 'FINISHED') {
      scoreHome = match.score.fullTime.home !== null ? match.score.fullTime.home.toString() : '-';
      scoreAway = match.score.fullTime.away !== null ? match.score.fullTime.away.toString() : '-';
      result = `${scoreHome} - ${scoreAway}`;
    } else if (match.status === 'IN_PLAY') {
      scoreHome = match.score.fullTime.home !== null ? match.score.fullTime.home.toString() : '0';
      scoreAway = match.score.fullTime.away !== null ? match.score.fullTime.away.toString() : '0';
      result = `${scoreHome} - ${scoreAway} (En juego)`;
    } else if (match.status === 'PAUSED') {
      result = 'Descanso';
    } else if (match.status === 'SCHEDULED') {
      result = 'Programado';
    } else if (match.status === 'POSTPONED') {
      result = 'Pospuesto';
    } else if (match.status === 'CANCELLED') {
      result = 'Cancelado';
    }

    return {
      ...match,
      formattedDate,
      formattedTime,
      formattedResult: result,
      scoreHome,
      scoreAway
    };
  }
}