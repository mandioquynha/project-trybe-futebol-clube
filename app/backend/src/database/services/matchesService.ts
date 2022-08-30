import Matches from '../models/Matches';
import Teams from '../models/Teams';
import { IMatches } from '../interfaces';

export default class MatchesService {
  public matches;
  constructor() {
    this.matches = Matches;
  }

  public list = async (): Promise<Matches[]> => {
    const result: Matches[] = await this.matches.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }] });
    return result;
  };

  public saveMatches = async (matches: IMatches) => {
    const createdMatches = await this.matches.create(matches);
    console.log(createdMatches);
    return createdMatches;
  };
}