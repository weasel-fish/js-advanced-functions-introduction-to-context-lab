// Your code here
function createEmployeeRecord(recordArray) {
    let employee = {
        firstName : recordArray[0],
        familyName : recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employee
}

function createEmployeeRecords(employeeArray) {
    return employeeArray.map(createEmployeeRecord)
}

function createTimeInEvent(empRec, timeString) {
    let newEvent = {
        type: 'TimeIn',
        date: timeString.split(' ')[0],
        hour: parseInt(timeString.split(' ')[1])
    }

    empRec.timeInEvents.push(newEvent)

    return empRec
}

function createTimeOutEvent(empRec, timeString) {
    let newEvent = {
        type: 'TimeOut',
        date: timeString.split(' ')[0],
        hour: parseInt(timeString.split(' ')[1])
    }

    empRec.timeOutEvents.push(newEvent)

    return empRec
}

function hoursWorkedOnDate(empRec, dateString) {
    let inEvent = empRec.timeInEvents.filter(rec => rec.date === dateString)[0]
    let outEvent = empRec.timeOutEvents.filter(rec => rec.date === dateString)[0]

    return (outEvent.hour - inEvent.hour)/100
}

function wagesEarnedOnDate(empRec, dateString) {
    return hoursWorkedOnDate(empRec, dateString) * empRec.payPerHour
}

function allWagesFor(empRec) {
    let total = 0

    empRec.timeInEvents.forEach((event) => {
        total += wagesEarnedOnDate(empRec, event.date)
    })

    return total
}

function calculatePayroll(empArray) {
    let total = 0

    empArray.forEach(emp => total += allWagesFor(emp))

    return total
}

function findEmployeeByFirstName(empArray, nameString) {
    return empArray.find(emp => emp.firstName === nameString)
}