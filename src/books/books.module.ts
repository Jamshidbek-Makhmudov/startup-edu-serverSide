import { Module } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { BooksController } from 'src/books/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/books/schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name:Book.name, schema:BookSchema
  }])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
