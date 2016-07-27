$(document).ready(function(){

  var Calculator = {
    equation: [],
    result: '',
    dot: false,
    operators: [' + ',' - ', ' ÷ ', ' × '],
    displayEquation: function() {
      var displayedEqnLength = 20;
      var displayedEqn = this.equation.slice(-displayedEqnLength).join('');
      $('.eqn').html(displayedEqn);
    },
    displayResult: function() {
      var displayedResult = this.result.toString().slice(0,14);
      $('.result').html(displayedResult);
    },
    keyHandler: function(key) {
      // Clear result upon key or operator button click
      this.result = '';
      $('.result').html(this.result);

      // Use html value of button
      var value = key.html();

      // If operator, make sure to add space on either side for equation
      // Also, reset dot flag
      if (key.hasClass('operator')) {
        this.dot = false;
        value = ' ' + value + ' ';
      } else {
        // If dot character, make sure it hasn't already been used in current number
        // If dot character has been used, then do nothing upon dot button click
        if (value === '.' && !this.dot) {
          this.dot = true;
        } else if (value === '.' && this.dot) {
          return;
        }
      }
      this.equation.push(value);
      this.displayEquation();
    },
    evaluate: function() {
      // If equation ends in operator
      if (this.operators.indexOf(this.equation[this.equation.length-1]) > 1) {
        // handle don't start with or end with operator
        alert('Equation ends with operator!');
      }

      // Replace all instances of × and ÷ with * and / respectively.
      // This can be done easily using regex and the global  which will
      // replace all instances of the matched character/substring
      var inputStr = this.equation.join('');
      inputStr = inputStr.replace(/÷/g,'/').replace(/×/g,'*').replace(/\s+/g,'');

      // Use regex to make sure 2 or more operators are not used in a row
      var re = /\+{2,}|\-{2,}|\/{2,}|\*{2,}/g;
      console.log(inputStr);
      if (re.test(inputStr)) {
        alert('Too many operators in a row!');
      }

      // Valid input if reached this point, thus evaluate string and update results
      this.result = eval(inputStr);
      this.displayResult();
    },
    clearEntry: function() {
      // Remove last entry from equation (value or operator)
      this.equation.pop();
      this.displayEquation();
    },
    clearAll: function() {
      this.equation = [];
      this.result = '0';
      this.displayEquation();
      this.displayResult();
    }
  };

  // Key button click: handles key click event
  $('button').not('.equals, .clear, .clearall').on('click', function() {
    var key = $(this);
    Calculator.keyHandler(key);
  });

  // Equals button click: evaluates valid input and displays result
  $('.equals').on('click', function() {
    Calculator.evaluate();
  });

  // CE: clear entry, clears entry of calculator
  $('.clear').on('click', function() {
    // Remove last entry from equation (value or operator)
    Calculator.clearEntry();
  });

  // AC: all clear function, clears entire input string
  $('.clearall').on('click', function() {
    Calculator.clearAll();
  });
});
