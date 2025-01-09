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

  // Method to update a student by ID
  async update(id: number, student: Partial<Student>): Promise<Student> {
    const existingStudent = await this.studentRepository.findOne({
      where: { id },
    });
    if (!existingStudent) {
      throw new Error('Student not found');
    }

    Object.assign(existingStudent, student);
    return this.studentRepository.save(existingStudent);
  }

  // Method to delete a student
  async remove(id: number): Promise<boolean> {
    const student = await this.studentRepository.findOne({
      where: { id },
    });
    if (!student) {
      return false; 
    }
    await this.studentRepository.remove(student);
    return true; 
  }
}