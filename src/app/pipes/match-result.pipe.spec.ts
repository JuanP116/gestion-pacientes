import { MatchResultPipe } from './match-result.pipe';
import { IMatch } from '../interfaces/match';

describe('MatchResultPipe', () => {
  let pipe: MatchResultPipe;

  beforeEach(() => {
    pipe = new MatchResultPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null for null input', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('should format a finished match correctly', () => {
    const match: IMatch = {
      id: 1,
      competition: { id: 1, name: 'La Liga' },
      utcDate: '2023-05-20T20:00:00Z',
      status: 'FINISHED',
      matchday: 38,
      stage: 'REGULAR_SEASON',
      homeTeam: { id: 1, name: 'Barcelona', shortName: 'BAR', tla: 'BAR', crest: '' },
      awayTeam: { id: 2, name: 'Real Madrid', shortName: 'RMA', tla: 'RMA', crest: '' },
      score: {
        winner: 'HOME_TEAM',
        fullTime: {
          home: 3,
          away: 2
        },
        halfTime: {
          home: 1,
          away: 1
        }
      }
    };

    const result = pipe.transform(match);
    expect(result).toBeTruthy();
    expect(result.formattedResult).toBe('3 - 2');
  });

  it('should format a scheduled match correctly', () => {
    const match: IMatch = {
      id: 1,
      competition: { id: 1, name: 'La Liga' },
      utcDate: '2023-05-20T20:00:00Z',
      status: 'SCHEDULED',
      matchday: 38,
      stage: 'REGULAR_SEASON',
      homeTeam: { id: 1, name: 'Barcelona', shortName: 'BAR', tla: 'BAR', crest: '' },
      awayTeam: { id: 2, name: 'Real Madrid', shortName: 'RMA', tla: 'RMA', crest: '' },
      score: {
        winner: null,
        fullTime: {
          home: null,
          away: null
        },
        halfTime: {
          home: null,
          away: null
        }
      }
    };

    const result = pipe.transform(match);
    expect(result).toBeTruthy();
    expect(result.formattedResult).toBe('Programado');
  });
});