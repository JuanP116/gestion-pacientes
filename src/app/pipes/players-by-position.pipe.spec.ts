import { PlayersByPositionPipe } from './players-by-position.pipe';

describe('PlayersByPositionPipe', () => {
  let pipe: PlayersByPositionPipe;

  beforeEach(() => {
    pipe = new PlayersByPositionPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the team unchanged if it has no squad', () => {
    const team = { id: 1, name: 'Real Madrid' };
    expect(pipe.transform(team)).toBe(team);
  });

  it('should categorize players by position correctly', () => {
    const team = {
      id: 1,
      name: 'Real Madrid',
      squad: [
        { id: 1, name: 'Courtois', position: 'Goalkeeper' },
        { id: 2, name: 'Carvajal', position: 'Defender' },
        { id: 3, name: 'Alaba', position: 'Defence' },
        { id: 4, name: 'Kroos', position: 'Midfielder' },
        { id: 5, name: 'Modric', position: 'Midfield' },
        { id: 6, name: 'Benzema', position: 'Attacker' },
        { id: 7, name: 'Vinicius', position: 'Forward' }
      ],
      coach: { id: 8, name: 'Carlo Ancelotti', nationality: 'Italian' }
    };

    const result = pipe.transform(team);
    
    expect(result.playersByPosition.Goalkeeper.length).toBe(1);
    expect(result.playersByPosition.Defender.length).toBe(2);
    expect(result.playersByPosition.Midfielder.length).toBe(2);
    expect(result.playersByPosition.Attacker.length).toBe(2);
    expect(result.playersByPosition.Coach.length).toBe(1);
    
    expect(result.playersByPosition.Goalkeeper[0].name).toBe('Courtois');
    expect(result.playersByPosition.Defender[0].name).toBe('Carvajal');
    expect(result.playersByPosition.Defender[1].name).toBe('Alaba');
    expect(result.playersByPosition.Midfielder[0].name).toBe('Kroos');
    expect(result.playersByPosition.Midfielder[1].name).toBe('Modric');
    expect(result.playersByPosition.Attacker[0].name).toBe('Benzema');
    expect(result.playersByPosition.Attacker[1].name).toBe('Vinicius');
    expect(result.playersByPosition.Coach[0].name).toBe('Carlo Ancelotti');
  });

  it('should handle team without coach', () => {
    const team = {
      id: 1,
      name: 'Test Team',
      squad: [
        { id: 1, name: 'Player1', position: 'Goalkeeper' }
      ]
    };

    const result = pipe.transform(team);
    expect(result.playersByPosition.Coach.length).toBe(0);
  });
});