import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Todo } from './todo.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {
  private todos: Todo[] = [];

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Todo[] {
    return this.todos;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() todo: Todo): Todo {
    todo.id = this.todos.length + 1;
    this.todos.push(todo);
    return todo;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updatedTodo: Todo): Todo {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...updatedTodo };
      return this.todos[index];
    }
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Todo {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      const deletedTodo = this.todos[index];
      this.todos.splice(index, 1);
      return deletedTodo;
    }
    return null;
  }
}
