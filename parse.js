export function parse(expression) {
  try {
    // 1. parse passed expression
    const parsedExpression = parseExpression(expression);
    // 2. pass parsed expression to TimeWarp Instance
    const newTime = new TimeWarp(parsedExpression);
    //3. return warped and snapped date time property - method chaining possible since object returned by functions
    return newTime.warp().snap().date;

  } catch (error) {
    return `${error} : ${expression}`;
  }
};

class TimeWarp {
  // initiate time units based on passed object properties
  constructor(timeUnits = { s: 0, m: 0, h: 0, d: 0, mon: 0, y: 0, snap: 0 }) {
    this.secs = timeUnits.s * 1000;
    this.mins = timeUnits.m * 1000 * 60;
    this.hours = timeUnits.h * 1000 * 60 * 60;
    this.days = timeUnits.d * 1000 * 60 * 60 * 24;
    this.months = timeUnits.mon;
    this.years = timeUnits.y;
    this.snapValue = timeUnits.snap;
    this.date = new Date();
  }
  // modify date time according to time values
  warp() {
    this.date = new Date(
      Date.now() + (this.secs + this.mins + this.hours + this.days)
    );
    this.date.setMonth(this.date.getMonth() + this.months);
    this.date.setFullYear(this.date.getFullYear() + this.years);
    return this;
  }
  // snap values based on passed time unit using switch/case statements
  snap() {
    switch (this.snapValue) {
      case "y":
        this.date.setMonth(0);
        this.date.setDate(1);
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);
        this.date.setMilliseconds(0);
        break;
      case "mon":
        this.date.setDate(1);
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);
        this.date.setMilliseconds(0);
        break;
      case "d":
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);
        this.date.setMilliseconds(0);
        break;
      case "h":
        this.date.setMinutes(0);
        this.date.setSeconds(0);
        this.date.setMilliseconds(0);
        break;
      case "m":
        this.date.setSeconds(0);
        this.date.setMilliseconds(0);
        break;
      case "s":
        this.date.setMilliseconds(0);
        break;
    }

    return this;
  }
}

const parseExpression = (expression) => {
  // set-up variables
  const allowedOperations = ["+", "@", "-"];
  const allowedModifiers = ["now()"];
  const allowedTimeUnits = ["s", "m", "h", "d", "mon", "y"];
  const parsedExpression = { s: 0, m: 0, h: 0, d: 0, mon: 0, y: 0, snap: 0 };

  /* extract expression logic blocks between operators into array E.g [ 'now()', '100d', '12h', 'mon' ] */
  const compRegex = new RegExp("[" + allowedOperations.join("") + "]", "g");
  const components = expression.split(compRegex);

  /* extract expression operators E.g [ '+', '+', '@' ]*/
  const opRegex = new RegExp("[" + components.join("") + "]", "g");
  const operations = expression.replace(opRegex, "").split("");

  // if expression modifier is not on allowed list then return error message
  if (!allowedModifiers.includes(components[0])) {
    throw "ERROR: Invalid Expression. Incorrect Modifier";
  }

  /* loop through operations, processing and modifying parsedExpression Object*/

  operations.forEach((operator, index) => {
    // extract time units
    const timeUnit = components[index + 1].replace(/[0-9]/g, "");

    // if time unit is not on allowed list then return error message
    if (!allowedTimeUnits.includes(timeUnit)) {
      throw "ERROR: Invalid Expression. Incorrect Time Unit";
    }

    // extract amount of time
    let timeAmount = components[index + 1].replace(/[a-zA-z]/g, "");

    // if this is a subtract operation use negative amount
    timeAmount = operator === "-" ? -timeAmount : timeAmount;

    // build parsedExpression object - if snap operator detected set snap key
    operator !== "@"
      ? (parsedExpression[timeUnit] = (parsedExpression[timeUnit] + parseInt(timeAmount)))
      : (parsedExpression["snap"] = timeUnit);
  });

  return parsedExpression;
};


