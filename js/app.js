'use strict'

class Student {
    #activeLesson = 0
    #gradeRangeMin = 0
    #gradeRangeMax = 100
    #numberOfLessons
    constructor(name, surname, birthYear, numberOfLessons = 25) {
        this.name = name
        this.surname = surname
        this.birthYear = birthYear
        this.grades = new Array(numberOfLessons)
        this.attendance = new Array(numberOfLessons)
        this.#numberOfLessons = 25
    }

    get activeLesson() {
        return this.#activeLesson
    }

    get fullName() {
        return `${this.name} ${this.surname}`
    }

    get age() {
        if (typeof this.birthYear !== 'number')
            throw new Error('Birthday should be a number')
        return new Date().getFullYear() - this.birthYear
    }

    present() {
        this.verifyAttendance(true)
        ++this.#activeLesson
    }
    absent() {
        this.verifyAttendance(false)
        ++this.#activeLesson
    }

    verifyAttendance(markLessonAsPresent = true) {
        if (typeof markLessonAsPresent !== 'boolean')
            throw new Error('Mark Lesson should be a boolean')
        if (this.#activeLesson >= this.#numberOfLessons)
            return console.log('Not allowed to add more than 25 lessons')
        this.attendance[this.#activeLesson] = markLessonAsPresent
    }

    markGrade(grade) {
        if (typeof grade !== 'number')
            throw new Error('Grade should be a number')
        if (grade > this.#gradeRangeMax || grade < this.#gradeRangeMin)
            throw new Error('Cannot add grade')
        const currentLessonIndex = this.#activeLesson - 1

        if (!this.attendance[currentLessonIndex])
            throw new Error('Grade not set, student absent')
        this.grades[currentLessonIndex] = grade
    }

    get avgGrade() {
        return !this.grades.length
            ? 0
            : this.grades.reduce((sum, grade) => sum + grade, 0) /
                  this.grades.filter(Number).length
    }

    get avgAttendance() {
        return !this.attendance.length
            ? 0
            : (this.attendance.reduce(
                  (sum, attendance) => sum + attendance,
                  0
              ) /
                  this.attendance.filter((item) => item !== null).length) *
                  100
    }

    get summary() {
        if (this.avgGrade > 90 && this.avgAttendance > 90) {
            return 'Nice! Well done'
        }
        if (this.avgGrade >= 60) {
            return 'Good, but can be better'
        }
        return 'Rediska!'
    }
}

// const Student = getStudentConstructor()

const student1 = new Student('Yul', 'Yav', 2000)
const student2 = new Student('Jan', 'Janko', 1994)

student1.present()
student1.markGrade(100)
student1.present()
student1.markGrade(90)
student1.present()
student1.present()
student1.markGrade(90)
student1.absent()
// student1.markGrade(90)
console.log(student1)
console.log(`Summary: ${student1.summary}`)
console.log(`AvgGrade: ${student1.avgGrade}`)
console.log(`AvgAttendance: ${student1.avgAttendance}`)

// student2.present()
// student2.markGrade(50)
// student2.present()
// student2.markGrade(10)
// student2.present()
// student2.absent()
//
// console.log(student2)
// console.log(`Summary: ${student2.summary}`)
// console.log(`AvgGrade: ${student2.avgGrade}`)
// console.log(`AvgAttendance: ${student2.avgAttendance}`)
