import { Controller, Post, Body } from '@nestjs/common';
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
      // Handling errors gracefully
      return {
        error: 'An error occurred while creating the student.',
        details: error.message,
      };
    }
  }
}
