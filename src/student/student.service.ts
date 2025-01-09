import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // Method to create a student
  async create(student: Partial<Student>): Promise<Student> {
    const newStudent = this.studentRepository.create(student);
    return this.studentRepository.save(newStudent);
  }

  // Method to find a student by ID (updated)
  async findOne(id: number): Promise<Student | null> {
    return this.studentRepository.findOne({
      where: { id },
    });
  }
}