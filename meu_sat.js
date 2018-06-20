exports.solve = function (fileName) {
    let formula = readFormula(fileName)
    let result = doSolve(formula.clauses, formula.variables)
    return result
}

function nextAssignment(currentAssignment) {
    let newAssignment = []
    while (currentAssignment.indexOf(2) != -1) {
        let variavel = currentAssignment[currentAssignment.length - 1]
        currentAssignment[currentAssignment.indexOf(2)] = 0
        currentAssignment[variavel - 1] += 1
    }
    return currentAssignment
}

function doSolve(clauses, assignment) { // Não consegui fazer :,(
    let isSat = false
    while ((!isSat) && /* must check whether this is the last assignment or not*/) {
        // does this assignment satisfy the formula? If so, make isSat true. 

        // if not, get the next assignment and try again. 
        assignment = nextAssignment(assignment)
    }
    let result = { 'isSat': isSat, satisfyingAssignment: null }
    if (isSat) {
        result.satisfyingAssignment = assignment
    }
    return result
}
function readFormula(fileName) {
    var t = require('fs')
    let texto = t.readFileSync(fileName, "utf-8").toString()
    let text = texto.split('\n')
    let clauses = readClauses(text)
    let variables = readVariables(clauses)
    let specOk = checkProblemSpecification(text, clauses, variables)
    let result = { 'clauses': [], 'variables': [] }
    if (specOk) {
        result.clauses = clauses
        result.variables = variables
    }
    let currentAssignment = variables
    let assignment = nextAssignment(currentAssignment)
    return result
}

var problema

function readClauses(text) {
    var arrayComent = []
    var arrayAux = []
    var aux = 0
    var clauses = []
    for (var i = 0; i < text.length; i++) {
        if (text[i].charAt(0) == 'c') {
            arrayComent[i] = text[i]
        } else if (text[i].charAt(0) == 'p') {
            problema = text[i]
        } else {
            arrayAux[aux] = text[i]
            aux++
        }
    }
    for (var j = 0; j < arrayAux.length; j++) {
        clauses[j] = arrayAux[j].split(' ')
    }
    return clauses
}

var variables = []

function readVariables(clauses) {
    for (var a = 0; a < clauses; a++) {
        variables[a] = clauses[a].pop()
    }
    return variables
}

var b = false

function checkProblemSpecification(text, clauses, variables) {
    let cnf = problema.split(" ")
    if (problema[2] == variables.length && problema[3] == clauses.length) {
        b = true
    } else {
        b = false
    }
    return b
}