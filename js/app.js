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

let student1 = new Student('Yul', 'Yav', 2000, [100, 90])
let student2 = new Student('Jan', 'Janko', 1994, [100, 90])
console.log(student1.getAvgGrade())
console.log(student2.getAge())
