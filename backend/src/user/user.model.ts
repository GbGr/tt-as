import { Column, Default, IsEmail, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class User extends Model<User> {
  @Default(false)
  @Column
  public shared: boolean;

  @IsEmail
  @Column
  public email: string;

  public static async createNew(): Promise<User> {
    return User.create({});
  }
}