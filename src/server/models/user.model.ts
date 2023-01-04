import mongoose from 'mongoose';
import type { ReturnModelType } from '@typegoose/typegoose';
import {
  prop as Property,
  modelOptions,
  getModelForClass,
  pre,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import { Photo } from './photo.model';
import { Role } from '../../utils/types/user';

export class Location {
  @Property({
    default: 'Point',
    enum: ['Point'],
  })
  type!: string;

  @Property({
    type: [Number],
    required: [true, 'users must provide their location'],
  })
  coordinates!: number[];
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret.password;

        return ret;
      },
      versionKey: false,
    },
  },
})
@pre<User>('find', async function (next) {
  this.find({ isActive: true });
  next();
})
@pre<User>('save', async function (next) {
  if (!this.isNew && !this.isModified('password')) {
    return next();
  }

  this.password = await this.hashPassword(this.password);
  next();
})
export class User {
  readonly _id!: string;

  @Property({
    required: [true, 'User must provide their name'],
    trim: true,
    lowercase: true,
  })
  name!: string;

  @Property({
    required: [true, 'User must have a password'],
    minlength: [6, 'Password must contain atleast 6 characters'],
    select: false,
  })
  password!: string;

  @Property({
    required: [true, 'User must provide their email address'],
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Property({
    enum: Role,
    default: Role.User,
  })
  role!: string;

  @Property({
    type: Photo,
  })
  photo?: Photo;

  @Property({ default: true })
  isActive!: boolean;

  @Property({
    _id: false,
    type: Location,
  })
  location!: Location;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

  public async checkPassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  public async hashPassword(plain: string): Promise<string> {
    return await bcrypt.hash(plain, 12);
  }
}

const UserModel = (mongoose.models.User ||
  getModelForClass(User)) as ReturnModelType<typeof User, {}>;

// const UserModel = getModelForClass(User);

export default UserModel;
