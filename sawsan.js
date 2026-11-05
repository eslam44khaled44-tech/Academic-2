// ======================================================
//          MIDNIGHT STUDENT PERFORMANCE SYSTEM
// ======================================================

console.clear();


// ======================================================
// 1. SYSTEM HEADER
// ======================================================

console.log(
    "%c",
    "background:linear-gradient(90deg,#06142E,#0878F9,#00C6FF); padding:5px;"
);

console.log(
    "%c  MIDNIGHT STUDENT PERFORMANCE SYSTEM  ",
    "background:#071A36; color:#38BDF8; font-size:20px; font-weight:bold; padding:15px; border:2px solid #0878F9;"
);

console.log(
    "%c  ACADEMIC DATA ANALYSIS TERMINAL ",
    "color:#00C6FF; font-size:13px; font-weight:bold; letter-spacing:3px;"
);

console.log(
    "%c  SYSTEM STATUS: ONLINE  |  DATABASE: CONNECTED  ",
    "background:#0B2447; color:#00FFB3; padding:8px; font-weight:bold;"
);


// ======================================================
// 2. CREATE STUDENT CLASS
// ======================================================

class Student {

    constructor(id, name, grades, attendance) {

        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;

    }


    // Calculate Average Using Reduce

    calculateAverage() {

        if (this.grades.length === 0) {
            return 0;
        }

        let total = this.grades.reduce(
            (sum, grade) => sum + grade, 0
        );

        return total / this.grades.length;

    }


    // Determine Letter Grade

    getLetterGrade() {

        let average = this.calculateAverage();

        if (average >= 90) {
            return "A";
        }

        else if (average >= 80) {
            return "B";
        }

        else if (average >= 70) {
            return "C";
        }

        else if (average >= 60) {
            return "D";
        }

        else if (average >= 50) {
            return "E";
        }

        else {
            return "F";
        }

    }


    // Determine Final Result

    getResult() {

        let average = this.calculateAverage();

        if (average >= 50 && this.attendance >= 75) {

            return "PASSED";

        }

        else {

            return "NEEDS REVIEW";

        }

    }

}


// ======================================================
// 3. CREATE STUDENTS DATABASE
// ======================================================

let studentsList = [

    new Student(101, "Ahmed", [95, 90, 88, 92], 95),

    new Student(102, "Sara", [80, 85, 78, 82], 90),

    new Student(103, "Mohamed", [45, 42, 48, 44], 85),

    new Student(104, "Mona", [50, 45, 42, 43], 70)

];


// ======================================================
// 4. STUDENTS ACADEMIC REPORTS
// ======================================================

console.log("\n");

console.log(
    "%c  [01] STUDENTS ACADEMIC REPORTS  ",
    "background:#0B2447; color:#38BDF8; font-size:16px; font-weight:bold; padding:10px;"
);


let studentColors = [

    "#38BDF8",
    "#60A5FA",
    "#22D3EE",
    "#93C5FD"

];


studentsList.forEach((student, index) => {

    let color = studentColors[index];

    let average = student.calculateAverage();

    let report = `

╔══════════════════════════════════════════╗
║                                          ║
║          STUDENT REPORT 0${index + 1}              ║
║                                          ║
╠══════════════════════════════════════════╣
║  STUDENT ID      : ${student.id}
║  STUDENT NAME    : ${student.name}
║  GRADES          : ${student.grades.join(" | ")}
║  AVERAGE         : ${average.toFixed(2)}
║  LETTER GRADE    : ${student.getLetterGrade()}
║  ATTENDANCE      : ${student.attendance}%
║  FINAL RESULT    : ${student.getResult()}
║                                          ║
╚══════════════════════════════════════════╝

`;

    console.log(
        "%c" + report,
        `color:${color}; font-weight:bold; font-size:13px;`
    );

});


// ======================================================
// 5. FILTER STRUGGLING STUDENTS
// ======================================================

console.log(
    "%c  [02] ACADEMIC WARNING REPORT  ",
    "background:#102D50; color:#FBBF24; font-size:16px; font-weight:bold; padding:10px;"
);


let strugglingStudents = studentsList.filter(student => {

    let average = student.calculateAverage();

    return average >= 40 && average < 50;

});


console.log(
    "%c  STUDENTS REQUIRING ACADEMIC SUPPORT  ",
    "color:#FBBF24; font-weight:bold; font-size:13px;"
);


if (strugglingStudents.length > 0) {

    strugglingStudents.forEach(student => {

        let warningReport = `

┌────────────────────────────────────────┐
│  WARNING: STUDENT NEEDS SUPPORT        │
├────────────────────────────────────────┤
│  ID          : ${student.id}
│  NAME        : ${student.name}
│  AVERAGE     : ${student.calculateAverage().toFixed(2)}
│  ATTENDANCE  : ${student.attendance}%
└────────────────────────────────────────┘

`;

        console.log(
            "%c" + warningReport,
            "color:#FBBF24; font-weight:bold; font-size:13px;"
        );

    });

}

else {

    console.log(
        "%c  No struggling students found.",
        "color:#00FFB3; font-weight:bold;"
    );

}


console.log(
    "%c  TOTAL STRUGGLING STUDENTS: " + strugglingStudents.length,
    "color:#FBBF24; font-size:14px; font-weight:bold;"
);


// ======================================================
// 6. ADD 5 BONUS MARKS
// ======================================================

console.log(
    "%c  [03] BONUS MARKS PROCESSING  ",
    "background:#0B2447; color:#22D3EE; font-size:16px; font-weight:bold; padding:10px;"
);


let bonusResults = strugglingStudents.map(student => {

    let oldAverage = student.calculateAverage();

    let newAverage = oldAverage + 5;

    return {

        id: student.id,

        name: student.name,

        oldAverage: oldAverage,

        bonusMarks: 5,

        newAverage: newAverage

    };

});


console.log(
    "%c  BONUS MARKS RESULTS  ",
    "color:#22D3EE; font-weight:bold; font-size:13px;"
);


console.table(

    bonusResults.map(student => ({

        ID: student.id,

        Name: student.name,

        "Original Average": student.oldAverage.toFixed(2),

        "Bonus Marks": student.bonusMarks,

        "New Average": student.newAverage.toFixed(2)

    }))

);


// ======================================================
// 7. CALCULATE TOTAL NEW AVERAGES USING REDUCE
// ======================================================

let totalNewAverages = bonusResults.reduce(

    (total, student) => total + student.newAverage,

    0

);


// ======================================================
// 8. CALCULATE FINAL AVERAGE
// ======================================================

let finalAverage = 0;

if (bonusResults.length > 0) {

    finalAverage = totalNewAverages / bonusResults.length;

}


// ======================================================
// 9. FINAL SYSTEM ANALYTICS
// ======================================================

console.log(
    "%c  [04] FINAL SYSTEM ANALYTICS  ",
    "background:#071A36; color:#38BDF8; font-size:16px; font-weight:bold; padding:12px;"
);


let finalReport = {

    "TOTAL STUDENTS": studentsList.length,

    "STRUGGLING STUDENTS": strugglingStudents.length,

    "TOTAL BONUS MARKS": bonusResults.length * 5,

    "TOTAL NEW AVERAGES": totalNewAverages.toFixed(2),

    "FINAL BONUS AVERAGE": finalAverage.toFixed(2)

};


console.table([finalReport]);


// ======================================================
// 10. SYSTEM COMPLETION
// ======================================================

console.log(
    "%c  SYSTEM EXECUTED SUCCESSFULLY  ",
    "background:#075985; color:#FFFFFF; font-size:18px; font-weight:bold; padding:15px;"
);

console.log(
    "%c  ALL ACADEMIC REPORTS GENERATED SUCCESSFULLY  ",
    "color:#22D3EE; font-size:13px; font-weight:bold;"
);


// ======================================================
// 11. CONSOLE INSTRUCTIONS BUTTON
// ======================================================

function showConsoleInstructions() {

    const instructions = document.getElementById("consoleInstructions");

    instructions.hidden = false;

}
// ==========================================
// GENERATE ANIMATED STARS
// ==========================================

const starsBackground = document.getElementById("starsBackground");

for (let i = 0; i < 100; i++) {

    const star = document.createElement("span");

    star.classList.add("star");

    star.style.left = Math.random() * 100 + "%";

    star.style.animationDuration = (8 + Math.random() * 15) + "s";

    star.style.animationDelay = Math.random() * 15 + "s";

    const size = (1 + Math.random() * 4) + "px";

    star.style.width = size;
    star.style.height = size;

    starsBackground.appendChild(star);

}