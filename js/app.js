'use strict'

function getStudentConstructor() {
    const gradeRange = {
        min: 0,
        max: 100,
    }

    function getAge() {
        if (typeof this.birthYear !== 'number')
            throw new Error('Birthday should be a number')
        return new Date().getFullYear() - this.birthYear
    }

    function verifyAttendance(
        markLessonAsViewed = true,
        activeLesson,
        numberOfLessons
    ) {
        if (typeof markLessonAsViewed !== 'boolean')
            throw new Error('Mark Lesson should be a boolean')
        if (activeLesson >= numberOfLessons)
            return console.log('Not allowed to add more than 25 lessons')
        this.attendance[activeLesson] = markLessonAsViewed
    }

    function markGrade(grade, activeLesson) {
        if (typeof grade !== 'number')
            throw new Error('Grade should be a number')
        if (grade > gradeRange.max || grade < gradeRange.min)
            throw new Error('Cannot add grade')
        const currentLessonIndex = activeLesson - 1

        if (!this.attendance[currentLessonIndex])
            throw new Error('Grade not set, student absent')
        this.grades[currentLessonIndex] = grade
    }

    function getAvgGrade() {
        return !this.grades.length
            ? 0
            : this.grades.reduce((sum, grade) => sum + grade, 0) /
                  this.grades.filter(Number).length
    }

    function getAvgAttendance() {
        return !this.attendance.length
            ? 0
            : (this.attendance.reduce(
                  (sum, attendance) => sum + attendance,
                  0
              ) /
                  this.attendance.filter((item) => item !== null).length) *
                  100
    }

    function getSummary() {
        if (this.getAvgGrade() > 90 && this.getAvgAttendance() > 90) {
            return 'Nice! Well done'
        }
        if (this.getAvgGrade() >= 60) {
            return 'Good, but can be better'
        }
        return 'Rediska!'
    }

    return function createStudentConstructor(
        name,
        surname,
        birthYear,
        numberOfLessons = 25
    ) {
        let activeLesson = 0
        return {
            name,
            surname,
            birthYear,
            grades: new Array(numberOfLessons),
            attendance: new Array(numberOfLessons),
            get activeLesson() {
                return activeLesson
            },
            getAge() {
                return getAge.call(this)
            },
            present() {
                verifyAttendance.call(this, true, activeLesson, numberOfLessons)
                ++activeLesson
            },
            absent() {
                verifyAttendance.call(
                    this,
                    false,
                    activeLesson,
                    numberOfLessons
                )
                ++activeLesson
            },
            markGrade(grade) {
                markGrade.call(this, grade, activeLesson)
            },
            getAvgGrade() {
                return getAvgGrade.call(this)
            },
            getAvgAttendance() {
                return getAvgAttendance.call(this)
            },
            getSummary() {
                return getSummary.call(this)
            },
        }
    }
}

const Student = getStudentConstructor()

const student1 = new Student('Yul', 'Yav', 2000)
const student2 = new Student('Jan', 'Janko', 1994)

student1.present()
student1.markGrade(100)
student1.present()
student1.markGrade(90)
student1.present()
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
