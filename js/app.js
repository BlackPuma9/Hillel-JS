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

student1.absent()
student1.present()
student1.absent()
student1.present()

student2.absent()
student2.present()
student2.absent()
student2.present()

console.log(
    `Student1 Name: ${student1.name}, Surname: ${student1.surname}, 
    Age: ${student1.getAge()}, Average Grade: ${student1.getAvgGrade()}, 
    Average Attendance: ${student1.getAvgAttendance()}, 
    Summary: ${student1.getSummary()}`
)

console.log(
    `Student2 Name: ${student2.name}, Surname: ${student2.surname}, 
    Age: ${student2.getAge()}, Average Grade: ${student2.getAvgGrade()}, 
    Average Attendance: ${student2.getAvgAttendance()}, 
    Summary: ${student2.getSummary()}`
)
