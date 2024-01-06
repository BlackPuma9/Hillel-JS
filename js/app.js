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

Student.prototype.getAvgAttendance = function () {
    return (
        this.attendance.reduce((sum, attendance) => sum + attendance, 0) /
        this.attendance.length
    )
}

Student.prototype.getSummary = function () {
    if (this.getAvgGrade > 90 && this.getAvgAttendance() > 0.9) {
        return 'Nice! Well done'
    } else if (this.getAvgGrade() >= 60) {
        return 'Good, but can be better'
    } else {
        return 'Rediska!'
    }
}

let student1 = new Student('Yul', 'Yav', 2000, [100, 90])
let student2 = new Student('Jan', 'Janko', 1994, [40, 60])

console.log(student1.getAge())
console.log(student1.getAvgGrade())
student1.present()
student1.absent()
console.log(student1.getAvgAttendance())
console.log(student1.getSummary())

console.log(student2.getAge())
console.log(student2.getAvgGrade())
student2.present()
student2.absent()
console.log(student2.getAvgAttendance())
console.log(student2.getSummary())
