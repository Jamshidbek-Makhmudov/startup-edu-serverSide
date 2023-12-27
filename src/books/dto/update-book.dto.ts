 import { PartialType } from '@nestjs/swagger';
// import { PartialType } from '@nestjs/mapped-types'; // check which is better and check the differences
import { CreateBookDto } from 'src/books/dto/create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
