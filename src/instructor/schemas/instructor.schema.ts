import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument,Schema as SchemaMS } from "mongoose"
import { User } from "../../user/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Course } from "../../course/schemas/course.schema";

export type InstructorDocument = HydratedDocument<Instructor>

@Schema({timestamps: true})
export class Instructor {
	 @ApiProperty({ example: 'insta.com', description: "instructor's social media" })
	@Prop()
	 socialMedia: string;
	
	@ApiProperty({ example: 'insta.com', description: "instructor's name" })
	 @Prop({ type: SchemaMS.Types.ObjectId, ref: "User" })
	 author: User
	 
	@ApiProperty({ example: 'false', description: "instructor aproved or not" })
	@Prop({ default: false })
	approved: boolean
		@ApiProperty({ example: 'language', description: "instructor language" })
	  @Prop({ default: 'en' })
  language: string;

  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Course' }])
  courses: Course[];


}
export const InstructorSchema=SchemaFactory.createForClass(Instructor)