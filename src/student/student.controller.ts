import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // POST endpoint to create a student
  @Post()
  async createStudent(@Body() student: Partial<Student>) {
    try {
      // Calling the service method to create a new student
      const newStudent = await this.studentService.create(student);
      return {
        message: 'Student created successfully',
        student: newStudent,
      };
    } catch (error) {
      return {
        error: 'An error occurred while creating the student.',
        details: error.message,
      };
    }
  }

  // GET endpoint to retrieve a student by ID
  @Get(':id')
  async getStudentById(@Param('id') id: number) {
    try {
      const student = await this.studentService.findOne(id);
      if (!student) {
        return { error: 'Student not found.' };
      }
      return { student };
    } catch (error) {
      return { error: 'An error occurred while fetching the student.', details: error.message };
    }
  }
}
