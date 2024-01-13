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

    getAvgGrade() {
        return !this.grades.length
            ? 0
            : this.grades.reduce((sum, grade) => sum + grade, 0) /
                  this.grades.filter(Number).length
    }

    getAvgAttendance() {
        return !this.attendance.length
            ? 0
            : (this.attendance.reduce(
                  (sum, attendance) => sum + attendance,
                  0
              ) /
                  this.attendance.filter((item) => item !== null).length) *
                  100
    }

    getSummary() {
        if (this.getAvgGrade() > 90 && this.getAvgAttendance() > 90) {
            return 'Nice! Well done'
        }
        if (this.getAvgGrade() >= 60) {
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
// student1.absent()
// student1.markGrade(90)
console.log(student1.getSummary())
console.log(student1)

student2.present()
student2.markGrade(80)
student2.present()
student2.markGrade(90)
student2.present()
student2.absent()
console.log(student2.getSummary())
console.log(student2)
