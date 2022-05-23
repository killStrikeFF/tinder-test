import { userData } from "./users-data";


export class UsersUtils {
  public static updateEvaluations(userId: number, evaluation: boolean) {
    const user = userData.find(userFromDb => userFromDb.id === userId);
    user.liked = evaluation;
  }
}
