/* Your Code Here */

let createEmployeeRecord = function (empRecord) {
    return {
        firstName: empRecord[0],
        familyName: empRecord[1],
        title: empRecord[2],
        payPerHour: empRecord[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (arr) {
    let records = []
    arr.forEach(element => {records.push(createEmployeeRecord(element))
    });
    return records
}

let createTimeInEvent = function(dateStamp) {
    let [datedate, hour] = dateStamp.split(" ")
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date: datedate
    })
    return this
}

let createTimeOutEvent = function (dateStamp) {
    let [datedate, hour] = dateStamp.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: datedate
    })
    return this
}

let hoursWorkedOnDate = function (dateLookup) {
    const intime = this.timeInEvents.find( (element) => element.date === dateLookup)
    const outtime = this.timeOutEvents.find((element) => element.date === dateLookup)

    return (outtime.hour - intime.hour)/100
}

let wagesEarnedOnDate = function (date) {
    let hrs = hoursWorkedOnDate.call(this, date)
    let employeeRate = this.payPerHour
    return (hrs * employeeRate)
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function (srcArray, firstName) {
    let record = srcArray.find((element) => element.firstName === firstName)
    return record
}

let calculatePayroll = function (srcArray) {
    return srcArray.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}