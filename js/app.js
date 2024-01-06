'use strict'

function Student(name, surname, birthYear, grades) {
    this.name = name
    this.surname = surname
    this.birthYear = birthYear
    this.grades = grades
    this.attendance = []
}

Student.prototype.getAge = function () {
    return 2024 - this.birthYear
}

Student.prototype.getAvgGrade = function () {
    if (!this.grades.length) {
        return 0
    }
    return (
        this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length
    )
}

Student.prototype.present = function () {
    if (this.attendance.length >= 25) {
        throw new Error('Cannot register more than 25 attendance records')
    }
    this.attendance.push(true)
}

Student.prototype.absent = function () {
    if (this.attendance.length >= 25) {
        throw new Error('Cannot register more than 25 attendance records')
    }
    this.attendance.push(false)
}

let student1 = new Student('Yul', 'Yav', 2000, [100, 90])
let student2 = new Student('Jan', 'Janko', 1994, [100, 90])
